import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Dial from './Dial';
import Instructions from './Instructions';
import Timer from './Timer';
import GameStatus from './GameStatus';

const VaultContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  gap: 2rem;
`;

const VaultBody = styled(motion.div)`
  width: 400px;
  height: 500px;
  background: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius};
  position: relative;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  flex-shrink: 0;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  min-width: 600px;
`;

const LeftInstructionPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  gap: 1rem;
`;

const RightControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  gap: 1rem;
`;

const ConfirmButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3d8b40;
  }
`;

const CompletedInstructions = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
`;

const CompletedInstruction = styled.div`
  padding: 5px 0;
  color: #4CAF50;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TimeSettingContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const TimeSettingLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const TimeInput = styled.input`
  width: 80px;
  padding: 8px 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const TimeUnit = styled.span`
  margin-left: 8px;
  font-size: 16px;
  color: #666;
`;

const VaultDoor = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #4CAF50;
  transform-origin: left;
  z-index: 2;
  display: ${props => props.isComplete ? 'block' : 'none'};
`;

const Vault = () => {
  const [gameState, setGameState] = useState('idle');
  const [instructions, setInstructions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [memorizeTimeLeft, setMemorizeTimeLeft] = useState(60);
  const [gameTimeLeft, setGameTimeLeft] = useState(180);
  const [currentCount, setCurrentCount] = useState(0);
  const [hasStartedCurrentInstruction, setHasStartedCurrentInstruction] = useState(false);
  const [currentDirection, setCurrentDirection] = useState(null);
  const [customMemorizeTime, setCustomMemorizeTime] = useState(60);

  useEffect(() => {
    let memorizeTimer;
    
    if (gameState === 'memorizing') {
      memorizeTimer = setInterval(() => {
        setMemorizeTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(memorizeTimer);
            setGameState('playing');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (memorizeTimer) {
        clearInterval(memorizeTimer);
      }
    };
  }, [gameState]);

  useEffect(() => {
    let gameTimer;
    
    if (gameState === 'playing') {
      gameTimer = setInterval(() => {
        setGameTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(gameTimer);
            setGameState('fail');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (gameTimer) {
        clearInterval(gameTimer);
      }
    };
  }, [gameState]);

  const handleDialRotation = (direction) => {
    if (gameState !== 'playing') return;
    
    const currentInstruction = instructions[currentStep];
    
    if (currentInstruction.direction !== direction) {
      setGameState('fail');
      return;
    }

    setCurrentDirection(direction);
    setCurrentCount(prev => prev + 1);
  };

  const handleConfirmInstruction = () => {
    const currentInstruction = instructions[currentStep];
    
    if (currentCount !== currentInstruction.number) {
      setGameState('fail');
    } else if (currentStep === instructions.length - 1) {
      setGameState('success');
    } else {
      setCurrentStep(prev => prev + 1);
      setCurrentCount(0);
      setCurrentDirection(null);
      setHasStartedCurrentInstruction(false);
    }
  };

  const startGame = () => {
    generateInstructions();
    setGameState('memorizing');
    setMemorizeTimeLeft(customMemorizeTime);
    setGameTimeLeft(180);
    setCurrentStep(0);
    setCurrentCount(0);
    setHasStartedCurrentInstruction(false);
  };

  const generateInstructions = () => {
    const newInstructions = [];
    for (let i = 0; i < 10; i++) {
      const direction = Math.random() < 0.5 ? 'left' : 'right';
      newInstructions.push({
        direction,
        number: Math.floor(Math.random() * 10) + 1
      });
    }
    setInstructions(newInstructions);
  };

  // 獲取已完成的指令
  const completedInstructions = instructions.slice(0, currentStep);

  return (
    <VaultContainer>
      <VaultBody>
        <AnimatePresence>
          {gameState === 'success' && currentStep === instructions.length - 1 && (
            <VaultDoor
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -90 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>
        <Dial onRotate={handleDialRotation} currentCount={currentCount} currentDirection={currentDirection} />
      </VaultBody>
      
      <RightPanel>
        <LeftInstructionPanel>
          <Instructions 
            instructions={instructions} 
            currentStep={currentStep}
            gameState={gameState}
          />
        </LeftInstructionPanel>
        
        <RightControlPanel>
          <Timer 
            timeLeft={gameState === 'memorizing' ? memorizeTimeLeft : gameTimeLeft}
            gameState={gameState}
            timerType={gameState === 'memorizing' ? 'memorizing' : 'playing'}
          />
          
          {gameState === 'playing' && (
            <>
              <CompletedInstructions>
                {completedInstructions.map((instruction, index) => (
                  <CompletedInstruction key={index}>
                    {index + 1}. {instruction.direction === 'left' ? '左' : '右'} {instruction.number} 次
                  </CompletedInstruction>
                ))}
              </CompletedInstructions>
              <ConfirmButton onClick={handleConfirmInstruction}>
                確認當前指令
              </ConfirmButton>
            </>
          )}
          
          {gameState === 'idle' && (
            <TimeSettingContainer>
              <TimeSettingLabel htmlFor="memorize-time">
                記憶時間設定：
              </TimeSettingLabel>
              <TimeInput
                id="memorize-time"
                type="number"
                min="10"
                max="300"
                value={customMemorizeTime}
                onChange={(e) => setCustomMemorizeTime(Math.max(10, Math.min(300, parseInt(e.target.value) || 60)))}
              />
              <TimeUnit>秒</TimeUnit>
            </TimeSettingContainer>
          )}
          
          <GameStatus 
            gameState={gameState}
            onStart={startGame}
          />
        </RightControlPanel>
      </RightPanel>
    </VaultContainer>
  );
};

export default Vault;
