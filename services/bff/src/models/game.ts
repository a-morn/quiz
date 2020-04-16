import { GameQuestion } from './question'
import { PlayerMultiplayer } from './player'
import { isCategoryId } from './category'

export type Game = {
    categoryId: string;
    categoryBackground: string
    id: string;
    lastQuestionId?: string
    currentQuestionId?: string
    currentQuestion?: GameQuestion
    lastQuestion?: GameQuestion
}

export type GameSingeplayer = Game & {
    playerId: string
    userLevel: keyof Levels;
    levels: Levels
}

export type GameMultiplayer = Game & {
    players: PlayerMultiplayer[]
    questions: GameQuestion[]
    questionIndex: number
}

export type Levels = {
    [key: number]: GameQuestion[]
}

// todo: implement
function isLevels(x: unknown): x is Levels {
    return true
}

// todo: implement
function isUserLevel(x: unknown, levels: Levels): x is keyof Levels {
    return true
}

export function isGame(x: unknown): x is Game {
    return isCategoryId((x as Game).categoryId)
        && typeof (x as Game).categoryBackground === 'string'
        && typeof (x as Game).id === 'string'
}

export function isGameMultiplayer(x: unknown): x is GameMultiplayer {
    return isGame(x)
        && Array.isArray((x as GameMultiplayer).questions)
        && typeof (x as GameMultiplayer).questionIndex === 'number'
    // todo add players
}

export function isGameSingleplayer(x: unknown): x is GameSingeplayer {
    return isGame(x)
        && typeof (x as GameSingeplayer).playerId === 'string'
        && isUserLevel((x as GameSingeplayer).userLevel, (x as GameSingeplayer).levels)
        && isLevels((x as GameSingeplayer).levels)
}