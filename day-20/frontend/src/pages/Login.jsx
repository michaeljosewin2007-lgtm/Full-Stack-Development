import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleSubmit(e) {

  e.preventDefault();

  console.log("LOGIN CLICKED");

  try {

    console.log("SENDING REQUEST");

    const response = await axios.post(
      "http://localhost:3000/login",
      {
        email,
        password
      },
      {
        withCredentials: true
      }
    );

    console.log(response.data);

    window.location.href = "/dashboard";

  } catch (error) {

    setError(

        error.response?.data?.message ||

        "Login Failed"
    );
}
}

  return (
    <div className="auth-container">

      <h1>StudyFlow Login</h1>

      

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

      </form>
      <div
    className="auth-error"
    style={{
        visibility:
        error ? "visible" : "hidden"
    }}
>

    ❌ {error}

</div>

      <p>

        New User?

        <Link to="/register">
          Register
        </Link>

      </p>

    </div>
  );
}

export default Login;