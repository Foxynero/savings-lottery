// LotteryBox.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const Box = styled.button`
  aspect-ratio: 1;
  border: 2px solid #2196f3;
  border-radius: 8px;
  background: ${props => props.revealed ? '#2196f3' : 'white'};
  color: ${props => props.revealed ? 'white' : '#2196f3'};
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.revealed ? '#2196f3' : '#e3f2fd'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Instructions = styled.p`
  text-align: center;
  color: #666;
  margin-top: 20px;
`;

const LotteryBox = () => {
  // Initialize shuffled numbers
  const [numbers] = useState(() => {
    const nums = Array.from({length: 10}, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  });

  const [revealed, setRevealed] = useState(new Array(10).fill(false));

  const handleClick = (index) => {
    if (!revealed[index]) {
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);
    }
  };

  return (
    <Container>
      <Title>Savings Group Random Selector</Title>
      <Grid>
        {numbers.map((number, index) => (
          <Box
            key={index}
            onClick={() => handleClick(index)}
            revealed={revealed[index]}
          >
            {revealed[index] ? number : '?'}
          </Box>
        ))}
      </Grid>
      <Instructions>
        Admin: Click on each box to reveal the number when a participant selects it
      </Instructions>
    </Container>
  );
};

export default LotteryBox;
