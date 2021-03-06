import { GameQuestion, GameMultiplayer } from 'enlighten-common-types'
import { filterGame } from 'enlighten-common-utils'
import faker from 'faker'

const getGame: (currentQuestionAnswered: boolean) => GameMultiplayer = (
  currentQuestionAnswered: boolean,
) =>
  ({
    questions: [],
    categoryBackground: faker.image.imageUrl(),
    categoryBackgroundBase64: faker.random.alphaNumeric(),
    categoryId: faker.random.uuid(),
    categoryName: faker.internet.domainName(),
    id: faker.random.uuid(),
    players: [],
    questionIndex: faker.random.number(),
    currentQuestion: {
      answered: currentQuestionAnswered,
      hasMultipleCorrectAnswers: false,
      answerIds: [faker.random.uuid()],
      alternatives: [],
      categoryId: faker.random.uuid(),
      _id: faker.random.uuid(),
      record: faker.random.number(),
      type: 'text',
      text: faker.lorem.text(),
      levelId: faker.random.uuid(),
      questionGroupName: faker.lorem.text(),
      types: [faker.lorem.text()],
    } as GameQuestion,
    currentQuestionId: faker.random.uuid(),
  } as GameMultiplayer)

describe('filterGame', () => {
  test('should return null if input is null', () => {
    const game = null

    const filteredGame = filterGame(game)

    expect(filteredGame).toBe(null)
  })

  test('should return answerIds if current question is answered', () => {
    const game = getGame(true)

    const filteredGame = filterGame(game)

    expect(filteredGame).toEqual(
      expect.objectContaining({
        currentQuestion: expect.objectContaining({
          answerIds: game.currentQuestion?.answerIds,
        }),
      }),
    )
  })

  test('should not return answerIds if current question is not answered', () => {
    const game = getGame(false)

    const filteredGame = filterGame(game)

    expect(filteredGame?.currentQuestion?.answerIds).toBeUndefined()
  })
})
