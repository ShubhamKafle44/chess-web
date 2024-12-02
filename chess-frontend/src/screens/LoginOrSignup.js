// Importing necessary modules and components
import React, { useState } from "react"; // React library and useState hook for managing component state
import Login from "../components/Login"; // Login component for user authentication
import SignUp from "../components/SignUp"; // SignUp component for user registration

// LoginOrSignup Component
// This functional component toggles between the Login and SignUp components based on the `isLogin` state.
// The `isLogin` state determines whether to display the Login or SignUp form.
// Props like `setIsLogin` are passed to child components for state management.
export default function LoginOrSignup() {
  const [isLogin, setIsLogin] = useState(true); // State to track whether Login or SignUp is active

  // Render the Login component if `isLogin` is true
  if (isLogin) return <Login setIsLogin={setIsLogin} isLogin={isLogin} />;

  // Render the SignUp component if `isLogin` is false
  return <SignUp setIsLogin={setIsLogin} isLogin={isLogin} />;
}
