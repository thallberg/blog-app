import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostStyle.css';
import blogimg from '../../assets/Posts/blogimg.webp';
import { BlogService } from '../../services/BlogService';


export default function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const apiPosts = await BlogService.getPosts();
                const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
                
                console.log("API posts:", apiPosts);
                console.log("Local posts:", savedPosts);
                
                // Check if any local posts have images
                const postsWithImages = savedPosts.filter(post => post.imageUrl);
                console.log("Posts with images:", postsWithImages.length);
                
                const allPosts = [...apiPosts, ...savedPosts];
                setPosts(allPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        
        fetchPosts();
        
        // Update when localStorage changes
        const handleStorageChange = () => {
            fetchPosts();
        };
        
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="posts-container">
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <Link to={`/post/${post.id}`} className="post-link">
                        <img 
                            className="post-image" 
                            src={post.imageUrl || blogimg} 
                            alt={post.title} 
                            onError={(e) => {
                                console.log("Image failed to load, falling back to default");
                                e.target.src = blogimg;
                            }}
                        />
                        <div className="post-info">
                            <h2 className="post-title">{post.title}</h2>
                            <p className="post-body">
                                {post.body?.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
                            </p>
                            <span className="post-views">Views: {post.views || 0}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}