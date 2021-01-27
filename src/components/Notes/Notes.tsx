import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { INote } from '../../redux/reducers/boardsReducer/boardsReducer';
import { Note } from '../Note/Note';
import './Notes.scss';

interface IProps {
  notes: Array<INote>;
  boardId: number;
}

export const Notes: FC<IProps> = ({ notes, boardId }) => {
  return (
    <ul className={'board__notes notes'}>
      {notes.map((note, index) => (
        <Draggable key={note.id} index={index} draggableId={note.id + ''}>
          {(provided, snapshot) => (
            <Note
              note={note}
              boardId={boardId}
              key={note.id}
              provided={provided}
              snapshot={snapshot}
            />
          )}
        </Draggable>
      ))}
    </ul>
  );
};
