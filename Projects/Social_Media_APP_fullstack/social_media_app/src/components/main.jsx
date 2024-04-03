import { useEffect, useState } from "react";
import "./main.css";
import Post from "./posts";
import Axios from "axios";
import New_post from "./New_post";
import Friends from "./friends";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const[toPost,setToPost] = useState(false);
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
    await Axios.post("http://localhost:3000/posts/new", body);
    setToPost(false);
    await fetchPost();
  };
  return (
    <>
      <div className="container">
        <Friends></Friends>
        <div className="main-posts cards">
          <ul>
            {toPost?<New_post handleSubmit={handlSubmit} Cancel={()=>{setToPost(false)}}></New_post>:<button onClick={()=>{setToPost(true)}} className="toPost">Make a new Post</button>}
            {posts.map((post) => {
              return <Post post={post} key={post.id} fetchPost={fetchPost}></Post>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Main;
