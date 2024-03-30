import React from "react";
import { useState, useEffect } from "react";
import image from "../assets/user-pic.jpg";
import "./main.css";

const Post = ({ post }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const handleLike = () => {
    if (like == false) {
      setLike(true);
      if (dislike == true) {
        setDislike(false);
        setLikes(likes + 2);
      } else {
        setLikes(likes + 1);
      }
    } else {
      setLike(false);
      setLikes(likes - 1);
    }
  };
  const handleDisLike = async () => {
    if (dislike == false) {
      setDislike(true);
      if (like == true) {
        setLike(false);
        setLikes(likes - 2);
      } else {
        setLikes(likes - 1);
      }
    } else {
      setDislike(false);
      setLikes(likes + 1);
    }
  };
  return (
    <li className="Posts">
      <div className="post-user">
        <img className="user-img" src={image} />
        <div className="user-name">
          <p>{post.username}</p>
          <div className="posted-time">
            {post.date ? post.date.toString() : ""}
          </div>
        </div>
      </div>
      <div className="post-title">
        <p>{post.post_title}</p>
      </div>
      <p className="post-text">{post.post_text}</p>
      <form className="post-footer">
        <div className="like" onClick={handleLike}>
          {like ? (
            <i className="bi bi-hand-thumbs-up-fill"></i>
          ) : (
            <i className="bi bi-hand-thumbs-up"></i>
          )}
        </div>
        <div className="likes">
          <i className="bi bi-heart-fill"></i>
          {likes}
        </div>
        <div className="dislike" onClick={handleDisLike}>
          {dislike ? (
            <i className="bi bi-hand-thumbs-down-fill"></i>
          ) : (
            <i className="bi bi-hand-thumbs-down"></i>
          )}
        </div>
        <div className="comments">
          <i className="bi bi-chat-left-text-fill"></i>23
        </div>
        <div className="delete">
          <i className="bi bi-trash"></i>
        </div>
      </form>
    </li>
  );
};

export default Post;
