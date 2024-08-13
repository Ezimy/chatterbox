import React, { useState } from 'react';
import './editDescription.css';
import { useUserStore } from '../../../../lib/userStore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
const EditDescription = ({setIsEditingDescription}) => {
  const { currentUser, updateUser } = useUserStore();
  const [newDescription, setNewDescription] = useState(currentUser.description);

  const handleSaveDescription = async () => {
    const userRef = doc(db, 'users', currentUser.id);
    try{
      await updateDoc(userRef, { description: newDescription });
      updateUser({ ...currentUser, description: newDescription });
      console.log('Save description')
    }
    catch(err){ console.log(err) }
    finally{
      setIsEditingDescription(false)
    }
  };
  const handleCancel = () => {
    console.log('Cancel editing description');
    setIsEditingDescription(false);
  }
  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  return (
    <div className='edit-description'>
      <h3>Edit Description</h3>
      <textarea
        value={newDescription}
        onChange={handleDescriptionChange}
      />
      <div className='buttons'>
        <button onClick={handleSaveDescription}>
          Save
        </button>
        <button className="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditDescription;