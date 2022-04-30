import LetterGuessState from "./LetterGuessState";

type LetterGuessDictionary = {
    [index: string]: {
        letterGuessState: LetterGuessState;
    };
};

export default LetterGuessDictionary;