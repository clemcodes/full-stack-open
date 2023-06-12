import { useState } from "react";
import blogService from "../services/blogs.js";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    overflowWrap: "break-word",
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const handleLikes = () => {
    const updatedBlog = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    };
    blogService.update(blog.id, updatedBlog);
  };

  const handleRemove = () => {
    if (window.confirm("Remov blog You're NOT gonna need it!")) {
      blogService.remove(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <div data-testid="invisible" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
