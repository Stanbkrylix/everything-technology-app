function Home() {
    return (
        <div className="home-container">
            <div className="filter-btns">
                <p>Filter by: </p>
                <button className="newest-btn">Newest</button>
                <button className="popular-btn">Most Popular</button>
            </div>
            <div className="post-section">
                <Post />
                <Post />
            </div>
        </div>
    );
}

function Post() {
    return (
        <div className="post">
            <p className="time-posted">Posted 10 hours ago</p>
            <h2 className="post-question"> When was the computer invented</h2>
            <p className="number-of-likes">10 likes</p>
        </div>
    );
}

export default Home;
