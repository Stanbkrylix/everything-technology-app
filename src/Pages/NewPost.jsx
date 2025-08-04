function NewPost() {
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <div className="new-post-container">
            <h1>Create New Post</h1>

            <form className="new-post-card" onSubmit={handleSubmit}>
                <p className="post-p">New Post</p>
                <input
                    type="text"
                    name=""
                    id=""
                    className="title"
                    placeholder="Title"
                />
                <textarea
                    type="text"
                    placeholder="Content (Optional)"
                    name=""
                    rows={10}
                    cols={50}
                    style={{ resize: "none" }}
                    className="content"
                />
                <input
                    type="text"
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
