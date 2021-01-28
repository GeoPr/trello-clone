import {
  CREATE_BOARD,
  CREATE_NOTE,
	MOVE_NOTE,
  REMOVE_BOARD,
  REMOVE_NOTE,
	TOGGLE_NOTE,
	EDIT_NOTE,
	SET_NOTE_EDITABLE
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

export const setNoteEditable = (boardId: number, noteId: number, onlyFalse: boolean = false) => ({
	type: SET_NOTE_EDITABLE,
	payload: { boardId, noteId, onlyFalse }
} as const);

export const editNote = (boardId: number, noteId: number, newTitle: string) => ({
	type: EDIT_NOTE,
	payload: { boardId, noteId, newTitle }
} as const);