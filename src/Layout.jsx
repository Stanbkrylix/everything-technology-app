import { Outlet } from "react-router-dom";

function Layout({ Navbar }) {
    return (
        <div className="main-container">
            <div className="navbar-container">{Navbar}</div>
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
