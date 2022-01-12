import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { request } from "../utils";
import { modalActions } from "../store/actions";
import { useRouter } from "next/router";

const defaultBlog = {
  title: "",
  introduction: "",
  body: "",
  conclusion: "",
};

const BlogForm = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = props.user;
  const blog = props.blog || defaultBlog;

  const [title, setTitle] = useState(blog.title);
  const [introduction, setIntroduction] = useState(blog.introduction);
  const [author, setAuthor] = useState(user.user_id);
  const [body, setBody] = useState(blog.body);
  const [conclusion, setConclusion] = useState(blog.conclusion);

  useEffect(() => {
    if (user.user_id) {
      setAuthor(user.user_id);
    }
    if (blog.blog_code) {
      setTitle(blog.blog_title);
      setIntroduction(blog.blog_introduction);
      setBody(blog.blog_body);
      setConclusion(blog.blog_conclusion);
    }
  }, [user, blog]);

  const createBlogHandler = async () => {
    const response = await request("/api/blog", "POST", {
      title: title,
      introduction: introduction,
      body: body,
      conclusion: conclusion,
      author: author,
    });

    if (response.status === 201) {
      dispatch(
        modalActions.setModal(true, {
          header: "blog created",
          body: `Your blog "${response.blog.blog_title}" was created successfully`,
          error: false,
        })
      );
      setTitle("");
      setIntroduction("");
      setBody("");
      setConclusion("");
    } else {
      dispatch(
        modalActions.setModal(true, {
          header: "creation of blog failed",
          body: "Your blog could not be created",
          error: true,
        })
      );
    }
  };

  const updateBlogHandler = async () => {
    const response = await request(
      `/api/blog/blog_code/${blog.blog_code}`,
      "PUT",
      {
        title: title,
        introduction: introduction,
        body: body,
        conclusion: conclusion,
      }
    );

    if (response.status === 200) {
      dispatch(
        modalActions.setModal(true, {
          header: "blog updated",
          body: `Your blog "${response.blog_title}" was updated successfully`,
          error: false,
        })
      );
      setTimeout(() => {
        router.replace("my-blogs");
      }, 200);
    } else {
      dispatch(
        modalActions.setModal(true, {
          header: "update of blog failed",
          body: "Your blog could not be updated",
          error: true,
        })
      );
    }
  };

  const deleteBlogHandler = () => {
    const deleteBlog = async () => {
      const response = await request(
        `/api/blog/blog_code/${blog.blog_code}`,
        "DELETE"
      );

      if (response.status === 200) {
        dispatch(
          modalActions.setModal(true, {
            header: "blog deleted",
            body: `Your blog "${blog.blog_code}" was deleted successfully`,
            error: false,
          })
        );
        setTimeout(() => {
          router.replace("my-blogs");
        }, 200);
      } else {
        dispatch(
          modalActions.setModal(true, {
            header: "deleting your blog failed",
            body: "Your blog could not be deleted",
            error: true,
          })
        );
      }
    };

    dispatch(
      modalActions.setModal(true, {
        header: "delete blog",
        body: `Are you sure you want to delete this blog '${title}'?`,
        error: false,
        action: async () => {
          await deleteBlog();
        },
      })
    );
  };

  const previewHandler = () => {
    router.push("/blog/" + blog.blog_code);
  };

  return (
    <div className="form">
      <div className="form__container">
        <h2 className="title">new blog</h2>
        <div className="form__item">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>

        <div className="form__item">
          <label htmlFor="introduction">Introduction</label>
          <textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Introduction"
          />
        </div>

        <div className="form__item">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
          />
        </div>

        <div className="form__item">
          <label htmlFor="conclusion">Conclusion</label>
          <textarea
            id="conclusion"
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            placeholder="Conclusion"
          />
        </div>

        {blog.blog_code ? (
          <div className="flex">
            <button className="btn__active mauto" onClick={previewHandler}>
              Preview
            </button>
            <button className="btn__active mauto" onClick={updateBlogHandler}>
              Update
            </button>
            <button className="btn__active mauto" onClick={deleteBlogHandler}>
              Delete
            </button>
          </div>
        ) : (
          <button className="btn__active mauto" onClick={createBlogHandler}>
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogForm;
