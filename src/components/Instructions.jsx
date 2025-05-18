import React from 'react';
import styled from 'styled-components';

const InstructionsContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius};
  min-width: 300px;
  transition: opacity 0.3s ease;
  opacity: ${props => props.gameState === 'memorizing' ? 1 : 0};
  visibility: ${props => props.gameState === 'memorizing' ? 'visible' : 'hidden'};
`;

const Instruction = styled.div`
  margin: 0.5rem 0;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
`;

const Instructions = ({ instructions, currentStep, gameState }) => {
  if (gameState === 'idle') return null;

  return (
    <InstructionsContainer gameState={gameState}>
      <h2>{gameState === 'memorizing' ? '記憶指令' : '當前指令'}</h2>
      {instructions.map((instruction, index) => (
        <Instruction
          key={index}
          style={{
            opacity: gameState === 'memorizing' || index === currentStep ? 1 : 0.5
          }}
        >
          {instruction.direction === 'left' ? '左' : '右'} {instruction.number}
        </Instruction>
      ))}
    </InstructionsContainer>
  );
};

export default Instructions;
