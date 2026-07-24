import "./PostCard.css";

function PostCard({
  post,
  currentUser,
  onLike,
  onDelete,
}) {

  const initial = post.user?.userName
    ? post.user.userName.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="post-card">

      <div className="post-header">

        <div className="post-user">

          <div className="post-avatar">
            {initial}
          </div>

          <div className="post-user-info">

            <h3>{post.user?.userName}</h3>

            <small>
              {new Date(post.createdAt).toLocaleString()}
            </small>

          </div>

        </div>

        {currentUser?._id === post.user?._id && (

          <button
            className="delete-btn"
            onClick={() => onDelete(post._id)}
          >
            🗑 Delete
          </button>

        )}

      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">

        <button
          className="like-btn"
          onClick={() => onLike(post._id)}
        >
          ❤️ {post.likes.length}
        </button>

        <button className="comment-btn">
          💬 {post.comments.length}
        </button>

        <button className="share-btn">
          📤 Share
        </button>

      </div>

    </div>
  );
}

export default PostCard;