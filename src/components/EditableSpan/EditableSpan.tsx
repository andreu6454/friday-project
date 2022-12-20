import { AddTask, Edit } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type EditableSpanType = {
  Nickname: string;
  callBack: (newTitle: string) => void;
};
export const EditableSpan = (props: EditableSpanType) => {
  const { Nickname, callBack } = props;
  const [edit, setEdit] = useState(false);
  const [newNickname, setNewNickname] = useState(Nickname);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.currentTarget.value);
  };
  const changeNickname = () => {
    if (newNickname !== Nickname) {
      callBack(newNickname);
    }
  };

  const toggleHandler = () => {
    setEdit(!edit);
    changeNickname();
  };

  return edit ? (
    <Box display={'flex'} alignItems={'flex-end'} height={'48px'}>
      <TextField
        label={'Nickname'}
        variant={'standard'}
        value={newNickname}
        onChange={onChangeHandler}
        onBlur={toggleHandler}
        autoFocus
        fullWidth
        required
      ></TextField>
      <AddTask
        sx={{ opacity: 0.5, ml: 0.5, pb: 1 }}
        fontSize={'large'}
        onClick={toggleHandler}
      />
    </Box>
  ) : (
    <Box display={'flex'} alignItems={'flex-end'} height={'48px'}>
      <Typography
        variant={'h6'}
        fontWeight={'Bold'}
        textAlign={'center'}
        mt={2}
        onDoubleClick={toggleHandler}
      >
        {Nickname}
      </Typography>
      <Edit
        sx={{ opacity: 0.5, ml: 0.5, pb: 1 }}
        fontSize={'large'}
        onClick={toggleHandler}
      />
    </Box>
  );
};
