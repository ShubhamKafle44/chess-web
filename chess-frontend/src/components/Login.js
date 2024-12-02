import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/action";
import { url } from "../helpers/apiHelpers";
import AlertComponent from "./AlertComponent";

export default function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleclose = () => {
    setOpen(false);
  };

  //   const joinChessRoom = () => {
  //     if (username === " ") return alert("please enter all details");
  //     socket.emit("join_room", {
  //       username,
  //     });

  //     dispatch(addUser({ username }));

  //     navigate(`/waiting`);
  //   };

  const login = async () => {
    if (!username || !password) {
      setMessage("Please fill all details");
      setOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${url}/login`, {
        username: username,
        password: password,
      });

      const data = response.data;

      if (data.status === 200) {
        localStorage.setItem("_id", data.user._id);
        navigate("/home");
        dispatch(addUser(data.user));
      } else {
        setOpen(true);
        setMessage(data.message);
      }
    } catch (e) {
      console.log("Error while login", e.message);
    }
  };

  return (
    <div style={rootDiv}>
      <div style={loginDiv}>
        <h2> LETS PLAY CHESS</h2>

        <input
          style={inputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <br />

        <input
          style={inputStyle}
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button style={loginButtonStyle} onClick={login}>
          {" "}
          Login
        </button>

        <h5
          onClick={() => {
            props.setIsLogin(!props.isLogin);
          }}
          style={createNewAccountStyle}
        >
          {" "}
          Create new account
        </h5>
      </div>

      <AlertComponent open={open} handleclose={handleclose} message={message} />
    </div>
  );
}

const rootDiv = {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  alignItems: "center",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/black-linen.png')",
  backgroundColor: "rgb(34, 34, 34)",
};

const loginDiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: 300,
  height: 250,
  borderRadius: "10px", // Slightly smoother rounded corners
  backgroundImage: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)", // Gradient with pastel pinks
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  padding: "20px", // Adds space inside the container
};

const inputStyle = {
  width: "60%",
  padding: "8px 10px", // Better spacing for text
  outline: "none", // Removes default focus outline
  backgroundColor: "rgba(255, 253, 234, 0.8)", // Slightly transparent for blending
  border: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border for visibility
  borderRadius: "5px", // Rounded corners for a softer look
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Adds depth
  fontSize: "16px", // Modern and readable font size
  transition: "all 0.3s ease", // Smooth transition for focus effect
};

const loginButtonStyle = {
  backgroundColor: "green", // Primary background color
  width: "30%", // Slightly increased for better proportion
  padding: "10px 15px", // More consistent internal spacing
  border: "none", // Removes border
  outline: "none", // Prevents default focus outline
  borderRadius: "5px", // Smooth rounded corners
  color: "white", // Text color
  fontSize: "16px", // More readable text size
  fontWeight: "bold", // Stronger emphasis
  marginTop: "10px", // Spacing from the top
  cursor: "pointer", // Pointer cursor for interactivity
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  transition: "all 0.3s ease", // Smooth transition for hover effect
};

const createNewAccountStyle = {
  color: "#09396B",
  cursor: "pointer",
};
