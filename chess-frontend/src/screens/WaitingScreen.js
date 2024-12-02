// Importing necessary libraries and components
import React, { useEffect } from "react"; // React library and useEffect hook for side effects
import { useDispatch } from "react-redux"; // Hook to dispatch actions to Redux store
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import { addUsers } from "../api/action"; // Redux action to update users
import { socket } from "../helpers/apiHelpers"; // Socket connection for real-time communication

// WaitingScreen Component
// This functional component renders a waiting screen and listens for an event to navigate to a specific room
export default function WaitingScreen() {
  const navigate = useNavigate(); // Navigate hook for redirection
  const dispatch = useDispatch(); // Dispatch hook for updating Redux store

  // useEffect to handle side effects: listening to socket events
  useEffect(() => {
    // Listening to the "recieve_room_users" event from the server
    socket.on("recieve_room_users", (data) => {
      dispatch(addUsers(data)); // Dispatch action to update users in Redux store
      navigate(`/room/${data[0].roomId}`); // Navigate to the room with the received room ID
    });

    // Cleanup function to remove the socket listener when the component unmounts
    return () => {
      socket.off("recieve_room_users");
    };
  }, [dispatch, navigate]); // Dependency array includes `dispatch` and `navigate`

  return (
    <div style={rootDiv}>
      {" "}
      {/* Root div styled with flexbox for centering */}
      <img
        src={require("../assets/searching-opponent.gif")} // Animated GIF for visual feedback
        alt="waiting" // Alternate text for accessibility
        style={{ width: 200, height: 200 }} // Inline styling for image dimensions
      />
      <h3 style={{ color: "white" }}> Searching for opponent...</h3>{" "}
      {/* Status message */}
    </div>
  );
}

// Inline CSS styling for the root div
const rootDiv = {
  display: "flex", // Flexbox layout
  justifyContent: "center", // Center content horizontally
  height: "100vh", // Full viewport height
  alignItems: "center", // Center content vertically
  backgroundColor: "rgb(46, 46, 46)", // Dark background color
  flexDirection: "column", // Stack items vertically
};
