import Post from "../models/Post.js";

// =========================
// Create Post
// =========================
export const createPost = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { community, user, content } = req.body;

    const post = await Post.create({
      community,
      user,
      content,
    });

    const populatedPost = await Post.findById(post._id)
      .populate("user", "userName email role");

    res.status(201).json(populatedPost);

  }catch (error) {
  console.error("Create Post Error:", error);

  res.status(500).json({
    message: error.message,
    error,
  });
}
}

// =========================
// Get Posts of Community
// =========================
export const getCommunityPosts = async (req, res) => {

  try {

    const { communityId } = req.params;

    const posts = await Post.find({
      community: communityId,
    })
      .populate("user", "userName email role")
      .populate("comments.user", "userName")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(posts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Unable to fetch posts",
    });

  }

};

// =========================
// Like / Unlike Post
// =========================
export const likePost = async (req, res) => {

  try {

    const { id } = req.params;

    const { userId } = req.body;

    const post = await Post.findById(id);

    if (!post) {

      return res.status(404).json({
        message: "Post not found",
      });

    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {

      post.likes.pull(userId);

    } else {

      post.likes.push(userId);

    }

    await post.save();

    res.status(200).json(post);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Unable to like post",
    });

  }

};

// =========================
// Comment on Post
// =========================
export const commentPost = async (req, res) => {

  try {

    const { id } = req.params;

    const { userId, text } = req.body;

    const post = await Post.findById(id);

    if (!post) {

      return res.status(404).json({
        message: "Post not found",
      });

    }

    post.comments.push({
      user: userId,
      text,
    });

    await post.save();

    const updatedPost = await Post.findById(id)
      .populate("user", "userName")
      .populate("comments.user", "userName");

    res.status(200).json(updatedPost);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Unable to comment",
    });

  }

};

// =========================
// Delete Post
// =========================
export const deletePost = async (req, res) => {

  try {

    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {

      return res.status(404).json({
        message: "Post not found",
      });

    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      message: "Post deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Unable to delete post",
    });

  }

};