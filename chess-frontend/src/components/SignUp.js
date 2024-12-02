import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, addUsers } from "../api/action";
import { socket, url } from "../helpers/apiHelpers";
import AlertComponent from "./AlertComponent";

export default function SignUp(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const signUp = async () => {
    if (!username || !password) {
      setMessage("Please fill all details");
      setOpen(true);
      return;
    }

    if (password.length < 6) {
      setMessage("password should be more than 6 character");
      setOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${url}/signup`, {
        username: username,
        password: password,
      });

      const data = response.data;

      if (data.status === 200) {
        localStorage.setItem("_id", data.user._id);
        dispatch(addUser({ username }));
        navigate("/home");
      } else {
        setOpen(true);
        setMessage(data.message);
      }
    } catch (e) {
      console.log("Error while signup", e.message);
    }
  };
  return (
    <div style={rootDiv}>
      <div style={signUpDiv}>
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        <button style={signUpButtonStyle} onClick={signUp}>
          {" "}
          Sign Up
        </button>

        <h5
          onClick={() => {
            props.setIsLogin(!props.isLogin);
          }}
          style={createNewAccountStyle}
        >
          {" "}
          Already have an account?
        </h5>
      </div>

      <AlertComponent open={open} handleclose={handleClose} message={message} />
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

const signUpDiv = {
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
  padding: 5,
  outline: "none",
  backgroundColor: "rgb(255, 253, 234)",
  border: "none",
  borderBottom: "1px solid black",
};

const signUpButtonStyle = {
  backgroundColor: "green",
  width: "28%",
  padding: 5,
  border: "none",
  outline: "none",
  borderRadius: 2,
  color: "white",
  marginTop: 8,
  cursor: "pointer",
};

const createNewAccountStyle = {
  color: "#09396B",
  cursor: "pointer",
};
