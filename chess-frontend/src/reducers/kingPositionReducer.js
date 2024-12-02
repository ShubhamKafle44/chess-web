// Initial state of the king positions for both the player and the opponent
const initialState = {
  kingPos: "7:3", // Initial position of the player's king
  kingPosOp: "7:4", // Initial position of the opponent's king
};

// Reducer function to manage the state of king positions
export const kingPositionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case to update the position of the player's king
    case "CHANGE_KING_POSITION":
      return {
        ...state, // Preserve the existing state
        kingPos: action.payload, // Update the player's king position
      };

    // Case to update the position of the opponent's king
    case "CHANGE_OPPONENT_KING_POSITION":
      return {
        ...state, // Preserve the existing state
        kingPosOp: action.payload, // Update the opponent's king position
      };

    // Default case to return the current state if no action matches
    default:
      return state;
  }
};
