import React, { useState } from 'react';
import './WriteStyle.css';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

export default function Write() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File selected:", file.name);
            
            // For immediate preview
            const objectUrl = URL.createObjectURL(file);
            console.log("Object URL created:", objectUrl);
            
            // Convert to base64 for storage
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result;
                console.log("Base64 conversion complete, length:", base64String.length);
                setImage(base64String);
            };
            reader.readAsDataURL(file);
            
            // Show immediate preview (will be replaced with base64 when ready)
            setImage(objectUrl);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const currentUser = UserService.getUser();
        if (!currentUser) {
            alert("You need to be logged in to post.");
            return;
        }
        
        console.log("Submitting post with image:", image ? "Yes (length: " + image.length + ")" : "No");
        
        const newPost = {
            id: Date.now(),
            title,
            body,
            imageUrl: image, // Save the base64 image
            userId: currentUser.username,
            userInfo: {
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                image: currentUser.image || '',
            },
            views: 0,
            comments: [],
            date: new Date().toISOString(),
        };
        
        // Debug
        console.log("New post object:", {
            ...newPost,
            imageUrl: image ? "Base64 image present" : "No image"
        });
        
        const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        savedPosts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(savedPosts));
        
        // Force Post.jsx to update
        window.dispatchEvent(new Event("storage"));
        
        setTitle('');
        setBody('');
        setImage(null);
        alert("Post published!");
        
        // Navigate to home page to see the new post
        navigate('/');
    };

    return (
        <div className='write'>
            {image && (
                <div className="image-preview-container">
                    <img className='writeimg' src={image} alt="Post preview" />
                </div>
            )}
            <form className='writeform' onSubmit={handleSubmit}>
                <button className="writesubmit" type="submit">Publish</button>
                <div className="writeformgroup">
                    <label htmlFor="fileinput">
                        <i className="writeicon fa-solid fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileinput"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeinput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus={true}
                        required
                    />
                </div>
                <div className="writeformgroup">
                    <textarea
                        placeholder="Tell your story..."
                        className="writeinput writetext"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
            </form>
        </div>
    );
}