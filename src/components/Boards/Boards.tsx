import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Board } from '../Board/Board';
import { TApp } from '../../redux/store';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import './Boards.scss';
import { moveNote } from '../../redux/reducers/boardsReducer/actions';

export const Boards = () => {
  const boards = useSelector((s: TApp) => s.boards);
  const dispatch = useDispatch();

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    dispatch(moveNote(source, destination));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="boards">
        {boards.map(board => (
          <Droppable droppableId={board.id + ''} key={board.id}>
            {provided => (
              <Board board={board} key={board.id} provided={provided} />
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
