'use client';

import { useReducer, useEffect, useCallback } from 'react';

interface TypingEffectProps {
    phrases: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

interface TypingState {
    text: string;
    phraseIndex: number;
    isDeleting: boolean;
}

type TypingAction =
    | { type: 'TYPE'; currentPhrase: string }
    | { type: 'DELETE' }
    | { type: 'START_DELETING' }
    | { type: 'NEXT_PHRASE'; phraseCount: number };

function typingReducer(state: TypingState, action: TypingAction): TypingState {
    switch (action.type) {
        case 'TYPE':
            return { ...state, text: action.currentPhrase.substring(0, state.text.length + 1) };
        case 'DELETE':
            return { ...state, text: state.text.substring(0, state.text.length - 1) };
        case 'START_DELETING':
            return { ...state, isDeleting: true };
        case 'NEXT_PHRASE':
            return {
                text: '',
                isDeleting: false,
                phraseIndex: (state.phraseIndex + 1) % action.phraseCount,
            };
        default:
            return state;
    }
}

export function TypingEffect({
    phrases,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 2000,
}: TypingEffectProps) {
    const [{ text, phraseIndex, isDeleting }, dispatch] = useReducer(typingReducer, {
        text: '',
        phraseIndex: 0,
        isDeleting: false,
    });

    const tick = useCallback(() => {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting && text === currentPhrase) {
            // Pause then start deleting
            const timeout = setTimeout(() => dispatch({ type: 'START_DELETING' }), pauseDuration);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && text === '') {
            // Advance to next phrase (always via setTimeout → no sync setState in effect)
            const timeout = setTimeout(
                () => dispatch({ type: 'NEXT_PHRASE', phraseCount: phrases.length }),
                deletingSpeed,
            );
            return () => clearTimeout(timeout);
        }

        // Type or delete one character
        const timeout = setTimeout(
            () =>
                dispatch(
                    isDeleting
                        ? { type: 'DELETE' }
                        : { type: 'TYPE', currentPhrase },
                ),
            isDeleting ? deletingSpeed : typingSpeed,
        );
        return () => clearTimeout(timeout);
    }, [text, phraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseDuration]);

    useEffect(() => tick(), [tick]);

    return (
        <span className="typing-effect">
            <span className="typing-effect__text">{text}</span>
            <span className="typing-effect__cursor animate-blink">|</span>
        </span>
    );
}
