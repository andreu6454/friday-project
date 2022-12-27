import { Box, Card, CardContent, Typography } from '@mui/material';
import { BackLinkButton } from 'components';
import React, { useState } from 'react';
import { appRoutes } from 'routes';

const getCard = (cards: any[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );
  console.log('test: ', sum, rand, res);

  return cards[res.id + 1];
};

export const LearnPage = () => {
  const [card, setCard] = useState();

  return (
    <Box marginTop={3}>
      <BackLinkButton link={appRoutes.PACKS}>Back To Pack List</BackLinkButton>

      <Box>
        <Typography>Learn Pack Name</Typography>
        <Card sx={{ width: '439px' }}>
          <CardContent>
            <Box fontWeight="bold" display="inline">
              Question:{' '}
              <Typography fontWeight={700}> How This works in JavaScript?</Typography>
            </Box>
            <Typography variant="body2">
              Количество попыток ответов на вопрос: 10
            </Typography>
            <Box fontWeight="bold" display="inline">
              Answer:{' '}
              <Typography fontWeight={700}>
                This is how This works in JavaScript
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
