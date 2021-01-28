import { Button, TextField, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../redux/reducers/boardsReducer/actions';
import './CreateBoard.scss';

const useStyles = makeStyles({
  root: {
    color: '#fff',
  },
  label: {
    color: 'gray'
  },
});

export const CreateBoard = () => {
  const [boardTitle, setBoardTitle] = useState('');
  const dispatch = useDispatch();
  const styles = useStyles();

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
        InputProps={{
          className: styles.root,
        }}
        InputLabelProps={{
          className: styles.label
        }}
      />
      <Button type="submit" color="primary" variant="contained">
        Create
      </Button>
    </form>
  );
};
