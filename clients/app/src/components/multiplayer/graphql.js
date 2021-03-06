import gql from 'graphql-tag'

const GAME = gql`
  query {
    gameMultiplayer {
      id
      categoryBackground
      categoryBackgroundBase64
      players {
        id
        score
        name
        won
        hasLeft
        profilePictureUrl
      }
      currentQuestion {
        _id
        type
        text
        src
        lqip
        tones
        answerIds
        answered
        alternatives {
          _id
          type
          text
          src
          lqip
        }
      }
      lastQuestion {
        _id
        answerIds
      }
    }
  }
`

const REMOVE_PLAYER_FROM_GAME = gql`
  mutation($player: RemovePlayerFromGameMultiplayerInput!) {
    removePlayerFromGameMultiplayer(player: $player) {
      success
    }
  }
`

const PING_MULTIPLAYER = gql`
  mutation {
    pingMultiplayer {
      success
    }
  }
`

const GAME_UPDATED = gql`
  subscription {
    gameMultiplayerSubscription {
      mutation
      gameMultiplayer {
        id
        categoryBackground
        categoryBackgroundBase64
        players {
          id
          score
          name
          won
          hasLeft
        }
        currentQuestion {
          _id
          type
          text
          src
          lqip
          tones
          answerIds
          answered
          alternatives {
            _id
            type
            text
            src
            lqip
          }
        }
        lastQuestion {
          _id
          answerIds
        }
      }
    }
  }
`

const ANSWER = gql`
  mutation($answer: AnswerQuestionMultiplayerInput!) {
    answerQuestionMultiplayer(answer: $answer) {
      success
    }
  }
`

export { ANSWER, GAME_UPDATED, PING_MULTIPLAYER, REMOVE_PLAYER_FROM_GAME, GAME }
