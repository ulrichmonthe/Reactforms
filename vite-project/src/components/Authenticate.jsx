import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message); // Handle API errors
      }

      setSuccessMessage(result.message); // Display success message
    } catch (error) {
      setError(error.message); // Handle errors
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}