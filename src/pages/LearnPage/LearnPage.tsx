import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { BackLinkButton } from 'components';
import { useActions } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICard } from 'services/api/cards';
import { asyncCardActions } from 'store/middleware/cards';
import { useAppSelector } from 'store/store';

const getCard = (cards: ICard[]) => {
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

const grades1: Record<string, number> = {
  ['не знал']: 1,
  ['забыл']: 2,
  ['долго думал']: 3,
  ['перепутал']: 4,
  ['знал']: 5,
};

export const LearnPage = () => {
  const totalCount = useAppSelector((state) => state.cards.cardsData.cardsTotalCount);
  const cards = useAppSelector((state) => state.cards.cardsData.cards);

  const [openAnswer, setOpenAnswer] = useState(false);

  const [card, setCard] = useState<ICard | null>(null);
  const [grade, setGrade] = useState('не знал');

  const { fetchCards, updateCardGrade } = useActions(asyncCardActions);

  const { id } = useParams();

  useEffect(() => {
    setCard(getCard(cards));
    if (id) {
      fetchCards({ cardsPack_id: id, pageCount: totalCount });
    }
  }, [id]);

  const nextQuestionHandle = () => {
    if (card) {
      updateCardGrade({ grade: grades1[grade], card_id: card._id });
    }
    setCard(getCard(cards));
    setOpenAnswer(false);
    setGrade('не знал');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade((event.target as HTMLInputElement).value);
  };

  return (
    <Box marginTop={3}>
      {/* <BackLinkButton link={appRoutes.PACKS}>Back To Pack List</BackLinkButton> */}
      <Button>Back to Pack lIst</Button>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography>Learn Pack Name</Typography>
        <Card sx={{ width: '439px' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            <Box>
              <Typography>
                <strong>Question: </strong>
                {card?.question}
              </Typography>
              <Typography variant="body2" sx={{ mt: '13px' }}>
                Количество попыток ответов на вопрос: 10
              </Typography>
            </Box>
            {openAnswer ? (
              <>
                <Box>
                  <Typography>
                    <strong>Answer: </strong>
                    {card?.answer}
                  </Typography>
                </Box>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Rate yourself:
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={grade}
                    name="radio-buttons-group"
                    value={grade}
                    onChange={handleChange}
                  >
                    {Object.keys(grades1).map((grade, i) => (
                      <FormControlLabel
                        key={grade + i}
                        value={grade}
                        control={<Radio />}
                        label={grade}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Button variant="contained" onClick={nextQuestionHandle}>
                  Next
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={() => setOpenAnswer(true)}>
                Show answer
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
