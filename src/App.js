import React, { useState } from "react";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const rollNumber = "ABCD123"; // Replace with your roll number

  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) {
        setError('Invalid JSON: Missing "data" key.');
        return;
      }

      const response = await fetch("https://your-backend-url.com/bfhl", {
        // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedInput),
      });

      const data = await response.json();
      setResponse(data);
      setError("");
    } catch (e) {
      setError("Invalid JSON input.");
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const result = {};

    if (selectedOptions.includes("Alphabets")) {
      result["Alphabets"] = response.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      result["Numbers"] = response.numbers;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      result["Highest Lowercase Alphabet"] =
        response.highest_lowercase_alphabet;
    }

    return <pre> {JSON.stringify(result, null, 2)} </pre>;
  };

  return (
    <div className="App">
      <h1> JSON Input Processor </h1>{" "}
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder="Enter JSON here"
          rows="4"
          cols="50"
        />
        <button type="submit"> Submit </button>{" "}
        {error && <p className="error"> {error} </p>}{" "}
      </form>
      {response && (
        <div>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets{" "}
          </label>{" "}
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers{" "}
          </label>{" "}
          <label>
            <input
              type="checkbox"
              value="Highest lowercase alphabet"
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet{" "}
          </label>
          {renderResponse()}{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default App;
