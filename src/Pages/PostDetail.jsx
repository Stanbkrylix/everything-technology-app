import { useParams } from "react-router-dom";

function PostDetail({ getData, updateLikes }) {
    const { id } = useParams();
    const data = getData();

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
                <button
                    className="post-details-likes"
                    onClick={() => updateLikes(dataToUse)}
                >
                    👍{dataToUse.likes} likes
                </button>
            </div>
        </div>
    );
}

export default PostDetail;
