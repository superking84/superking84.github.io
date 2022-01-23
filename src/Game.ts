type LetterDictionary = {
    [index: string]: number[];
};
type LetterGuessDictionary = {
    [index: string]: {
        letterGuessState: LetterGuessState;
    };
};
export enum LetterGuessState {
    NotInWord = 0,
    InWrongPosition,
    InCorrectPosition
};

class Game {
    word: string;

    letterPlacements: LetterDictionary;
    lettersUsed: LetterGuessDictionary;
    wordsGuessed: string[];

    readonly maxTurns: number = 5;
    private currentTurn: number;


    constructor(word: string) {
        this.word = word.toUpperCase();

        this.letterPlacements = {};
        this.word.split('').forEach((letter, i) => {
            if (this.letterPlacements[letter] === undefined) {
                this.letterPlacements[letter] = [];
            }

            this.letterPlacements[letter].push(i);
        });

        this.lettersUsed = {};
        this.wordsGuessed = [];

        this.currentTurn = 1;
    }

    isGameOver(): boolean {
        return this.currentTurn > this.maxTurns;
    }

    isGuessCorrect(guess: string): boolean {
        return guess === this.word;
    }

    isLetterInWord(letter: string): boolean {
        return this.word.indexOf(letter) >= 0;
    }

    isLetterInCorrectPosition(guess: string, letter: string): boolean {
        return this.word.indexOf(letter) === guess.indexOf(letter);
    }

    addGuess(guess: string): void {
        if (this.currentTurn <= this.maxTurns) {
            this.wordsGuessed.push(guess.toUpperCase());
        }
    }

    processLastGuess(): void {
        const guess = this.wordsGuessed[this.wordsGuessed.length - 1];

        if (this.isGuessCorrect(guess)) {
            console.log("You win!");
            return;
        }

        guess.split('').forEach((letter, i) => this.processLetter(letter, guess, i));
    }

    processLetter(letter: string, guess: string, index: number): void {
        this.lettersUsed[letter] = this.lettersUsed[letter] || {};

        if (!this.isLetterInWord(letter)) {
            this.lettersUsed[letter].letterGuessState = LetterGuessState.NotInWord;
        } else if (this.isLetterInCorrectPosition(guess, letter)) {
            this.lettersUsed[letter].letterGuessState = LetterGuessState.InCorrectPosition;
        } else {
            this.lettersUsed[letter].letterGuessState = LetterGuessState.InWrongPosition;
        }
    }
}

export default Game;