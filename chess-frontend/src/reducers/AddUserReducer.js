// Initial state with user and users arrays
const initialState = {
  user: {}, // Stores the details of a single user
  users: [], // Stores the list of users
};

// Reducer function to manage user-related state
export const addUserReducer = (state = initialState, action) => {
  switch (action.type) {
    // Action to update user details in the state
    case "USER_DETAILS":
      return {
        ...state, // Keep existing state properties unchanged
        user: action.payload, // Set the user details from the action payload
      };

    // Action to update the list of users in the state
    case "ADD_USERS":
      return {
        ...state, // Keep existing state properties unchanged
        users: action.payload, // Set the users list from the action payload
      };

    // Default case to return the current state if no action matches
    default:
      return state;
  }
};
