import { useEffect, useState } from "react";
import "./CommunityFeed.css";

import {
  createPost,
  getCommunityPosts,
  likePost,
  deletePost,
} from "../../api/postapi";

import { useAuth } from "../../context/AuthContext";
import PostCard from "./PostCard";

function CommunityFeed({ communityId }) {

  const { user } = useAuth();
  console.log("Auth User:", user);

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    loadPosts();
  }, [communityId]);

  const loadPosts = async () => {

    try {

      const data = await getCommunityPosts(communityId);

      setPosts(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleCreatePost = async () => {

    if (!content.trim()) {

      alert("Enter some content.");

      return;

    }

    try {

      await createPost({

        community: communityId,

        user: user._id,

        content,

      });

      setContent("");

      loadPosts();

    } catch (error) {

      console.log(error);

    }

  };

  const handleLike = async (postId) => {

    try {

      await likePost(postId, user._id);

      loadPosts();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (postId) => {

    if (!window.confirm("Delete this post?")) {

      return;

    }

    try {

      await deletePost(postId);

      loadPosts();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="community-feed">

      <div className="create-post">

        <textarea

          placeholder="Share something with your community..."

          value={content}

          onChange={(e) => setContent(e.target.value)}

        />

        <button onClick={handleCreatePost}>

          Post

        </button>

      </div>

      <div className="posts">

        {posts.length === 0 ? (

          <div className="no-posts">

            <h2>No Posts Yet</h2>

            <p>Be the first one to share something.</p>

          </div>

        ) : (

          posts.map((post) => (

            <PostCard

              key={post._id}

              post={post}

              currentUser={user}

              onLike={handleLike}

              onDelete={handleDelete}

            />

          ))

        )}

      </div>

    </div>

  );

}

export default CommunityFeed;