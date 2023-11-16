import React, {useState} from 'react';
import MovieItem from './components/MovieItem/MovieItem';
import {MovieId} from './types';
import JokeApp from './components/Joke/JokeApp';
import './App.css';

const App: React.FC = () => {
  const [movieItems, setMovieItems] = useState<MovieId[]>([]);
  const [newMovieTitle, setNewMovieTitle] = useState<string>('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMovieTitle.trim() !== '') {
      setMovieItems((prevItems) => [
        ...prevItems,
        { id: generateUniqueId(), text: newMovieTitle.trim(), isEditing: false },
      ]);
      setNewMovieTitle('');
    }
  };

  const handleDelete = (id: string) => {
    setMovieItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string, newText: string) => {
    setMovieItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? {...item, text: newText} : item))
    );
  };

  const generateUniqueId = (): string => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={addItem}>
          <input
            type="text"
            placeholder="Enter the name of the movie"
            value={newMovieTitle}
            onChange={(e) => setNewMovieTitle(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
        <div className="movie-list">
          <h4>To watch list:</h4>
          {movieItems.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              text={movie.text}
              onDelete={() => handleDelete(movie.id)}
              onEdit={(newText) => handleEdit(movie.id, newText)}
              isEditing={movie.isEditing}
            />
          ))}
        </div>
      </div>
      <div className="container">
        <JokeApp/>
      </div>
    </>
  );
};

export default App;