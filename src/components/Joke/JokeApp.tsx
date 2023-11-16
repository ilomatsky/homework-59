import React, { useState, useEffect } from 'react';

interface Joke {
  value: string;
}

const JokeApp: React.FC = () => {
  const [joke, setJoke] = useState<string>('Loading...');

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data: Joke = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Failed to fetch joke');
    }
  };

  return (
    <div className="App">
      <div id="joke-container">
        <p id="joke-text">{joke}</p>
        <button id="new-joke-btn" onClick={fetchJoke}>
          Get New Joke
        </button>
      </div>
    </div>
  );
};

export default JokeApp;
