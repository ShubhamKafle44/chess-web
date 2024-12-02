/**
 * Home Component
 *
 * This component serves as the main hub for authenticated users. It displays a welcome message, allows users to join
 * a chess room with a specified time limit, and provides functionality to log out. The component also fetches
 * user details on load to check if they are already in a game and manages reconnections using Socket.IO.
 *
 * Key Features:
 * - Displays user-specific greetings based on authentication.
 * - Supports joining chess rooms with various time settings.
 * - Handles secure logout and user session management.
 * - Provides future extension for custom games and AI gameplay.
 */

import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/action";
import { socket, url } from "../helpers/apiHelpers";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const _id = localStorage.getItem("_id");

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.post(`${url}/get-user`, {
          _id,
        });

        const data = response.data;

        dispatch(addUser(data.user));

        if (data.user?.isInGame) {
          socket.emit("reconnection", { roomId: data.user.activeGameRoomId });
          // navigate(`/room/${data.user.activeGameRoomId}`);
        }
      } catch (e) {
        console.log("Error while fetching user details", e.message);
      }
    };
    getUserDetails();
  }, [dispatch, _id]);

  const logout = () => {
    localStorage.removeItem("_id");
    navigate("/");
    window.location.reload();
  };

  //THis is for creating a socket connection calling the server for hanshake connection.
  const joinChessRoom = (min) => {
    socket.emit("join_room", {
      username: user?.username,
      min: min,
    });

    navigate(`/waiting`);
  };

  return (
    <div style={rootDiv}>
      <div
        style={{
          height: 60,
          display: "flex",
          width: "100%",
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginLeft: 5 }}> Hello {user?.username}</h3>
        </div>

        <img
          src="./logo.jpg"
          alt=""
          style={{ height: 40, width: 40, margin: 5 }}
        />

        <Button onClick={logout} style={{ fontWeight: "bold" }}>
          {" "}
          Logout
        </Button>
      </div>

      <div style={{ padding: 10 }}>
        <h2
          style={{
            color: "white",
            display: "flex", // Make it a flex container
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically (if parent has height)
            textAlign: "center", // Ensures the text is centered if it spans multiple lines
          }}
        >
          Play
        </h2>

        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => {
              joinChessRoom(3);
            }}
            style={timeComp}
          >
            3 min
          </Button>
          <Button
            onClick={() => {
              joinChessRoom(5);
            }}
            style={timeComp}
          >
            5 min
          </Button>
          <Button
            onClick={() => {
              joinChessRoom(10);
            }}
            style={timeComp}
          >
            10 min
          </Button>
          <Button
            onClick={() => {
              joinChessRoom(15);
            }}
            style={timeComp}
          >
            15 min
          </Button>
          <Button
            onClick={() => {
              joinChessRoom(30);
            }}
            style={timeComp}
          >
            30 min
          </Button>
        </div>
        <br />

        {/*This section is for playing with an AI and users can also create a custom game. This is my future work.  */}
        {/* 
        <h2
          style={{
            color: "white",
            display: "flex", // Make it a flex container
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically (if parent has height)
            textAlign: "center", // Ensures the text is centered if it spans multiple lines
          }}
        >
          {" "}
          Other{" "}
        </h2>

        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Button style={otherComponent}>Custom Game</Button>
          <Button style={otherComponent}>Play with AI</Button>
        </div> */}
      </div>
    </div>
  );
}

const rootDiv = {
  // height: "100vh",
  // backgroundColor: "rgb(46, 46, 46)",
  display: "flex",
  flexDirection: "column",

  justifyContent: "center",
  height: "100vh",
  alignItems: "center",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/black-linen.png')",
  backgroundColor: "rgb(34, 34, 34)",
};

const timeComp = {
  color: "white",
  backgroundColor: "rgba(191, 41, 41, 0.5)",
  height: 60,
  margin: 2,
  fontSize: 20,
};

const otherComponent = {
  color: "white", // Text color
  backgroundColor: "rgba(191, 41, 41, 0.8)", // Slightly darker background for better contrast
  height: 60,
  margin: "10px auto", // Center-align and add consistent spacing
  padding: "10px 20px", // Add internal spacing
  fontSize: "16px", // Text size
  fontWeight: "bold", // Make the text stand out
  textAlign: "center", // Center the text
  borderRadius: "8px", // Smooth rounded corners
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
  cursor: "pointer", // Pointer cursor for interactivity
  transition: "all 0.3s ease", // Smooth hover transition
};
