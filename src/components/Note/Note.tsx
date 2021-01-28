import { Checkbox, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { FC, useRef, useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import {
  removeNote,
  toggleNote,
  editNote,
  setNoteEditable,
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
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    dispatch(toggleNote(note.id, boardId));
  };

  const deleteNote = () => {
    dispatch(removeNote(note.id, boardId));
  };

  const setEditableNote = (onlyFalse: boolean = false) => {
    dispatch(setNoteEditable(boardId, note.id, onlyFalse));
  };

  const editNoteTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newNoteTitle.trim()) {
      dispatch(editNote(boardId, note.id, newNoteTitle));
      setEditableNote();
    }
  };

  const setNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNoteTitle(e.target.value);
  };

  return (
    <li
      className={`notes__note note ${note.isCompleted && '_completed'}`}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      style={{
        filter: `opacity(${snapshot.isDragging ? '70%' : '100%'})`,
        background: snapshot.isDragging ? 'green' : '#2c3e50',
        ...provided.draggableProps.style,
      }}>
      <div className="note__box">
        <Checkbox
          checked={note.isCompleted}
          onChange={onChange}
          color="primary"
        />
        <div className="note__title">
          {note.isEditable ? (
            <>
              <input
                className="note__title-text"
                ref={inputRef}
                style={{
                  width: inputRef?.current?.scrollWidth,
                }}
                value={newNoteTitle}
                autoFocus
                onChange={setNoteTitle}
                onKeyPress={editNoteTitle}
                onBlur={() => setEditableNote(true)}
              />
              <span className="note__title-label">
                Press "Enter" to save changes
              </span>
            </>
          ) : (
            <span>{note.title}</span>
          )}
        </div>
      </div>
      <div className="note__icons">
        <IconButton onClick={() => setEditableNote()}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={deleteNote}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </div>
    </li>
  );
};
