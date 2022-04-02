import GameState from "./types/GameState";
import LetterGuessDictionary from "./types/LetterGuessDictionary";
import LetterGuessState from "./types/LetterGuessState";
import LetterPlacementDictionary from "./types/LetterPlacementDictionary";
import WordGuessState from "./types/WordGuessState";

class Game {
    private static wordList: string[];

    public static readonly VALID_LETTERS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    private static MAX_TURNS = 6;
    // global (in the game sense) fields
    private round = 0; // number of times the game has been played

    // round-specific fields
    private _gameState!: GameState;
    public get gameState(): GameState {
        return this._gameState;
    }

    private _currentTurn = 1;
    public get currentTurn(): number {
        return this._currentTurn;
    }

    private _numberOfTurns: number = Game.MAX_TURNS;
    public get numberOfTurns(): number {
        return this._numberOfTurns;
    }


    private _word!: string;
    public get word(): string {
        return this._word;
    }

    private letterPlacements: LetterPlacementDictionary = {};
    private letterGuesses: LetterGuessDictionary = {};
    private _wordsGuessed: string[] = [];
    public get wordsGuessed(): string[] {
        return this._wordsGuessed;
    }

    constructor(wordList: string[]) {
        Game.wordList = Game.initWordList(wordList);

        this.startNew();

        this.processGuess = this.processGuess.bind(this);
        this.getLetterGuessStateForKey = this.getLetterGuessStateForKey.bind(this);
        this.getLetterGuessStatesForGuess = this.getLetterGuessStatesForGuess.bind(this);
    }

    private static initWordList(wordList: string[]): string[] {
        return wordList
            .map(word => word.toUpperCase())
            .filter((word, i, arr) => arr.indexOf(word) === i); // eliminate duplicates
    }

    public startNew(): void {
        this.round += 1;

        this._gameState = GameState.InProgress;
        this.letterPlacements = {};
        this._currentTurn = 1;
        this._numberOfTurns = Game.MAX_TURNS;
        this._wordsGuessed = [];
        this.letterGuesses = {};

        this._word = Game.getRandomWord();
        this.initLetterPlacements();
    }

    private static getRandomWord(): string {
        const index: number = Math.floor(Math.random() * Game.wordList.length);

        return Game.wordList[index];
    }
    public getWordGuessState(guessInput: string[]): WordGuessState {
        const guess: string = guessInput.join("");

        if (guess.length < this.word.length) {
            return WordGuessState.InvalidLength;
        }

        if (!Game.wordList.includes(guess)) {
            return WordGuessState.NotInWordList;
        }

        return WordGuessState.Valid;
    }

    public processGuess(guess: string): void {
        this._wordsGuessed.push(guess);

        guess.split("").forEach((letter) => {
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

        this._currentTurn += 1;

        // if we got the right word, end the game
        if (this.isGuessCorrect(guess)) {
            this._gameState = GameState.Won;
            return;
        }

        if (this.isGameOver()) {
            this._gameState = GameState.Lost;
            return;
        }
    }

    public getLetterGuessStatesForGuess(guess: string): LetterGuessState[] {
        const output: LetterGuessState[] = new Array(this.word.length).fill(LetterGuessState.NotInWord);
        const guessedLetters = guess.split("");

        // I need a deep copy of the letter placements to avoid altering their values
        const letterPlacements: LetterPlacementDictionary = JSON.parse(JSON.stringify(this.letterPlacements));

        // first, fill in any correct guesses
        guessedLetters.forEach((letter, i) => {
            if (letter in letterPlacements && letterPlacements[letter].includes(i)) {
                output[i] = LetterGuessState.Correct;

                letterPlacements[letter] = letterPlacements[letter].filter(placementIndex => placementIndex !== i);
                if (letterPlacements[letter].length === 0) {
                    delete letterPlacements[letter];
                }
            }
        });

        // then look for any remaining letters in the wrong position
        guessedLetters.forEach((letter, i) => {
            if (letter in letterPlacements && output[i] !== LetterGuessState.Correct) {
                output[i] = LetterGuessState.InWrongPosition;

                // We know that all correct guesses have been exhausted at this point,
                // so we really only care about the length of this array now, 
                // thus the indiscriminate pop() here.
                letterPlacements[letter].pop();
                if (letterPlacements[letter].length === 0) {
                    delete letterPlacements[letter];
                }
            }
        });

        return output;
    }

    public getLetterGuessStateForKey(key: string): LetterGuessState | null {
        return this.letterGuesses[key]?.letterGuessState;
    }

    private initLetterPlacements() {
        this._word.split("").forEach((letter, i) => {
            if (letter in this.letterPlacements) {
                this.letterPlacements[letter].push(i);
            } else {
                this.letterPlacements[letter] = [i];
            }
        });
    }

    private isGameOver(): boolean {
        return this._currentTurn > this._numberOfTurns;
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
}

export default Game;