import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DialContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DialCircle = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #2c3e50;
  position: relative;
  border: 12px solid #34495e;
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.5),
    0 0 20px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1);
`;

const OuterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.1);
`;

const Pointer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 20px;
  background: #e74c3c;
  box-shadow: 0 0 5px rgba(231, 76, 60, 0.5);
`;

const CurrentInstruction = styled.div`
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  color: #ecf0f1;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0,0,0,0.5);
  background: rgba(44, 62, 80, 0.9);
  padding: 15px 25px;
  border-radius: 10px;
  border: 3px solid #34495e;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  white-space: nowrap;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 20px;
`;

const RotateButton = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
`;

const TickMark = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 16px;
  height: 120px;
  background: #e74c3c;
  transform: translateX(-50%);
  box-shadow: 0 0 5px rgba(231, 76, 60, 0.5);
`;

const Dial = ({ onRotate }) => {
  const [rotation, setRotation] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [currentDirection, setCurrentDirection] = useState(null);

  const handleRotate = (direction) => {
    const newRotation = direction === 'left' 
      ? rotation - 36 
      : rotation + 36;
    setRotation(newRotation);
    
    if (currentDirection === direction) {
      setCurrentCount(prev => prev + 1);
    } else {
      setCurrentCount(1);
      setCurrentDirection(direction);
    }

    const currentNumber = Math.abs(Math.floor(newRotation / 36) % 10) + 1;
    onRotate(direction, currentNumber);
  };

  return (
    <DialContainer>
      <DialCircle
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <InnerCircle />
        <OuterCircle />
        <TickMark />
        <Pointer />
      </DialCircle>
      <CurrentInstruction>
        {currentDirection ? `${currentDirection === 'left' ? '左' : '右'}${currentCount}` : '請轉動'}
      </CurrentInstruction>
      <ButtonContainer>
        <RotateButton onClick={() => handleRotate('left')}>左轉</RotateButton>
        <RotateButton onClick={() => handleRotate('right')}>右轉</RotateButton>
      </ButtonContainer>
    </DialContainer>
  );
};

export default Dial;
