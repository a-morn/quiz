import { UserInputError } from 'apollo-server'
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';
import { GAME_MULTIPLAYER } from '../triggers';
import shuffle from 'shuffle-array';
//import periodicTable from '../data/questions/periodic-table';
import got from '../generated-data/game-of-thrones.json';
import countries from '../generated-data/countries.json';
import { GameMultiplayer, isGameMultiplayer } from './game'
import { PlayerLobby, PlayerMultiplayer, isPlayerGameId } from './player';
import { CategoryId } from './category';
import { Question } from './question'
import { isUndefined } from 'util';
const allQuestions = {
  'game-of-thrones': got,
  //'periodic-table': periodicTable,
  countries
};

const backgrounds = {
  'game-of-thrones': `${process.env.ASSETS_URL}/game-of-thrones/got-tapestry.jpg`,
  countries: `${process.env.ASSETS_URL}/countries/world-map.jfif`,
};

import { filterGame } from './utils'

const getGame = async (redisClient: Redis, gameId: string) => {
  const gameString = await redisClient.get(`multiplayer:games:${gameId}`)
  if (!gameString) {
    return null
  }
  const game = JSON.parse(gameString)

  if (!isGameMultiplayer(game)) {
    throw new UserInputError(`That's no game... ${Object.keys(game)}`)
  }
  return game
}

const updateGame = async (redisClient: Redis, pubSub: RedisPubSub, game: GameMultiplayer, mutation: 'UPDATE' | 'CREATE'): Promise<void> => {
  const gameString = JSON.stringify(game);
  const setMode = mutation === 'CREATE'
    ? 'NX'
    : 'XX'
  await redisClient.set(`multiplayer:games:${game.id}`, gameString, setMode);
  pubSub.publish(GAME_MULTIPLAYER, {
    gameMultiplayerSubscription: {
      gameMultiplayer: filterGame(game),
      mutation
    }
  })
}

const getGameIdByPlayerId = async (redisClient: Redis, playerId: string): Promise<string | null> => {
  const playerGameIdString = await redisClient.get(`multiplayer:player-game-id:${playerId}`)
  if (!playerGameIdString) {
    return null
  }
  const playerGameId = JSON.parse(playerGameIdString)
  if (typeof playerGameId !== 'number') {
    throw new Error('This is not a game id :(')
  }

  return playerGameIdString
}

const getGameByPlayerId = async (redisClient: Redis, playerId: string): Promise<GameMultiplayer | null> => {
  const gameId = await getGameIdByPlayerId(redisClient, playerId)
  if (gameId === null) {
    return null
  }
  return getGame(redisClient, gameId)
}

const setGameIdForPlayer = async (redisClient: Redis, playerId: string, gameId: string): Promise<unknown> => {
  return redisClient.set(`multiplayer:player-game-id:${playerId}`, gameId)
}

const removePlayer = async (redisClient: Redis, playerId: string): Promise<unknown> => {
  return redisClient.del(`multiplayer:player-game-id:${playerId}`);
}

const deleteGameByGameId = async (redisClient: Redis, pubsub: RedisPubSub, gameId: string): Promise<void> => {
  const game = await getGame(redisClient, gameId)
  await redisClient.del(`multiplayer:games:${gameId}`)
  pubsub.publish(GAME_MULTIPLAYER, {
    gameMultiplayerSubscription: {
      gameMultiplayer: filterGame(game),
      mutation: 'DELETE'
    }
  })
}

const createGame = async (redisClient: Redis, pubSub: RedisPubSub, players: PlayerLobby[], categoryId: CategoryId) => {
  const game = {
    categoryId,
    categoryBackground: backgrounds[categoryId],
    id: '' + Math.random(),
    players: players.map((player) => ({
      ...player,
      score: 0,
      won: false,
      hasLeft: false,
      timestamp: new Date().toISOString()
    } as PlayerMultiplayer)),
    questions: shuffle(
      Object.values(allQuestions[categoryId])
        .reduce((acc: Question[], { questions }) => (
          acc.concat(questions)
        ), [])
        .map(q => ({
          answered: false,
          record: 0,
          ...q
        }))
    ),
    questionIndex: 0
  }

  await updateGame(redisClient, pubSub, game, 'CREATE')
    .then(() => Promise.all(players.map(p => setGameIdForPlayer(redisClient, p.id, game.id))))

  // Delay game start
  setTimeout(async () => {
    const futureGame = await getGame(redisClient, game.id)
    if (futureGame === null) {
      throw new Error('Game was deleted')
    }
    futureGame.currentQuestion = futureGame.questions[0]
    await updateGame(redisClient, pubSub, futureGame, 'UPDATE')
  }, 4000)
}

const updateQuestionByPlayerId = async (
  redisClient: Redis,
  pubSub: RedisPubSub,
  playerId: string
): Promise<void> => {
  const game = await getGameByPlayerId(redisClient, playerId)
  if (game === null) {
    throw new UserInputError(`No game for player ${playerId}`)
  }
  game.lastQuestion = game.questions[game.questionIndex]
  game.questionIndex++
  game.currentQuestion = game.questions[game.questionIndex]
  return updateGame(redisClient, pubSub, game, 'UPDATE')
}

const getLastAnswerByPlayerId = async (redisClient: Redis, playerId: string) => {
  const game = await getGameByPlayerId(redisClient, playerId)
  if (game !== null && game.lastQuestion) {
    const question = game.lastQuestion
    return {
      id: question.answerId,
      questionId: question.id,
    }
  } else {
    return null
  }
}

const answerQuestion = async (
  redisClient: Redis,
  pubSub: RedisPubSub,
  playerId: string,
  questionId: string,
  answerId: string
) => {
  const game = await getGameByPlayerId(redisClient, playerId);
  if (game === null) {
    throw new UserInputError(`No game for player ${playerId}`)
  }
  const question = game.currentQuestion
  if (questionId === question?.id) {
    game.players
    const player = game
      .players
      .find(({ id }) => id === playerId)

    if (!player) {
      throw new UserInputError(`Player ${playerId} is not a part of game ${game.id}`)
    }
    const correct = answerId === question.answerId;
    player.score = Math.max(0, player.score + (correct ? 1 : -1));
    if (player.score >= 10) {
      player.won = true;
    }
    question.answered = true
    await updateGame(redisClient, pubSub, game, 'UPDATE')
  } else {
    throw new UserInputError(`Tried to answer invalid question`);
  }

  setTimeout(async () => {
    await updateQuestionByPlayerId(redisClient, pubSub, playerId)
    const game = await getGameByPlayerId(redisClient, playerId)
    const filteredGameWithNewQuestion = filterGame(game)

    pubSub.publish(GAME_MULTIPLAYER, {
      gameMultiplayerSubscription: {
        gameMultiplayer: filteredGameWithNewQuestion,
        mutation: 'UPDATE'
      }
    })
  }, 800)

  return question
};

const removePlayerFromGame = async (
  redisClient: Redis,
  pubSub: RedisPubSub,
  playerId: string,
  gameId: string
): Promise<GameMultiplayer> => {
  const game = await getGame(redisClient, gameId)
  if (game === null) {
    throw new UserInputError(`No game ${gameId}`)
  }
  const player = game.players
    .find(({ id }) => id === playerId);
  if (isUndefined(player)) {
    throw new UserInputError(`No player ${playerId} in game ${gameId}`)
  }

  player.hasLeft = true

  await removePlayer(redisClient, playerId)

  if (game.players.every(({ hasLeft }) => hasLeft)) {
    await deleteGameByGameId(redisClient, pubSub, gameId)
  } else {
    await updateGame(redisClient, pubSub, game, 'UPDATE')
  }

  return game
}

const updateTimestampForPlayer = async (redisClient: Redis, pubSub: RedisPubSub, playerId: string) => {
  const game = await getGameByPlayerId(redisClient, playerId)
  if (game === null) {
    return null
  }
  const player = game
    .players
    .find(({ id }) => id === playerId)
  if (!player) {
    return null
  }
  player.timestamp = new Date().toISOString()
  await updateGame(redisClient, pubSub, game, 'UPDATE')
  return player
}

export {
  getGameByPlayerId,
  createGame,
  getLastAnswerByPlayerId,
  answerQuestion,
  updateQuestionByPlayerId,
  removePlayerFromGame,
  updateTimestampForPlayer
};
