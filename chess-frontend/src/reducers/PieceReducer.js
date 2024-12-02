// Importing helper functions and initial states for pieces and opponent pieces
import { initialPieces, initialPiecesOpponent } from "../helpers/imageHelpers"; // Initial setup for player's pieces
import {
  tempInitialPieces,
  tempInitialPiecesOpponent,
} from "../helpers/imageHelpers"; // Temporary setup for resetting positions

// Initial state of the reducer
const initialState = {
  pieces: initialPieces, // Initial positions of player's pieces
  piecesOpponent: initialPiecesOpponent, // Initial positions of opponent's pieces
};

// Reducer function to manage the state of game pieces
export const pieceReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case to handle changes in the player's piece positions
    case "CHANGE_PIECE_POSITION":
      return {
        ...state, // Preserve the existing state
        pieces: action.payload, // Update the player's pieces with new positions
      };

    // Case to handle changes in the opponent's piece positions
    case "CHANGE_OPPONENT_PIECE_POSITION":
      return {
        ...state, // Preserve the existing state
        piecesOpponent: action.payload, // Update the opponent's pieces with new positions
      };

    // Case to reset the player's pieces to temporary initial positions
    case "RESET":
      return {
        pieces: tempInitialPieces, // Reset pieces to predefined positions
      };

    // Case to reset the opponent's pieces to temporary initial positions
    case "RESET_OPPONENT":
      return {
        piecesOpponent: tempInitialPiecesOpponent, // Reset opponent's pieces to predefined positions
      };

    // Default case to return the current state if no action matches
    default:
      return state;
  }
};
