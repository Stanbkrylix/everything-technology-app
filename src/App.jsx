import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
import "./App.css";

// Color theme
// #145DA0 , #0C2D48 , #2E8BC0 , #B1D4E0

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout Navbar={<Navbar />} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/newPost" element={<NewPost />} />
                    <Route
                        path="*"
                        element={
                            <div>
                                <h1>Not Found</h1>
                            </div>
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
                <p className="home-page">Home</p>
                <p className="new-post-page">Create New Post</p>
            </div>
        </div>
    );
}

export default App;
