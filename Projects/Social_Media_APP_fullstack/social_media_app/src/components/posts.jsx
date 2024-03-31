import React from "react";
import { useState, useEffect } from "react";
import image from "../assets/user-pic.jpg";
import "./main.css";
import Axios from "axios";
import Main from "./main";
// import { useHistory } from 'react-router-dom';

const Post = ({ post, fetchPost }) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  // const history = useHistory();
  const handleDelete = async()=>{
    await Axios.delete("http://localhost:3000/posts/"+post.id);
    await fetchPost();
  }
  const handleLike = async () => {
    let updatedLikes = likes;
    if (like == false) {
      setLike(true);
      if (dislike == true) {
        setDislike(false);
        updatedLikes += 2;
        setLikes(likes=>likes + 2);
      } else {
        updatedLikes +=1;
        setLikes(likes=>likes + 1);
      }
    } else {
      setLike(false);
      updatedLikes-=1;
      setLikes(likes - 1);
    }
    const result = await Axios.put(`http://localhost:3000/posts/${post.id}`,{likes: updatedLikes});
    console.log(result);
  };
  const handleDisLike = async () => {
    let updatedLikes = likes;
    if (dislike == false) {
      setDislike(true);
      if (like == true) {
        setLike(false);
        updatedLikes-=2;
        setLikes(likes - 2);
      } else {
        updatedLikes-=1;
        setLikes(likes - 1);
      }
    } else {
      setDislike(false);
      updatedLikes+=1;
      setLikes(likes + 1);
    }
    const result = await Axios.put(`http://localhost:3000/posts/${post.id}`,{likes: updatedLikes});
    console.log(result);
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
        <div className="delete" onClick={handleDelete}>
          <i className="bi bi-trash"></i>
        </div>
      </form>
    </li>
  );
};

export default Post;
