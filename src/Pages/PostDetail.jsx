import { useState } from "react";
import { useParams } from "react-router-dom";

function PostDetail({
    getData,
    updateLikes,
    addComments,
    deletePost,
    updatePost,
}) {
    const { id } = useParams();
    const data = getData();
    const [comment, setComment] = useState("");
    const [editMode, setEditMode] = useState(false);

    if (data.length === 0) return;
    const dataToUse = data.find((item) => item.id === id);

    if (!dataToUse)
        return (
            <div>
                <h2>Post have been deleted</h2>
            </div>
        );

    const currentDate = Date.now();
    const duration = currentDate - dataToUse.date_created;
    function getTime() {
        const seconds = Math.floor(duration / 1000);
        const minutes = Math.floor(duration / (1000 * 60));
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));

        if (seconds < 60) return "Just now";
        if (minutes < 60)
            return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    function cancelUpdate() {
        setEditMode(!editMode);
    }

    console.log(dataToUse);

    function handleChange(e) {
        setComment(e.target.value);
    }

    function changeEditMode() {
        setEditMode(!editMode);
    }

    return !editMode ? (
        <div className="post-detail">
            <h1>Post Detail</h1>
            <div className="post-detail-card">
                <p className="duration-since-posted">{getTime()}</p>
                <h2 className="post-detail-title">{dataToUse.title}</h2>
                <p className="post-detail-content">{dataToUse.content}</p>
                <img
                    src={dataToUse.image_url}
                    alt=""
                    className="post-detail-image-url"
                />
                <div className="like-update-edit-div">
                    <button
                        className="post-details-likes-btn"
                        onClick={() => updateLikes(dataToUse)}
                    >
                        👍 {dataToUse.likes} likes
                    </button>

                    <div className="edit-update">
                        <button
                            className="edit-btn"
                            onClick={() => setEditMode(!editMode)}
                        >
                            Edit
                        </button>
                        <button
                            className="edit-btn"
                            onClick={() => deletePost(dataToUse)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="comment-sections">
                    <div className="comments">
                        {dataToUse?.comments.length !== 0
                            ? dataToUse.comments.map((item) => (
                                  <p key={item.id}> - {item}</p>
                              ))
                            : ""}
                    </div>
                    <div className="comment-input-div">
                        <input
                            type="text"
                            value={comment}
                            onChange={handleChange}
                            placeholder="Leave a comment"
                            className="comment-input"
                        />
                        <button
                            className="comment-btn"
                            onClick={() => {
                                if (!comment) return;
                                addComments(comment, dataToUse);
                                setComment("");
                            }}
                        >
                            Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <UpdateCard
            dataToUse={dataToUse}
            cancelUpdate={cancelUpdate}
            updatePost={updatePost}
            changeEditMode={changeEditMode}
        />
    );
}

function UpdateCard({ dataToUse, cancelUpdate, updatePost, changeEditMode }) {
    const [updateValue, setUpdateValue] = useState({
        title: dataToUse.title,
        content: dataToUse.content,
        image_url: dataToUse.image_url,
    });

    function handleSubmit(e) {
        e.preventDefault();
        updatePost(dataToUse.id, updateValue);
        changeEditMode();
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setUpdateValue((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <div className="new-post-container">
            <h1>Update Post</h1>

            <form className="new-post-card" onSubmit={handleSubmit}>
                <p className="post-p">Post to update</p>
                <input
                    type="text"
                    name="title"
                    value={updateValue.title}
                    onChange={handleChange}
                    id=""
                    className="title"
                    placeholder="Title"
                />
                <textarea
                    type="text"
                    placeholder="Content (Optional)"
                    name="content"
                    value={updateValue.content}
                    onChange={handleChange}
                    rows={10}
                    cols={50}
                    style={{ resize: "none" }}
                    className="content"
                />
                <input
                    type="text"
                    name="image_url"
                    value={updateValue.image_url}
                    onChange={handleChange}
                    placeholder="image url"
                    className="image-url"
                />
                <div className="updated-btns">
                    <input
                        type="submit"
                        name=""
                        value="Update Post"
                        id=""
                        className="update-post-btn"
                    />

                    <button className="cancel-btn" onClick={cancelUpdate}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostDetail;
