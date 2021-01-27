import React, { FC } from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { removeBoard } from '../../redux/reducers/boardsReducer/actions';
import { IBoard } from '../../redux/reducers/boardsReducer/boardsReducer';
import { CreateNote } from '../CreateNote/CreateNote';
import { Notes } from '../Notes/Notes';
import './Board.scss';

interface IProps {
  board: IBoard;
  provided: DroppableProvided;
}

export const Board: FC<IProps> = ({ board, provided }) => {
  const dispatch = useDispatch();

  const deleteBoard = () => {
    dispatch(removeBoard(board.id));
  };

  return (
    <div className="board" ref={provided.innerRef} {...provided.droppableProps}>
      <div className="board__body">
        <span className="board__icon" onClick={deleteBoard}>
          &times;
        </span>
        <div className="board__title">{board.title}</div>
        <CreateNote boardId={board.id} />
        <Notes notes={board.notes} boardId={board.id} />
      </div>
      {provided.placeholder}
    </div>
  );
};
