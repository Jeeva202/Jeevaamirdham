import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@mui/material';
import Chip from '@mui/material/Chip';
import PlayCircleFilled from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilled from '@mui/icons-material/PauseCircleFilled';
import './todayThoughts.css';

export default function TodayThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [currentThought, setCurrentThought] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef(null);

  // Fetch thoughts from API
  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL + '/todays-thoughts');
        const data = await response.json();
        setThoughts(data);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
      }
    };

    fetchThoughts();
  }, []);

  // Handle audio source changes and playback state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !thoughts[currentThought]?.audioUrl) {
      setIsAudioReady(false);
      return;
    }

    // Reset audio state for new source
    setIsAudioReady(false);
    setIsPlaying(false);
    audio.pause();
    audio.src = thoughts[currentThought].audioUrl;
    
    // Load the new audio source
    audio.load();

    const handleCanPlay = () => {
      setIsAudioReady(true);
      // Auto-play if previous track was playing (optional)
      if (isPlaying) {
        audio.play().catch(e => console.log('Auto-play prevented:', e));
      }
    };

    const handleError = () => {
      setIsAudioReady(false);
      setIsPlaying(false);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [currentThought, thoughts]);

  // Handle audio playback events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Cycle through thoughts every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentThought((prev) => {
        const nextThought = (prev + 1) % thoughts.length;
        return nextThought;
      });
    }, 15000);

    return () => clearInterval(timer);
  }, [thoughts.length, isPlaying]);

  
  const handleThoughtChange = (index) => {
    // Pause current audio before changing thought
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentThought(index);
    setIsPlaying(false);
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !thoughts[currentThought]?.audioUrl) return;

    try {
      if (isPlaying) {
        await audio.pause();
      } else {
        await audio.play();
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="today-thoughts-container">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="none"
      />
      
      <Container maxWidth="lg" sx={{ padding: "8px 0" }}>
        {thoughts.length > 0 ? (
          <div className="today-thoughts-content">
            <Chip
              label="• Today's Thought"
              size="small"
              sx={{
                backgroundColor: "#DC6803",
                color: "#FFFFFF",
                fontSize: { lg: '0.7rem', sm: '0.5rem', md: '0.6rem' },
              }}
            />
            <div className="today-thoughts-text">
              <h4 style={{display: 'flex', alignItems: 'center'}}>
                {thoughts[currentThought]?.audioUrl && (
                  <button 
                    onClick={toggleAudio} 
                    className="audio-play-button"
                    disabled={!isAudioReady}
                    aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                  >
                    {isPlaying ? (
                      <PauseCircleFilled fontSize="large" />
                    ) : (
                      <PlayCircleFilled fontSize="large" />
                    )}
                  </button>
                )}
                <span className="highlight">{currentThought + 1}.</span>{" "}
                {thoughts[currentThought]?.content}
              </h4>
            </div>
            <div className="thoughts-navigation">
              {thoughts.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${currentThought === index ? 'active' : ''}`}
                  onClick={() => handleThoughtChange(index)}
                  aria-label={`Thought ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading thoughts...</p>
        )}
      </Container>
    </div>
  );
}