import  { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post('http://localhost:8080/convert', {
        text: inputText, // Sending the text input to the Flask API
      });
      setOutputText(response.data.output); // Set the output from the API response
    } catch (err) {
      console.error(err);
      setError('Error communicating with the API. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Text Processor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="4"
          placeholder="Enter your text here..."
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
      </form>
      {outputText && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>Output:</h2>
          <p>{outputText}</p>
        </div>
      )}
      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Form;
