"use client";
import React, { useState } from 'react';

const CDPlayer = ({musicTitle}:{musicTitle:string}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
    <p className='font-bold text-lg mb-4'>{musicTitle}</p>
    <div className="cd-player" style={{ width: '400px', height: '500px', position: 'relative' }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* CD Player body */}
        <circle cx="100" cy="100" r="100" fill="#333"/>
        
        {/* CD */}
        <g className={`cd ${isPlaying ? 'rotating' : ''}`}>
          <circle cx="100" cy="100" r="80" fill="#111"/>
          <circle cx="100" cy="100" r="30" fill="#333"/>
          <circle cx="100" cy="100" r="5" fill="#111"/>
          {/* Add some visual elements to make rotation more visible */}
          <line x1="100" y1="20" x2="100" y2="70" stroke="#444" strokeWidth="2" />
          <line x1="20" y1="100" x2="80" y2="100" stroke="#444" strokeWidth="2" />
        </g>
        
        {/* Play button */}
        <g className="play-button" onClick={togglePlay} style={{ cursor: 'pointer' }}>
          <circle cx="170" cy="170" r="20" fill="#4CAF50"/>
          <path d="M165,160 L165,180 L180,170 Z" fill="white"/>
        </g>
      </svg>

      <style jsx>{`
        .cd {
          transform-origin: center;
          transition: transform 0.5s linear;
        }
        .rotating {
          animation: rotate 5s linear infinite;
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default CDPlayer;