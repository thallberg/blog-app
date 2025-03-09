import React, { useEffect, useState } from 'react';
import './SinglePostStyle.css';
import { useParams, useNavigate } from 'react-router-dom';
import blogimg from '../../assets/Posts/blogimg.webp';
import UserService from '../../services/UserService';
import BlogService from '../../services/BlogService';


export default function SinglePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [newComment, setNewComment] = useState("");

  const loggedInUser = UserService.getUser();

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const postID = Number(postId);
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const localPost = savedPosts.find(p => p.id === postID);

      if (localPost) {
        localPost.views = (localPost.views || 0) + 1;
        setPost(localPost);
        setEditedTitle(localPost.title);
        setEditedBody(localPost.body);
        console.log("Hittade inlägg i localStorage:", localPost);
        savedPosts[savedPosts.findIndex(p => p.id === postID)] = localPost;
        localStorage.setItem("posts", JSON.stringify(savedPosts));
      } else {
        try {
          const postData = await BlogService.getPostWithCommentsAndUser(postID);
          if (postData) {
            // Check if we have stored comments for this API post
            const apiComments = JSON.parse(localStorage.getItem("apiComments")) || {};

            if (apiComments[postID]) {
              // Use stored comments if available
              postData.comments = apiComments[postID];
            }

            setPost(postData);
            setEditedTitle(postData.title);
            setEditedBody(postData.body);
          } else {
            setPost(null); // If post doesn't exist
          }
        } catch (error) {
          console.error("Fel vid hämtning av inlägg:", error);
          setPost(null);
        }
      }
      setLoading(false);
    }

    fetchPost();
  }, [postId]);

  // Kontrollera om inloggad användare är samma som inläggets ägare
  const isOwner = loggedInUser && (
    post?.user?.username === loggedInUser.username || // Om post.user är ett objekt
    post?.userId === loggedInUser.username // Om post.userId är en sträng
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedPost = { ...post, title: editedTitle, body: editedBody };

    // Uppdatera i localStorage om det är ett lokalt inlägg
    let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const postIndex = savedPosts.findIndex(p => p.id === post.id);

    if (postIndex !== -1) {
      savedPosts[postIndex] = updatedPost;
      localStorage.setItem("posts", JSON.stringify(savedPosts));
    }

    setPost(updatedPost);
    setIsEditing(false);
  };

  const handleDelete = () => {
    let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const newPosts = savedPosts.filter(p => p.id !== post.id);

    localStorage.setItem("posts", JSON.stringify(newPosts));
    navigate("/"); // Tillbaka till startsidan efter radering
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(), // Unique ID for the comment based on time
        user: { username: loggedInUser ? loggedInUser.username : 'Anonymous' },
        body: newComment
      };

      // Create updated post with the new comment
      const updatedPost = {
        ...post,
        comments: [...(post.comments || []), comment]
      };

      // Update state with the new comment
      setPost(updatedPost);

      // Clear comment field
      setNewComment("");

      // Check if the post is from localStorage
      let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const postIndex = savedPosts.findIndex(p => p.id === post.id);

      if (postIndex !== -1) {
        // Update in localStorage if it's a local post
        savedPosts[postIndex] = updatedPost;
        localStorage.setItem("posts", JSON.stringify(savedPosts));
      } else {
        // For API posts, we'll store just the comments in localStorage
        let apiComments = JSON.parse(localStorage.getItem("apiComments")) || {};

        // Store comments by post ID
        apiComments[post.id] = updatedPost.comments;
        localStorage.setItem("apiComments", JSON.stringify(apiComments));
      }
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!post) return <h2>Post not found...</h2>;

  return (
    <div className='singlepost'>
      <div className="singlepost-wrapper">
      <img
  className='singlepost-image'
  src={post.imageUrl || blogimg}
  alt={post.title}
  onError={(e) => {
    console.log("Image failed to load in SinglePost, using default");
    e.target.src = blogimg;
  }}
/>

        {isEditing ? (
          <input
            className="edit-title-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlepost-title">
            {post.title}
            {isOwner && (
              <div className="singlepost-editcontainer">
                <i className="singlepost-icon fa-solid fa-pen-to-square" onClick={handleEdit}></i>
                <i className="singlepost-icon fa-solid fa-trash-can" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlepost-info">
          <span className='singlepost-author'>Author: {post.user || post.userId}</span>
          <span className='singlepost-date'>Views: {post.views || 0}</span>
        </div>

        {isEditing ? (
          <textarea
            className="edit-body-input"
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
        ) : (
          <p className='singlepost-desc'>{post.body}</p>
        )}

        {isEditing && (
          <button className="save-button" onClick={handleSave}>Save Changes</button>
        )}

        <div className='comment-section'>
          <div className='comments-container'>
            <h2>Comments</h2>
            {post.comments?.length > 0 ? (
              post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <h3>{comment.user?.username}</h3>
                  <p>{comment.body}</p>
                </div>
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>

          <div className="new-comment-container">
            <h2>Add Comment</h2>
            <textarea
              className="edit-body-input"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment..."
            />
            <button className="save-button" onClick={handleCommentSubmit}>Post Comment</button>
          </div>
        </div>

      </div>
    </div>
  );
}
