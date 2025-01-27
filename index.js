import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { PartyPopper, Share2 } from 'lucide-react';

const LotteryBox = () => {
  const [numbers] = useState(() => {
    const nums = Array.from({length: 10}, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  });

  const [revealed, setRevealed] = useState(new Array(10).fill(false));
  const [winnerFound, setWinnerFound] = useState(false);
  const [winnerPosition, setWinnerPosition] = useState(null);
  const [lastRevealed, setLastRevealed] = useState(null);
  
  const handleClick = (index) => {
    if (!revealed[index]) {
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);
      setLastRevealed({ position: index, number: numbers[index] });
      
      if (numbers[index] === 1) {
        setWinnerFound(true);
        setWinnerPosition(index);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Savings Group Lottery</CardTitle>
      </CardHeader>
      <CardContent>
        {winnerFound && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <PartyPopper className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-green-800">Winner Found!</AlertTitle>
            <AlertDescription className="text-green-700">
              Box #{winnerPosition + 1} revealed number 1! This person will be the keeper of the savings.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {numbers.map((number, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-lg border-2 
                ${revealed[index] 
                  ? number === 1 
                    ? 'bg-green-500 border-green-600 text-white cursor-default animate-bounce'
                    : 'bg-blue-500 border-blue-600 text-white cursor-default'
                  : 'bg-white border-blue-500 text-blue-500 hover:bg-blue-50 cursor-pointer'
                }`}
              disabled={revealed[index]}
            >
              {revealed[index] ? number : '?'}
            </button>
          ))}
        </div>
        <div className="text-center">
          {lastRevealed ? (
            <button
              onClick={shareToWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <p className="text-gray-600">Click on a box to reveal your number!</p>
            </button>
        )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LotteryBox;
