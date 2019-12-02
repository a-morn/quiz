const { PubSub, withFilter } = require('graphql-subscriptions')
const {
  GameNotFoundError,
} = require('./errors');

const {
  PLAYER_JOINED,
    GAME_REQUEST,
    NEW_QUESTION_SINGLEPLAYER,
    GAME_MULTIPLAYER,
    NEW_QUESTION_MULTIPLAYER,
    NEW_ANSWER_MULTIPLAYER,
    SCORE_UPDATED,
} = require('./triggers')

const {
	getGameByPlayerId: getGameByPlayerIdSingleplayer,
	createGame: createGameSingleplayer,
	getCurrentQuestionByPlayerId: getCurrentQuestionByPlayerIdSingleplayer,
	deleteGame: deleteGameSingleplayer,
	answerQuestion: answerQuestionSingleplayer,
	getLastAnswerByPlayerId: getLastAnswerByPlayerIdSingleplayer,
	updateQuestionByPlayerId: updateQuestionByPlayerIdSingleplayer,
 } = require('./models/singleplayer')

const {
  getGameRequestById: getGameRequestByIdLobby,
  getPlayerById: getPlayerByIdLobby,
  addPlayer: addPlayerLobby,
  getPlayers: getPlayersLobby,
  addGameRequest: addGameRequestLobby,
  getGameRequestByPlayerId: getGameRequestByPlayerIdLobby,
  deleteGameRequestById: deleteGameRequestByIdLobby
} = require('./models/lobby')

const {
	getGameByPlayerId: getGameByPlayerIdMultiplayer,
	createGame: createGameMultiplayer,
	getCurrentQuestionByPlayerId: getCurrentQuestionByPlayerIdMultiplayer,
	getLastAnswerByPlayerId: getLastAnswerByPlayerIdMultiplayer,
  updateQuestionByPlayerId: updateQuestionByPlayerIdMultiplayer,
  answerQuestion: answerQuestionMultiplayer,
  deleteGameByGameId: deleteGameByGameIdMultiplayer,
} = require('./models/multiplayer')

const pubsub = new PubSub()

const resolvers = ({
  Query: {
    categories: () => {
      return [{ id: 'game-of-thrones', label: 'Game of Thrones' }]
    },
    gameSingleplayer: (_, __, context) => {
      const { currentUser: { playerId }} = context
      try {
        return getGameByPlayerIdSingleplayer(playerId)
      } catch (e) {
        if (e instanceof GameNotFoundError) {
          return null
        } else {
          throw e
        }
      }
    },
    lastAnswerSingleplayer: (_, __, context) => {
      const { currentUser: { playerId }} = context
      const answer = getLastAnswerByPlayerIdSingleplayer(playerId);
      return answer
    },
    lobby: (_, __, context) => {
      const { currentUser: { playerId }} = context
      const players = getPlayersLobby()
      const hasJoined = players.some(p => p.id === playerId)
      return {
        players,
        hasJoined
      }
    },
    gameRequest: (_, __, context) => {
      const { currentUser: { playerId }} = context
      const gameRequest = getGameRequestByPlayerIdLobby(playerId)
      return gameRequest
    },
    gameMultiplayer: (_, __, context) => {
      const { currentUser: { playerId }} = context
      try {
        return getGameByPlayerIdMultiplayer(playerId)
      } catch (e) {
        if (e instanceof GameNotFoundError) {
          return null
        } else {
          throw e
        }
      }
    },
    currentQuestionMultiplayer: (_, __, context) => {
      const { currentUser: { playerId }} = context
      const question = getCurrentQuestionByPlayerIdMultiplayer(playerId)
      return question
    },
    lastAnswerMultiplayer: (_, __, context) => {
      const { currentUser: { playerId }} = context
      const answer = getLastAnswerByPlayerIdMultiplayer(playerId);
      return answer
    },
    score: (_, __, context) => {
      const { currentUser: { playerId }} = context
      const game = getGameByPlayerIdMultiplayer(playerId)
      return game.players;
    }
  },
  Mutation: {
    createGameSingleplayer: (_, { playerId, category }) => {
      return createGameSingleplayer(playerId, category)
    },
    deleteGameSingleplayer: (_, { id }) => {
      const game = deleteGameSingleplayer(id)
      return game
    },
    answerQuestionSingleplayer: (_, { answerId, questionId }, context) => {
      const { currentUser: { playerId }} = context
      const id = answerQuestionSingleplayer(playerId, questionId, answerId)
      updateQuestionByPlayerIdSingleplayer(playerId)
      const { answer, record, ...question } = getCurrentQuestionByPlayerIdSingleplayer(playerId)
      setTimeout(() => {
        pubsub.publish(NEW_QUESTION_SINGLEPLAYER, {
          newQuestionSingleplayer: {
            playerId,
            ...question
          }
        })
      }, 500)
      return { playerId, id }
    },
    addPlayer: (_, { id }) => {
      let player
      try {
        player = getPlayerByIdLobby(id)
      } catch {
        player = { id	}
        addPlayerLobby(player)
      }
      return player
    },
    joinLobby: (_, { player: { id, category, name}}) => {
      const player = getPlayerByIdLobby(id)
      player.category = category
      player.name = name
      pubsub.publish(PLAYER_JOINED, {
        playerJoined: player
      })
      return player
    },
    requestGame: (_, { gameRequest: { playerRequestId, playerOfferedId, category } }) => {
      const gameRequested = addGameRequestLobby(pubsub, playerRequestId, playerOfferedId, category)
     
      return gameRequested
    },
    answerGameRequest: (_, { id, accepted}, { currentUser: { playerId } }) => {
      const gameRequestAnswered = getGameRequestByIdLobby(id)
      if (!gameRequestAnswered.playerOfferedId === playerId) {
        return gameRequestAnswered
      }
      gameRequestAnswered.accepted = accepted
      pubsub.publish(GAME_REQUEST, {
        gameRequestSubscription: {
          gameRequest: gameRequestAnswered,
          mutation: "UPDATE"
        }
      })

      if(accepted) {
        const players = [
          getPlayerByIdLobby(playerId),
          getPlayerByIdLobby(gameRequestAnswered.playerRequestId)
        ]
        const game = createGameMultiplayer(players, gameRequestAnswered.category)
        pubsub.publish(GAME_MULTIPLAYER, {
          gameMultiplayer: {
            game,
            mutation: 'CREATE'
          }
        })
      } else {
        deleteGameRequestByIdLobby(pubsub, playerId, id)
      }
      return gameRequestAnswered
    },
    answerQuestionMultiplayer: (_, { answerId, questionId }, context) => {
      const { currentUser: { playerId }} = context
      const { correctAnswerId, players } = answerQuestionMultiplayer(playerId, questionId, answerId)
        
      const playerIds =
        players
        .map(({ id }) => id)

      pubsub.publish(NEW_ANSWER_MULTIPLAYER, {
        newAnswerMultiplayer: {
          id: correctAnswerId,
          playerIds,
          questionId
        }
      })
      pubsub.publish(SCORE_UPDATED, {
        scoreUpdated: players         
      })

      setTimeout(() => {
        updateQuestionByPlayerIdMultiplayer(playerId)
        const { answerId: id, record, ...question } = getCurrentQuestionByPlayerIdMultiplayer(playerId)

        pubsub.publish(NEW_QUESTION_MULTIPLAYER, {
          newQuestionMultiplayer: {
            playerIds,
            ...question
          }
        })
      }, 500)
      
      return { playerId, id: correctAnswerId, questionId }
    },
    deleteGameMultiplayer: (_, { id }) => {
      // use context for authorization
      const game = deleteGameByGameIdMultiplayer(pubsub, id)
      
      return game
    },
		deleteGameRequest: (_,  { id }, { currentUser: { playerId }}) => {
      const gameRequest = deleteGameRequestByIdLobby(pubsub, playerId, id)

      return gameRequest
		}
  },
  Subscription: {
    newQuestionSingleplayer: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_QUESTION_SINGLEPLAYER),
        (payload, _, context) => {
          const { currentUser: { playerId } } = context
          return playerId === payload.newQuestionSingleplayer.playerId
        })
    },
    playerJoined: {
      subscribe: () => pubsub.asyncIterator(PLAYER_JOINED)
    },
    gameRequestSubscription: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(GAME_REQUEST),
        (payload, variables, context) => {
          const { currentUser: { playerId } } = context
          const {
            gameRequestSubscription: {
              gameRequest: { playerOfferedId, playerRequestId }, mutation
            }
          } = payload
          return [playerOfferedId, playerRequestId].includes(playerId)
            && (!variables.mutation || variables.mutation === mutation)
        }
      )
    },
    gameMultiplayer: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(GAME_MULTIPLAYER),
        (payload, variables, context) => {
          const { currentUser: { playerId } } = context
          const { gameMultiplayer: { game: { players }, mutation } } = payload
          return players.some(p => p.id === playerId) &&
            (!variables.mutation || variables.mutation === mutation)
        })
    },
    newQuestionMultiplayer: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_QUESTION_MULTIPLAYER),
        (payload, _, context) => {
          const { currentUser: { playerId } } = context
          return payload.newQuestionMultiplayer.playerIds.includes(playerId)
        })
    },
    newAnswerMultiplayer: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_ANSWER_MULTIPLAYER ),
        (payload, _, context) => {
          const { currentUser: { playerId }} = context
          return payload.newAnswerMultiplayer.playerIds.includes(playerId)
        }
      )
    },
    scoreUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SCORE_UPDATED),
        (payload, _, context) => {
          const { currentUser: { playerId }} = context
          return payload.scoreUpdated.some(({ id }) => id === playerId)
        }
      )
    }
  }
})

module.exports = resolvers