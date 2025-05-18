import React from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.secondary};
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius};
`;

const Timer = ({ timeLeft, gameState, timerType }) => {
  if (gameState === 'idle') return null;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerLabel = () => {
    if (gameState === 'memorizing') return '記憶時間';
    if (gameState === 'playing') return '解鎖時間';
    return '';
  };

  return (
    <TimerContainer>
      {getTimerLabel()}：{formatTime(timeLeft)}
    </TimerContainer>
  );
};

export default Timer;
