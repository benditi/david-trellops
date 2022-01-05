import { boardService } from '../../services/board-service.js';

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.getBoardsPrm();
      dispatch({ type: 'SET_BOARDS', boards });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadBoard(boardId) {
  return async (dispatch) => {
    try {
      const board = await boardService.getBoardPrm(boardId);
      dispatch({ type: 'SET_BOARD', board });
    } catch (err) {
      console.log(err);
    }
  };
}

export function onSaveBoard(board) {
  return async (dispatch) => {
    try {
      await boardService.updateBoardPrm(board);
      dispatch({ type: 'SAVE_BOARD', board });
    } catch (err) {
      console.log('BoardActions: err in onSaveBoard', err);
    }
  };
}
export function onSetBoardTitle(boardId, title) {
  return async (dispatch) => {
    try {
      const newBoard = await boardService.updateBoardPrm({
        id: boardId,
        title,
      });
      dispatch({ type: 'SAVE_BOARD', newBoard });
    } catch (err) {
      console.log('BoardActions: err in onSaveBoard', err);
    }
  };
}

export function onAddBoard(body) {
  return async (dispatch) => {
    try {
      await boardService.addBoardPrm(body);
      const boards = await boardService.getBoardsPrm();
      dispatch({ type: 'SET_BOARDS', boards });
    } catch (err) {
      console.log('BoardActions: err in onAddBoard', err);
    }
  };
}
export function onDeleteBoard(id) {
  return async (dispatch) => {
    try {
      await boardService.deleteBoardPrm(id);
      const boards = await boardService.getBoardsPrm();
      dispatch({ type: 'SET_BOARDS', boards });
    } catch (err) {
      console.log('BoardActions: err in onDeleteBoard ', err);
    }
  };
}
