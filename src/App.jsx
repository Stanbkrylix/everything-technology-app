import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
import PostDetail from "./Pages/PostDetail";
import "./App.css";
import { useState } from "react";

// Color theme
// #145DA0 , #0C2D48 , #2E8BC0 , #B1D4E0

function App() {
    const [dataArray, setDataArray] = useState([]);

    function addDataTo(newData) {
        setDataArray((prev) => [...prev, newData]);
    }

    function getData() {
        return dataArray;
    }

    function updateLikes(data) {
        setDataArray((prev) =>
            prev.map((item) =>
                item.id === data.id ? { ...item, likes: data.likes + 1 } : item
            )
        );
    }

    function addComments(comment, data) {
        setDataArray((prev) =>
            prev.map((item) =>
                item.id === data.id
                    ? { ...item, comments: [...(item.comments || []), comment] }
                    : item
            )
        );
    }

    function deletePost(data) {
        console.log(data);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <Layout
                            Navbar={
                                <Navbar
                                    data={dataArray}
                                    setData={setDataArray}
                                />
                            }
                        />
                    }
                >
                    <Route path="/" element={<Home getData={getData} />} />

                    <Route
                        path="/newPost"
                        element={
                            <NewPost data={dataArray} addDataTo={addDataTo} />
                        }
                    />

                    <Route
                        path="*"
                        element={
                            <div>
                                <h1>Not Found</h1>
                            </div>
                        }
                    />

                    <Route
                        path="/post/:id"
                        element={
                            <PostDetail
                                getData={getData}
                                updateLikes={updateLikes}
                                addComments={addComments}
                            />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function Navbar() {
    return (
        <div className="navbar">
            <h2 className="logo-name">Every⚙Technology</h2>

            <input
                placeholder="Search"
                type="text"
                name="search bar"
                id=""
                className="search-bar"
            />

            <div className="home-newPost">
                <Link to={"/"}>
                    <p className="home-page">Home</p>
                </Link>

                <Link to={"/newPost"}>
                    <p className="new-post-page">Create New Post</p>
                </Link>
            </div>
        </div>
    );
}

export default App;
