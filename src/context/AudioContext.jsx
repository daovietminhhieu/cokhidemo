import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const AudioContext = createContext();

export function useAudio() {
    return useContext(AudioContext);
}

export function AudioProvider({ children }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Default audio source - can be made dynamic if needed
    const src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                })
                .catch(err => {
                    console.error("Audio play failed:", err);
                    setIsPlaying(false);
                });
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggle = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    // Attempt autoplay on mount (will likely fail without interaction, but worth a try)
    useEffect(() => {
        const attemptAutoplay = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Autoplay blocked, waiting for interaction.");
                }
            }
        };
        attemptAutoplay();
    }, []);

    const value = {
        isPlaying,
        play,
        pause,
        toggle,
        hasInteracted
    };

    return (
        <AudioContext.Provider value={value}>
            <audio
                ref={audioRef}
                src={src}
                loop
                style={{ display: 'none' }}
            />
            {children}
        </AudioContext.Provider>
    );
}
