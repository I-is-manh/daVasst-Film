import "./Header.css"
import React, { useRef, useState } from "react"
import { Row, Col, Input, Dropdown } from "antd"
import { SearchOutlined, SmileOutlined } from "@ant-design/icons"
import Film_Genre from "../../Film_Genre";
import NavBar from "../NavBar_responsive";
import Genre__Responsive from "../Film_Genre_responsive";
import { Link, NavLink, useNavigate } from "react-router-dom";
function Header() {
    const [state, setState] = useState(false);
    const [navBar, setNavBar] = useState(false)
    const ref = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const navi = useNavigate();
    const handleClick = (e) => {
        if (e.target === ref.current) {
            setState(!state)
        }
        else {
            setState(false)
        }
    }
    const handleBar = (e) => {
        setNavBar(!navBar)
    }
    const handleChange = (e) => {
        if (e.key == "Enter") {
            navi(`/search_response/${e.target.value}`)
            console.log("Tôi thích chị Ngô Thị Hạnh ạ thật sự tôi rất muốn mối quan hệ này tiến xa hơn nhưng khả năng điều kiện không cho phép tôi không có xe và tôi cũng nghèo vô dụng nữa nhưng tôi vẫn muốn nói rằng là tôi rất thích chị");
        }
    }
    const handleClick2 = (e) =>{
        navi(`/search_response/${ref3.current.value}`)
    }
    return (
        <>
            <Row className="header" onClick={handleClick} justify={"space-between"}>
                <Col xl={8} lg={8} md={8} sm={8} className="header__left">
                    <Link to="/"><img src="https://phimmoichillv.net/dev/images/logo.png" /></Link>
                </Col>
                <Col xl={16} lg={16} className="header__right">
                    <Row justify={"space-between"} className="header__right-main">
                        <Col xl={10} lg={10}>
                            <div className="header__mid">
                                <NavLink className="header__content" to="/">Home</NavLink>
                                <NavLink className="header__content" to={{
                                    pathname: "/tv_show",
                                    search: "typeoffilm=phim-bo",
                                    state: { fromDashboard: true }
                                }}>TV Show</NavLink>
                                <p className="header__content" onClick={handleClick} ref={ref}>Film Genre</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="header__search">
                                <input type="text" onKeyDown={handleChange} className="header__text" placeholder="Nội dung..." ref={ref3}></input>
                                <SearchOutlined onClick={handleClick2}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} md={3} sm={3} onClick={handleBar} className={navBar ? "nav_click nav-bar" : "nav-bar"} ref={ref2} >
                    <span className="bar_stick"></span>
                    <span className="bar_stick"></span>
                    <span className="bar_stick"></span>
                </Col>
            </Row>
            {state ? <Film_Genre /> : null}
            <NavBar prop={navBar} f={setNavBar}></NavBar>
        </>
    );
}
export default Header
