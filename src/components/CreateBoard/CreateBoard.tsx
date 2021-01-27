import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../redux/reducers/boardsReducer/actions';
import './CreateBoard.scss';

export const CreateBoard = () => {
  const [boardTitle, setBoardTitle] = useState('');
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (boardTitle.trim()) {
      dispatch(createBoard(boardTitle));
    }

    setBoardTitle('');
  };

  return (
    <form className="boards-form" onSubmit={onSubmit}>
      <TextField
        color="primary"
        variant="outlined"
        label="New board"
        autoComplete="off"
        value={boardTitle}
        onChange={onChange}
      />
      <Button type="submit" color="primary" variant="contained">
        Create
      </Button>
    </form>
  );
};
