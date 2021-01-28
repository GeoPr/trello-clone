import React, { FC } from 'react';
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { removeBoard } from '../../redux/reducers/boardsReducer/actions';
import { IBoard } from '../../redux/reducers/boardsReducer/boardsReducer';
import { CreateNote } from '../CreateNote/CreateNote';
import { Notes } from '../Notes/Notes';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton, makeStyles } from '@material-ui/core';
import './Board.scss';

interface IProps {
  board: IBoard;
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
}

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: 0,
    top: 0,
  },
  icon: {
    fontSize: '2rem',
  },
}));

export const Board: FC<IProps> = ({ board, provided, snapshot }) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const deleteBoard = () => {
    dispatch(removeBoard(board.id));
  };

  return (
    <div
      className="board"
      ref={provided.innerRef}
      {...provided.droppableProps}
      style={{
        background: snapshot.isDraggingOver ? '#487eb0' : '#eee',
      }}>
      <div className="board__body">
        <IconButton className={styles.root} onClick={deleteBoard}>
          <HighlightOffIcon color="secondary" className={styles.icon} />
        </IconButton>
        <div className="board__title">{board.title}</div>
        <CreateNote boardId={board.id} />
        <Notes notes={board.notes} boardId={board.id} />
      </div>
      {provided.placeholder}
    </div>
  );
};
