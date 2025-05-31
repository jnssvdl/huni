"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type AudioContextType = {
  play: (src: string) => void;
  pause: () => void;
  isPlaying: boolean;
  currentSrc: string | null;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  const play = useCallback((src: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentSrc(null);
      };
    } else {
      if (audioRef.current.src !== src) {
        audioRef.current.src = src;
      }
    }

    audioRef.current.play();
    setIsPlaying(true);
    setCurrentSrc(src);
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const value = useMemo(
    () => ({ play, pause, isPlaying, currentSrc }),
    [isPlaying, currentSrc, pause, play],
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context)
    throw new Error("useAudio must be used within an AudioProvider");
  return context;
};
