import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
import PostDetail from "./Pages/PostDetail";
import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

// Color theme
// #145DA0 , #0C2D48 , #2E8BC0 , #B1D4E0

function App() {
    const [dataArray, setDataArray] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("date_created", { ascending: false });

            if (error) {
                console.error("Fetch error:", error);
            } else {
                setDataArray(data);
            }
        }

        fetchData();
    }, []);

    function getData() {
        return dataArray;
    }

    async function addDataTo(newData) {
        const { data, error } = await supabase.from("posts").insert([newData]);

        if (error) {
            console.error("Insert error:", error);
        } else {
            // Optionally, fetch again or add manually
            setDataArray((prev) => [...prev, newData]);
        }
    }

    async function updateLikes(post) {
        const updatedLikes = post.likes + 1;

        const { error } = await supabase
            .from("posts")
            .update({ likes: updatedLikes })
            .eq("id", post.id);

        if (!error) {
            setDataArray((prev) =>
                prev.map((item) =>
                    item.id === post.id
                        ? { ...item, likes: updatedLikes }
                        : item
                )
            );
        } else {
            console.error("Like update error:", error);
        }
    }

    function addComments(comment, data) {
        // if (!comment) return;

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
        setDataArray((prev) => prev.filter((item) => item.id !== data.id));
    }

    function updatePost(id, updateValues) {
        console.log(id, updateValues);
        setDataArray((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, ...updateValues } : item
            )
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <Layout
                            Navbar={
                                <Navbar
                                    dataArray={dataArray}
                                    setDataArray={setDataArray}
                                    setSearchText={setSearchText}
                                />
                            }
                        />
                    }
                >
                    <Route
                        path="/"
                        element={
                            <Home getData={getData} searchText={searchText} />
                        }
                    />

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
                                deletePost={deletePost}
                                updatePost={updatePost}
                            />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function Navbar({ dataArray, setDataArray, setSearchText }) {
    function handleChange(e) {
        setSearchText(e.target.value);
    }

    return (
        <div className="navbar">
            <h2 className="logo-name">Every⚙Technology</h2>

            <input
                placeholder="Search"
                type="text"
                name="search-bar"
                onChange={handleChange}
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
