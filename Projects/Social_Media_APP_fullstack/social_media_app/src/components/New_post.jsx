import React from 'react'
import './new_post.css'
const New_post = ({handleSubmit , Cancel}) => {
    const handleSub= async(e)=>{
        await handleSubmit(e);
    }
  return (
    <>
      <div className="new-posts">
          <form onSubmit={handleSub}>
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
            <div className="form_buttons"><button onClick={()=>{Cancel()}} className="cancel_new_post"><i className="bi bi-x-circle-fill"></i>
            </button><button type="submit" className="post">Post</button></div>
          </form>
        </div>
    </>
  )
}

export default New_post
