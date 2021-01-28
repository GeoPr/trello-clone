import {
  CREATE_BOARD,
  CREATE_NOTE,
  MOVE_NOTE,
  REMOVE_BOARD,
  REMOVE_NOTE,
  SET_NOTE_EDITABLE,
  TOGGLE_NOTE,
  EDIT_NOTE,
} from './actionsTypes';
import { TActions } from './../../store';
import * as actions from './actions';

export interface INote {
  id: number;
  title: string;
  isCompleted: boolean;
  isEditable: boolean;
}

export interface IBoard {
  id: number;
  title: string;
  notes: Array<INote>;
}

type TInitalState = Array<IBoard>;
type TAction = TActions<typeof actions>;

const initalState: TInitalState = JSON.parse(
  localStorage.getItem('boards') ?? '[]',
);

export const boardsReducer = (
  state: TInitalState = initalState,
  action: TAction,
): TInitalState => {
  switch (action.type) {
    case CREATE_BOARD: {
      const { title } = action.payload;
      const id = Date.now();

      return [...state, { id, title, notes: [] }];
    }

    case REMOVE_BOARD: {
      const { id } = action.payload;

      return state.filter(board => board.id !== id);
    }

    case CREATE_NOTE: {
      const { boardId, title } = action.payload;

      return state.map(board => {
        if (board.id === boardId) {
          const id = Date.now();

          return {
            ...board,
            notes: [
              ...board.notes,
              { title, id, isCompleted: false, isEditable: false },
            ],
          };
        }

        return board;
      });
    }

    case REMOVE_NOTE: {
      const { noteId, boardId } = action.payload;

      return state.map(board => {
        if (board.id === boardId) {
          const filteredBoardNotes = board.notes.filter(note => {
            return note.id !== noteId;
          });

          return { ...board, notes: filteredBoardNotes };
        }

        return board;
      });
    }

    case TOGGLE_NOTE: {
      const { noteId, boardId } = action.payload;

      return state.map(board => {
        if (board.id === boardId) {
          const updatedNotes = board.notes.map(note => {
            if (note.id === noteId) {
              return { ...note, isCompleted: !note.isCompleted };
            }

            return note;
          });

          return { ...board, notes: updatedNotes };
        }

        return board;
      });
    }

    case SET_NOTE_EDITABLE: {
      const { boardId, noteId, onlyFalse } = action.payload;

      return state.map(board => {
        if (board.id === boardId) {
          const updatedNotes = board.notes.map(note => {
            if (note.id === noteId) {
              note.isEditable = onlyFalse ? false : !note.isEditable;
            }

            return note;
          });

          board.notes = updatedNotes;
        }

        return board;
      });
    }

    case EDIT_NOTE: {
      const { boardId, noteId, newTitle } = action.payload;

      return state.map(board => {
        if (board.id === boardId) {
          const updatedNotes = board.notes.map(note => {
            if (note.id === noteId) {
              note.title = newTitle;
            }

            return note;
          });

          board.notes = updatedNotes;
        }

        return board;
      });
    }

    case MOVE_NOTE: {
      const { source, destination } = action.payload;

      const sourceBoard = state.find(board => {
        return board.id === +source.droppableId;
      })!;
      const destinationBoard = state.find(board => {
        return board.id === +destination.droppableId;
      })!;

      const sourceBoardNotesCopy = [...sourceBoard.notes];
      const destinationBoardNotesCopy = [...destinationBoard.notes];

      const [removedNote] = sourceBoardNotesCopy.splice(source.index, 1);
      destinationBoardNotesCopy.splice(destination.index, 0, removedNote);

      if (source.droppableId === destination.droppableId) {
        sourceBoardNotesCopy.splice(destination.index, 0, removedNote);
        sourceBoard.notes = sourceBoardNotesCopy;
      } else {
        sourceBoard.notes = sourceBoardNotesCopy;
        destinationBoard.notes = destinationBoardNotesCopy;
      }

      return state;
    }

    default: {
      return state;
    }
  }
};
