import React, { useState, useEffect } from 'react';
import './SidebarStyle.css';
import aboutimage from '../../assets/sidebar/aboutme.webp';
import UserService from '../../services/UserService';

export default function Sidebar({ isSettingsPage, user }) {
  const loggedInUser = UserService.getUser();
  const currentUser = user || loggedInUser;

  const isOwnProfile = currentUser && (loggedInUser?.username === currentUser.username);

  const [sidebarText, setSidebarText] = useState(localStorage.getItem(`sidebarText_${currentUser?.username}`) || "No info available.");
  const [hobbies, setHobbies] = useState(JSON.parse(localStorage.getItem(`Hobbies_${currentUser?.username}`)) || ["Life", "Music", "Style", "Sport", "Tech", "Cinema"]);

  const [isEditing, setIsEditing] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);

  useEffect(() => {
    // Endast kör om currentUser ändras (och om den inte redan är satt)
    if (currentUser && !sidebarText) {
      const storedText = localStorage.getItem(`sidebarText_${currentUser.username}`) || "No info available.";
      const storedHobbies = JSON.parse(localStorage.getItem(`Hobbies_${currentUser.username}`)) || ["Life", "Music", "Style", "Sport", "Tech", "Cinema"];
      
      setSidebarText(storedText);
      setHobbies(storedHobbies);
    }
  }, [currentUser, sidebarText]); // Lägg till currentUser som beroende för att bara köra om användaren ändras

  const handleTextChange = (e) => {
    if (!isSettingsPage || !isOwnProfile) return;
    const newText = e.target.value;
    setSidebarText(newText);
    setSaveChanges(true);
  };

  const handleHobbieChange = (index, e) => {
    if (!isSettingsPage || !isOwnProfile) return;
    const newHobbies = [...hobbies];
    newHobbies[index] = e.target.value;
    setHobbies(newHobbies);
    setSaveChanges(true);
  };

  const toggleEditMode = () => {
    if (isOwnProfile) {
      if (isEditing && saveChanges) {
        localStorage.setItem(`sidebarText_${loggedInUser.username}`, sidebarText);
        localStorage.setItem(`Hobbies_${loggedInUser.username}`, JSON.stringify(hobbies));
        setSaveChanges(false);
      }
      setIsEditing(!isEditing);
    }
  };

  const handleSaveUpdates = () => {
    if (isOwnProfile) {
      localStorage.setItem(`sidebarText_${loggedInUser.username}`, sidebarText);
      localStorage.setItem(`Hobbies_${loggedInUser.username}`, JSON.stringify(hobbies));
      setSaveChanges(false);
      setIsEditing(false);
    }
  };

  return (
    <div className='sidebar'>
      <div className="sidebar-item">
        <span className='sidebar-title'>
          ABOUT {currentUser ? currentUser.username.toUpperCase() : "ME"}
        </span>
        <img className='sidebar-img' src={aboutimage} alt="About me" />

        <textarea
          className='sidebar-text'
          value={sidebarText}
          onChange={handleTextChange}
          placeholder="Write something about yourself..."
          readOnly={!isEditing}
        />
      </div>

      <span className='sidebar-title'>HOBBIES</span>
      <ul className='sidebar-list'>
        {hobbies.map((hobby, index) => (
          <li className={`sidebar-listitem ${isEditing ? "editing" : ""}`} key={index}>
            <input
              type="text"
              value={hobby}
              onChange={(e) => handleHobbieChange(index, e)}
              className={`hobbies-input ${isEditing ? "focused" : ""}`}
              readOnly={!isEditing}
            />
          </li>
        ))}
      </ul>

      {isSettingsPage && isOwnProfile && (
        <span className="edit-hint" onClick={toggleEditMode}>
          {isEditing ? "Save updates" : "Click for edit"}
        </span>
      )}

      {isEditing && saveChanges && (
        <button className="save-updates-btn" onClick={handleSaveUpdates}>
          Save updates
        </button>
      )}
    </div>
  );
}

