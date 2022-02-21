import LetterPlacementDictionary from "./types/LetterPlacementDictionary";
import LetterGuessDictionary from "./types/LetterGuessDictionary";
import LetterGuessState from "./types/LetterGuessState";
import GameState from "./types/GameState";
import WordGuessState from "./types/WordGuessState";

class Game {
    private static wordList: string[] = [
        "ABUSE",
        "ADULT",
        "AGENT",
        "ANGER",
        "APPLE",
        "AWARD",
        "BASIS",
        "BEACH",
        "BIRTH",
        "BLOCK",
        "BLOOD",
        "BOARD",
        "BRAIN",
        "BREAD",
        "BREAK",
        "BROWN",
        "BUYER",
        "CAUSE",
        "CHAIN",
        "CHAIR",
        "CHEST",
        "CHIEF",
        "CHILD",
        "CHINA",
        "CLAIM",
        "CLASS",
        "CLOCK",
        "COACH",
        "COAST",
        "COURT",
        "COVER",
        "CREAM",
        "CRIME",
        "CROSS",
        "CROWD",
        "CROWN",
        "CYCLE",
        "DANCE",
        "DEATH",
        "DEPTH",
        "DOUBT",
        "DRAFT",
        "DRAMA",
        "DREAM",
        "DRESS",
        "DRINK",
        "DRIVE",
        "EARTH",
        "ENEMY",
        "ENTRY",
        "ERROR",
        "EVENT",
        "FAITH",
        "FAULT",
        "FIELD",
        "FIGHT",
        "FINAL",
        "FLOOR",
        "FOCUS",
        "FORCE",
        "FRAME",
        "FRANK",
        "FRONT",
        "FRUIT",
        "GLASS",
        "GRANT",
        "GRASS",
        "GREEN",
        "GROUP",
        "GUIDE",
        "HEART",
        "HENRY",
        "HORSE",
        "HOTEL",
        "HOUSE",
        "IMAGE",
        "INDEX",
        "INPUT",
        "ISSUE",
        "JAPAN",
        "JONES",
        "JUDGE",
        "KNIFE",
        "LAURA",
        "LAYER",
        "LEVEL",
        "LEWIS",
        "LIGHT",
        "LIMIT",
        "LUNCH",
        "MAJOR",
        "MARCH",
        "MATCH",
        "METAL",
        "MODEL",
        "MONEY",
        "MONTH",
        "MOTOR",
        "MOUTH",
        "MUSIC",
        "NIGHT",
        "NOISE",
        "NORTH",
        "NOVEL",
        "NURSE",
        "OFFER",
        "ORDER",
        "OTHER",
        "OWNER",
        "PANEL",
        "PAPER",
        "PARTY",
        "PEACE",
        "PETER",
        "PHASE",
        "PHONE",
        "PIECE",
        "PILOT",
        "PITCH",
        "PLACE",
        "PLANE",
        "PLANT",
        "PLATE",
        "POINT",
        "POUND",
        "POWER",
        "PRESS",
        "PRICE",
        "PRIDE",
        "PRIZE",
        "PROOF",
        "QUEEN",
        "RADIO",
        "RANGE",
        "RATIO",
        "REPLY",
        "RIGHT",
        "RIVER",
        "ROUND",
        "ROUTE",
        "RUGBY",
        "SCALE",
        "SCENE",
        "SCOPE",
        "SCORE",
        "SENSE",
        "SHAPE",
        "SHARE",
        "SHEEP",
        "SHEET",
        "SHIFT",
        "SHIRT",
        "SHOCK",
        "SIGHT",
        "SIMON",
        "SKILL",
        "SLEEP",
        "SMILE",
        "SMITH",
        "SMOKE",
        "SOUND",
        "SOUTH",
        "SPACE",
        "SPEED",
        "SPITE",
        "SPORT",
        "SQUAD",
        "STAFF",
        "STAGE",
        "START",
        "STATE",
        "STEAM",
        "STEEL",
        "STOCK",
        "STONE",
        "STORE",
        "STUDY",
        "STUFF",
        "STYLE",
        "SUGAR",
        "TABLE",
        "TASTE",
        "TERRY",
        "THEME",
        "THING",
        "TITLE",
        "TOTAL",
        "TOUCH",
        "TOWER",
        "TRACK",
        "TRADE",
        "TRAIN",
        "TREND",
        "TRIAL",
        "TRUST",
        "TRUTH",
        "UNCLE",
        "UNION",
        "UNITY",
        "VALUE",
        "VIDEO",
        "VISIT",
        "VOICE",
        "WASTE",
        "WATCH",
        "WATER",
        "WHILE",
        "WHITE",
        "WHOLE",
        "WOMAN",
        "WORLD",
        "YOUTH"
    ];

    public static readonly VALID_LETTERS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    private static MAX_TURNS: number = 6;
    // global (in the game sense) fields
    private round: number; // number of times the game has been played

    // round-specific fields
    private _gameState!: GameState;
    public get gameState(): GameState {
        return this._gameState;
    }

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

    private letterPlacements: LetterPlacementDictionary;
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

        this.processGuess = this.processGuess.bind(this);
        this.getLetterGuessStateForKey = this.getLetterGuessStateForKey.bind(this);
        this.getLetterGuessStateForGuess = this.getLetterGuessStateForGuess.bind(this);
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
        const guess: string = guessInput.join('');

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

    public getLetterGuessStateForGuess(letter: string, index: number): LetterGuessState {
        if (!(letter in this.letterPlacements)) {
            return LetterGuessState.NotInWord;
        }

        if (!this.letterPlacements[letter].includes(index)) {
            return LetterGuessState.InWrongPosition;
        }

        return LetterGuessState.Correct;
    }

    public getLetterGuessStateForKey(key: string): LetterGuessState | null {
        return this.letterGuesses[key]?.letterGuessState;
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
};

export default Game;