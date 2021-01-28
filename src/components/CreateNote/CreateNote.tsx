import { Button, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../redux/reducers/boardsReducer/actions';
import './CreateNote.scss';

export const CreateNote: FC<{ boardId: number }> = ({ boardId }) => {
	const [noteTitle, setNoteTitle] = useState('');
	const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
	};
	
	const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (noteTitle.trim()) {
			dispatch(createNote(noteTitle, boardId))
		}

		setNoteTitle('');
	}

  return (
    <form className="notes-form" onSubmit={onSubmit}>
      <TextField
        color="secondary"
        variant="filled"
        autoComplete="off"
        value={noteTitle}
        onChange={onChange}
        label="New note"
      />
      <Button type="submit" color="primary" variant="contained">
        Create
      </Button>
    </form>
  );
};
