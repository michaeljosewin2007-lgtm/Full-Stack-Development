import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/register",
        {
          name,
          email,
          password
        },
        {
          withCredentials: true
        }
      );

      window.location.href = "/";

    } catch (error) {

    setError(

        error.response?.data?.message ||

        "Registration Failed"
    );
}
  }

  return (
    <div className="auth-container">

      <h1>Create Account</h1>

      


      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          Register
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

        Already Registered?

        <Link to="/">
          Login
        </Link>

      </p>

    </div>
  );
}

export default Register;