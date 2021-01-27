import { Button, Checkbox } from '@material-ui/core';
import React, { FC } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import {
  removeNote,
  toggleNote,
} from '../../redux/reducers/boardsReducer/actions';
import { INote } from '../../redux/reducers/boardsReducer/boardsReducer';
import './Note.scss';

interface IProps {
  note: INote;
  boardId: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

export const Note: FC<IProps> = ({ note, boardId, provided, snapshot }) => {
  const dispatch = useDispatch();

  const onChange = () => {
    dispatch(toggleNote(note.id, boardId));
  };

  const deleteNote = () => {
    dispatch(removeNote(note.id, boardId));
  };

  return (
    <li
      className={`notes__note note ${note.isCompleted && '_completed'}`}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      style={{
        filter: `opacity(${snapshot.isDragging ? '70%' : '100%'})`,
        background: snapshot.isDragging ? 'green' : '#333',
        ...provided.draggableProps.style,
      }}>
      <div className="note__box">
        <Checkbox
          checked={note.isCompleted}
          onChange={onChange}
          color="primary"
        />
        <span className="note__title">{note.title}</span>
      </div>
      <Button color="secondary" variant="contained" onClick={deleteNote}>
        Remove
      </Button>
    </li>
  );
};
