import { useState } from "react";
import { Link } from "react-router-dom";

function Home({ getData, searchText }) {
    const data = getData();
    const [sortBy, setSortBy] = useState("newest");

    // filter by search
    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortBy === "newest") {
            return b.date_created - a.date_created; // Newest first
        } else if (sortBy === "popular") {
            return b.likes - a.likes; // Most likes first
        } else {
            return 0;
        }
    });

    return (
        <div className="home-container">
            <div className="filter-btns">
                <p>Filter by: </p>
                <button
                    className={`newest-btn ${
                        sortBy === "newest" ? "active" : ""
                    }`}
                    onClick={() => setSortBy("newest")}
                >
                    Newest
                </button>
                <button
                    className={`popular-btn ${
                        sortBy === "popular" ? "active" : ""
                    }`}
                    onClick={() => setSortBy("popular")}
                >
                    Most Popular
                </button>
            </div>
            <div className="post-section">
                {sortedData.map((item) => (
                    <Post key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

function Post({ item }) {
    const currentDate = Date.now();
    const duration = currentDate - item.date_created;

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

    return (
        <Link to={`/post/${item.id}`} className="post-link">
            <div className="post">
                <p className="time-posted">Posted {getTime()}</p>
                <h2 className="post-question"> {item.title}</h2>
                <p className="number-of-likes">{item.likes} likes</p>
            </div>
        </Link>
    );
}

export default Home;
