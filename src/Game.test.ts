import Game, { LetterGuessState } from "./Game";

let game: Game;
const defaultTestWord: string = 'spice';

beforeAll(() => {
    game = new Game(defaultTestWord);
});

test('Game word is initialized correctly', () => {
    expect(game.word).toBe(defaultTestWord.toUpperCase());
});

describe('Letter placement dictionary', () => {
    test('is correct without duplicates', () => {
        expect(game.letterPlacements['S']).toEqual([0]);
        expect(game.letterPlacements['P']).toEqual([1]);
        expect(game.letterPlacements['I']).toEqual([2]);
        expect(game.letterPlacements['C']).toEqual([3]);
        expect(game.letterPlacements['E']).toEqual([4]);
    });

    test('is correct with duplicates', () => {
        const game = new Game('splatters');

        expect(game.letterPlacements['S']).toEqual([0, 8]);
        expect(game.letterPlacements['P']).toEqual([1]);
        expect(game.letterPlacements['L']).toEqual([2]);
        expect(game.letterPlacements['A']).toEqual([3]);
        expect(game.letterPlacements['T']).toEqual([4, 5]);
        expect(game.letterPlacements['E']).toEqual([6]);
        expect(game.letterPlacements['R']).toEqual([7]);
    });

    test('does not contain letters that are not in the word', () => {
        expect(game.letterPlacements['X']).toBeUndefined();
    });
});

describe('Word guess', () => {
    test('is accepted if correct', () => {
        expect(game.isGuessCorrect(defaultTestWord.toUpperCase())).toBe(true);
    });

    test('is rejected if incorrect', () => {
        expect(game.isGuessCorrect('wrongword')).toBe(false);
    });
});

describe('Guessed letter', () => {
    test('in word in the correct position', () => {
        game.processLetter('I', 'QUITE', 2);

        expect(game.lettersUsed['I'].letterGuessState).toEqual(LetterGuessState.InCorrectPosition);
    });

    test('in word but in wrong position is marked correctly', () => {
        game.processLetter('E', 'SWEET', 4);

        expect(game.lettersUsed['E'].letterGuessState).toEqual(LetterGuessState.InWrongPosition);
    });

    test('not in word is marked correctly', () => {
        game.processLetter('Q', 'QUICK', 0);

        expect(game.lettersUsed['Q'].letterGuessState).toEqual(LetterGuessState.NotInWord);
    });
});