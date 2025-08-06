import { useState } from "react";

function NewPost({ dataArray, addDataTo }) {
    const [data, setData] = useState({
        title: "",
        content: "",
        image_url: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        const dateOfCreation = Date.now();

        if (!data.title || !data.image_url) {
            alert("Please fill out all Fields");
            return;
        }

        const newData = {
            ...data,
            id: crypto.randomUUID(),
            date_created: dateOfCreation,
            likes: 0,
            comments: [],
        };

        addDataTo(newData);
        setData({ title: "", content: "", image_url: "" });
    }

    function handleOnChange(e) {
        const { name, value } = e.target;

        setData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="new-post-container">
            <h1>Create New Post</h1>

            <form className="new-post-card" onSubmit={handleSubmit}>
                <p className="post-p">New Post</p>
                <input
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleOnChange}
                    id=""
                    className="title"
                    placeholder="Title"
                />
                <textarea
                    type="text"
                    placeholder="Content (Optional)"
                    name="content"
                    value={data.content}
                    onChange={handleOnChange}
                    rows={10}
                    cols={50}
                    style={{ resize: "none" }}
                    className="content"
                />
                <input
                    type="text"
                    name="image_url"
                    value={data.image_url}
                    onChange={handleOnChange}
                    placeholder="image url"
                    className="image-url"
                />
                <input
                    type="submit"
                    name=""
                    value="Create Post"
                    id=""
                    className="create-post-btn"
                />
            </form>
        </div>
    );
}

export default NewPost;
