"use client";

import React from 'react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  className = '',
}) => {
  const words = text.split(' ');

  return (
    <h1 className={`text-4xl md:text-6xl font-bold text-center mb-8 ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-4">
          {word.split('').map((letter, letterIndex) => (
            <span
              key={`${wordIndex}-${letterIndex}`}
              className="inline-block animate-slide-in text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 shimmer"
              style={{
                animationDelay: `${wordIndex * 0.1 + letterIndex * 0.05}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};