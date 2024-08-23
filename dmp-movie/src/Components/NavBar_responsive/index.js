import { useState } from "react";
import "./NavBar.css"
import { DownOutlined } from "@ant-design/icons"
import Genre__Responsive from "../Film_Genre_responsive";
import Film_Genre from "../../Film_Genre";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons"
function NavBar(prop) {
    const [state, setState] = useState(false);
    const [state2, setState2] = useState(false)
    const [openSearch, setOpenSearch] = useState(false);
    const handleClick = () => {
        setState(!state)
    }
    const handleSearch = () => {
        setState2(!state2)
        setOpenSearch(!openSearch)
    }
    return (
        <div className={prop.prop ? "navbar" : "navbar__active"}>
            <ul className="navbar__list">
                <Link to={"/"} className="navbar__li navbar__item"><li className="navbar__li navbar__item" style={{ color: "gold" }}>Home</li></Link>
                <Link to={"/tv_show"} className="navbar__li navbar__item" style={{ fontSize: "20px" }}><li className="navbar__li navbar__item">TV Show</li></Link>
                <li className="navbar__li" onClick={handleClick}>
                    <span className="nav_title">Film Genre</span><DownOutlined className={state ? "reverse" : "normal"} />
                    {state ? <Genre__Responsive f={prop.f}></Genre__Responsive> : null}
                </li>
                <li className="navbar__li" onClick={handleSearch}>
                    <span className="nav_title">Search</span>
                    <DownOutlined className={state2 ? "reverse" : "normal"} />
                </li>
                {openSearch ? <div className="header__search_res">
                    <div className="header__search-surro">
                        <input type="text" className="header__text_res" placeholder="Nội dung..."></input>
                        <SearchOutlined className="icon_search" />
                    </div>
                </div> : null}
            </ul>
        </div>
    );
}
export default NavBar;