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
  position: relative;
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

const PositionLabel = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 12px;
  color: ${props => props.revealed ? 'rgba(255, 255, 255, 0.8)' : '#666'};
`;

const Instructions = styled.p`
  text-align: center;
  color: #666;
  margin-top: 20px;
`;

const Legend = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const LegendTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const LotteryBox = () => {
  // Position labels
  const positions = [
    'TL', 'TM-L', 'TM', 'TM-R', 'TR',
    'BL', 'BM-L', 'BM', 'BM-R', 'BR'
  ];

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

  const getPositionName = (code) => {
    const positions = {
      'TL': 'Top Left',
      'TM-L': 'Top Middle-Left',
      'TM': 'Top Middle',
      'TM-R': 'Top Middle-Right',
      'TR': 'Top Right',
      'BL': 'Bottom Left',
      'BM-L': 'Bottom Middle-Left',
      'BM': 'Bottom Middle',
      'BM-R': 'Bottom Middle-Right',
      'BR': 'Bottom Right'
    };
    return positions[code];
  };

  return (
    <Container>
      <Title>Random Number Generator</Title>
      <Grid>
        {numbers.map((number, index) => (
          <Box
            key={index}
            onClick={() => handleClick(index)}
            revealed={revealed[index]}
          >
            <PositionLabel revealed={revealed[index]}>
              {positions[index]}
            </PositionLabel>
            {revealed[index] ? number : '?'}
          </Box>
        ))}
      </Grid>
      <Instructions>
        Ask participants to choose a box by its position code (e.g., "TL" for Top Left)
      </Instructions>
      <Legend>
        <LegendTitle>Position Guide:</LegendTitle>
        <LegendGrid>
          {positions.map((pos) => (
            <div key={pos}>
              <strong>{pos}</strong>: {getPositionName(pos)}
            </div>
          ))}
        </LegendGrid>
      </Legend>
    </Container>
  );
};

export default LotteryBox;
