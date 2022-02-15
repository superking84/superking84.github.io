import LetterDictionary from "./types/LetterDictionary";
import LetterGuessDictionary from "./types/LetterGuessDictionary";
import LetterGuessState from "./types/LetterGuessState";

class Game {
    private static MAX_TURNS: number = 6;
    // global (in the game sense) fields
    private round: number; // number of times the game has been played

    // round-specific fields
    private _currentTurn: number;
    public get currentTurn(): number {
        return this._currentTurn;
    }

    private _numberOfTurns: number;
    public get numberOfTurns(): number {
        return this._numberOfTurns;
    }


    private _word!: string;
    public get word(): string {
        return this._word;
    }

    private letterPlacements: LetterDictionary;
    private letterGuesses: LetterGuessDictionary;
    private _wordsGuessed: string[];
    public get wordsGuessed(): string[] {
        return this._wordsGuessed;
    }

    constructor() {
        this.round = 1;

        this.letterPlacements = {};
        this._currentTurn = 1;
        this._numberOfTurns = Game.MAX_TURNS;
        this.letterGuesses = {};
        this._wordsGuessed = [];

        this.isGuessValid = this.isGuessValid.bind(this);
        this.processGuess = this.processGuess.bind(this);
        this.getLetterGuessState = this.getLetterGuessState.bind(this);
    }

    public startNew(): void {
        this.round += 1;

        this.letterPlacements = {};
        this._currentTurn = 1;
        this._numberOfTurns = Game.MAX_TURNS;
        this._wordsGuessed = [];
        this.letterGuesses = {};

        this._word = "BINGO";
        this.initLetterPlacements();
    }

    public isGuessValid(guessInput: string[]): boolean {
        return guessInput.length === this.word.length;
    }

    public processGuess(guess: string): void {
        this._currentTurn += 1;
        this._wordsGuessed.push(guess);

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
                this.letterGuesses[letter] = { letterGuessState: newLetterGuessState };
            }
        });

        // if we got the right word, end the game
        if (this.isGuessCorrect(guess)) {
            console.log('win');

            return;
        }

        if (this.isGameOver()) {
            console.log('lose');

            return;
        }
    }

    public getLetterGuessState(letter: string): LetterGuessState | null {
        return this.letterGuesses[letter]?.letterGuessState;
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
        return this._currentTurn >= this._numberOfTurns;
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