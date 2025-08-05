import { useState } from "react";
import { useParams } from "react-router-dom";

function PostDetail({ getData, updateLikes, addComments, deletePost }) {
    const { id } = useParams();
    const data = getData();
    const [comment, setComment] = useState("");

    if (data.length === 0) return;
    const dataToUse = data.find((item) => item.id === id);

    const currentDate = Date.now();
    const duration = currentDate - dataToUse.date;
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

    console.log(dataToUse);

    function handleChange(e) {
        setComment(e.target.value);
    }

    return (
        <div className="post-detail">
            <h1>Post Detail</h1>
            <div className="post-detail-card">
                <p className="duration-since-posted">{getTime()}</p>
                <h2 className="post-detail-title">{dataToUse.title}</h2>
                <p className="post-detail-content">{dataToUse.content}</p>
                <img
                    src={dataToUse.imageUrl}
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
                        <button className="edit-btn">Edit</button>
                        <button className="edit-btn" onClick={() => ""}>
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
    );
}

export default PostDetail;
