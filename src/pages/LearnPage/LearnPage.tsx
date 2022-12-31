import { ArrowBack } from '@mui/icons-material';
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
import { Preloader } from 'components/Preloader/Preloader';
import { useActions } from 'hooks';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ICard } from 'services/type';
import { asyncCardActions } from 'store/middleware/cards';
import { useAppSelector } from 'store/store';
import { getCard } from 'utils';

const grades1: Record<string, number> = {
  ['не знал']: 1,
  ['забыл']: 2,
  ['долго думал']: 3,
  ['перепутал']: 4,
  ['знал']: 5,
};

const LearnPage = () => {
  const totalCount = useAppSelector((state) => state.cards.cardsData.cardsTotalCount);
  const cards = useAppSelector((state) => state.cards.cardsData.cards);
  const packName = useAppSelector((state) => state.cards.cardsData.packName);
  const cardsStatus = useAppSelector((state) => state.cards.status);
  const isFetching = cardsStatus === 'loading';

  const [openAnswer, setOpenAnswer] = useState(false);

  const [card, setCard] = useState<ICard>();
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

  const nav = useLocation();
  const href = nav.pathname.split('/').slice(0, -1).join('/');

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <Box marginTop={3}>
      <Link
        to={href}
        style={{
          gap: '8px',
          color: 'black',
          textDecoration: 'none',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <ArrowBack />
        <Typography variant={'body1'}>Back to Pack List</Typography>
      </Link>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography>{packName}</Typography>
        <Card sx={{ width: '439px' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            <Box>
              <Typography>
                <strong>Question: </strong>
                {card?.question}
              </Typography>
              <Typography variant="body2" sx={{ mt: '13px' }}>
                Количество попыток ответов на вопрос: {card?.shots}
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

export default LearnPage;
