import api from "./api";

// ==========================
// Get Posts by Community
// ==========================
export const getCommunityPosts = async (communityId) => {
  const response = await api.get(`/posts/community/${communityId}`);
  return response.data;
};

// ==========================
// Create Post
// ==========================
export const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};

// ==========================
// Like / Unlike Post
// ==========================
export const likePost = async (postId, userId) => {
  const response = await api.put(`/posts/${postId}/like`, {
    userId,
  });

  return response.data;
};

// ==========================
// Comment on Post
// ==========================
export const commentPost = async (
  postId,
  userId,
  text
) => {
  const response = await api.post(
    `/posts/${postId}/comment`,
    {
      userId,
      text,
    }
  );

  return response.data;
};

// ==========================
// Delete Post
// ==========================
export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};