import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout Navbar={Navbar} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/newPost" element={<NewPost />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function Navbar() {
    return (
        <div className="navbar">
            <h1 className="logo-name">Everything technology</h1>
            <input type="text" name="search bar" id="" className="search-bar" />
            <div className="home-newPost">
                <p className="home-page">Home</p>
                <p className="new-post-page">Create New Post</p>
            </div>
        </div>
    );
}

export default App;
