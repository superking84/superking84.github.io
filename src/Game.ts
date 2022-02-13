import LetterDictionary from "./types/LetterDictionary";
import LetterGuessDictionary from "./types/LetterGuessDictionary";
import LetterGuessState from "./types/LetterGuessState";

class Game {
    private static MAX_TURNS: number = 6;
    // global (in the game sense) fields
    private round: number; // number of times the game has been played

    // round-specific fields
    private currentTurn: number;
    private numberTurns: number;

    private _word!: string;
    public get word(): string {
        return this._word;
    }

    private letterPlacements: LetterDictionary;
    private letterGuesses: LetterGuessDictionary;
    private wordsGuessed: string[];

    constructor() {
        this.round = 1;

        this.letterPlacements = {};
        this.currentTurn = 1;
        this.numberTurns = Game.MAX_TURNS;
        this.letterGuesses = {};
        this.wordsGuessed = [];
    }

    public startNew(): void {
        this.round += 1;

        this.letterPlacements = {};
        this.currentTurn = 1;
        this.numberTurns = Game.MAX_TURNS;
        this.wordsGuessed = [];
        this.letterGuesses = {};

        this._word = "BINGO";
        this.initLetterPlacements();
    }

    public processGuess(guess: string): void {
        this.currentTurn += 1;
        this.wordsGuessed.push(guess);

        // if we got the right word, end the game
        if (this.isGuessCorrect(guess)) {
            console.log('win');

            return;
        }

        if (this.isGameOver()) {
            console.log('lose');

            return;
        }

        // otherwise, start processing letter placements
        guess.split('').forEach((letter, i) => {
            let newLetterGuessState: LetterGuessState;
            if (this.isLetterCorrect(guess, letter)) {
                newLetterGuessState = LetterGuessState.Correct;
            } else if (this.isLetterInWord(letter)) {
                newLetterGuessState = LetterGuessState.InWrongPosition;
            } else {
                newLetterGuessState = LetterGuessState.NotInWord;
            }

            if (letter in this.letterGuesses) {
                const currentLetterGuessState = this.letterGuesses[letter].letterGuessState;

                // If the right position has already been guessed,
                // that shouldn't be superseded by a bad guess
                if (newLetterGuessState > currentLetterGuessState) {
                    this.letterGuesses[letter].letterGuessState = newLetterGuessState;
                }
            } else {
                this.letterGuesses[letter].letterGuessState = newLetterGuessState;
            }
        });
    }

    private initLetterPlacements() {
        this._word.split('').forEach((letter, i) => {
            if (letter in this.letterPlacements) {
                this.letterPlacements[letter].push(i);
            } else {
                this.letterPlacements[letter] = [i];
            }
        });
    }

    private isGameOver(): boolean {
        return this.currentTurn === this.numberTurns;
    }

    private isGuessCorrect(guess: string): boolean {
        return guess === this._word;
    }

    private isLetterCorrect(guess: string, letter: string): boolean {
        return this._word?.indexOf(letter) === guess.indexOf(letter);
    }

    private isLetterInWord(letter: string): boolean {
        return this._word?.indexOf(letter) >= 0;
    }
};

export default Game;