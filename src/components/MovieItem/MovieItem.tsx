import React, {useState} from 'react';
import {Props} from '../../types';

const MovieItem: React.FC<Props> = React.memo(({id, text, onDelete, onEdit}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveOrBlur = () => {
    onEdit(id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="movie-item">
      {isEditing ? (
        <>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleSaveOrBlur}
            autoFocus
          />
          <div className="movie-buttons">
            <button onClick={handleSaveOrBlur}>Save</button>
          </div>
        </>
      ) : (
        <>
          <textarea readOnly>{text}</textarea>
          <div className="movie-buttons">
            <button onClick={handleEditClick}>Edit</button>
            <button className="delete" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isEditing === nextProps.isEditing;
});

export default MovieItem;
