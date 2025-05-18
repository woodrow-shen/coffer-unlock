import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const GameStatus = ({ gameState, onStart }) => {
  const getStatusMessage = () => {
    switch (gameState) {
      case 'idle':
        return '準備開始遊戲';
      case 'memorizing':
        return '記憶指令中...';
      case 'playing':
        return '解鎖金庫中...';
      case 'success':
        return '恭喜！成功解鎖金庫！';
      case 'fail':
        return '很遺憾，解鎖失敗...';
      default:
        return '';
    }
  };

  return (
    <StatusContainer>
      <h2>{getStatusMessage()}</h2>
      {gameState === 'idle' && (
        <button onClick={onStart}>開始遊戲</button>
      )}
    </StatusContainer>
  );
};

export default GameStatus;
