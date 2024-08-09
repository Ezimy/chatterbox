import React, { useState } from 'react';
import './editDescription.css';
import { useUserStore } from '../../../../lib/userStore';
const EditDescription = ({onSave}) => {
  const { currentUser, updateUser } = useUserStore();
  const [newDescription, setNewDescription] = useState('');

  const handleSaveDescription = async () => {
    console.log('Save description:', newDescription);
    onSave();
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  return (
    <div className='edit-description'>
      <h3>Edit Description</h3>
      <textarea
        value={currentUser.description}
        onChange={handleDescriptionChange}
      />
      <button onClick={handleSaveDescription}>
        Save
      </button>
    </div>
  );
};

export default EditDescription;