import {
  CREATE_BOARD,
  CREATE_NOTE,
	MOVE_NOTE,
  REMOVE_BOARD,
  REMOVE_NOTE,
  TOGGLE_NOTE,
} from './actionsTypes';
import { DraggableLocation } from 'react-beautiful-dnd';

export const createBoard = (title: string) => ({
	type: CREATE_BOARD,
	payload: { title },
} as const);

export const removeBoard = (id: number) => ({
	type: REMOVE_BOARD,
	payload: { id },
} as const);

export const createNote = (title: string, boardId: number) => ({
	type: CREATE_NOTE,
	payload: { title, boardId },
} as const);

export const removeNote = (noteId: number, boardId: number) => ({
	type: REMOVE_NOTE,
	payload: { noteId, boardId }
} as const);

export const toggleNote = (noteId: number, boardId: number) => ({
	type: TOGGLE_NOTE,
	payload: { noteId, boardId },
} as const);

export const moveNote = (source: DraggableLocation, destination: DraggableLocation) => ({
	type: MOVE_NOTE,
	payload: { source, destination }
} as const);