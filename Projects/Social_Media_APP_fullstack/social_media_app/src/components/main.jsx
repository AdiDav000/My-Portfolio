import React, { useEffect, useState } from "react";
import "./main.css";
import Post from "./posts";
import Axios from "axios";

const Main = () => {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const fetchPost = async () => {
    const res = await Axios.get("http://localhost:3000/posts");
    setPosts([...res.data]);
    console.log(res.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  //   console.log(posts);
  const handlSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: e.target.elements["post-title"].value,
      content: e.target.elements["post-content"].value,
      user_id: 1,
      likes: 0,
    };
    const result = await Axios.post("http://localhost:3000/posts/new", body);
    await fetchPost();
  };
  return (
    <>
      <div className="container">
        <div className="a cards"></div>
        <div className="main-posts cards">
          <ul>
            {posts.map((post) => {
              // console.log(posts);
              return <Post post={post} key={post.id} fetchPost={fetchPost}></Post>;
            })}
          </ul>
        </div>
        <div className="new-posts cards">
          <form onSubmit={handlSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="input"
              name="post-title"
            />
            <textarea
              placeholder="Content"
              rows="5"
              name="post-content"
            ></textarea>
            <button type="submit" className="post">
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Main;
