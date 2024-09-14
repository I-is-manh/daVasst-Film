import "./Header.css"
import React, { useRef, useState } from "react"
import { Row, Col, Input, Dropdown } from "antd"
import { SearchOutlined, SmileOutlined } from "@ant-design/icons"
import Film_Genre from "../../Film_Genre";
import NavBar from "../NavBar_responsive";
import Genre__Responsive from "../Film_Genre_responsive";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery,QueryClient } from "@tanstack/react-query"
import { getVideoBySearchMovie, getVideoBySearchTVShow } from "../../Helper"
function Header() {
    const [state, setState] = useState(false);
    const [navBar, setNavBar] = useState(false)
    const [searchbox, setSearchBox] = useState(false)
    const [inputValue, setInputValue] = useState("")
    let resultsArr = []
    const ref = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const navi = useNavigate()
    const data1 = useQuery({
        queryKey: ["searchmovie",inputValue],
        queryFn: () => { return getVideoBySearchMovie(inputValue) },
    })
    const data2 = useQuery({
        queryKey: ["searchtvshow",inputValue],
        queryFn: () => { return getVideoBySearchTVShow(inputValue) },
    })
    if (data1.data && data2.data) {
        resultsArr = [...data1.data?.results, ...data2.data?.results];
        resultsArr = resultsArr.slice(0, 9)
    }
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
            console.log("Tôi thích chị HjhNgojhantij ạ thật sự tôi rất muốn mối quan hệ này tiến xa hơn nhưng khả năng điều kiện không cho phép tôi không có xe và tôi cũng nghèo vô dụng nữa nhưng tôi vẫn muốn nói rằng là tôi rất thích chị");
            setSearchBox(false)
            ref3.current.value = ""
            ref3.current.focus();
        }
    }
    const handleClick2 = (e) => {
        navi(`/search_response/${ref3.current.value}`)
    }
    const handleChange2 = (e) => {
        if (e.target.value.length === 0) {
            setSearchBox(false)
        }
        else {
            setSearchBox(true)
        }
        setInputValue(e.target.value)
    }
    const handleClickSearch = () => {
        setSearchBox(false)
        ref3.current.value = ""
        ref3.current.focus();
    }
    return (
        <>
            <Row className="header" onClick={handleClick} justify={"space-between"}>
                <Col xl={8} lg={8} md={8} sm={8} className="header__left">
                    <Link to="/"><img src="data:image/jpeg;base64,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" /></Link>
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
                                <input type="text" onKeyDown={handleChange} className="header__text" placeholder="Nội dung..." ref={ref3} onChange={handleChange2}></input>
                                <SearchOutlined onClick={handleClick2} />
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
            {searchbox === true ? <div className="search-box">
                {data1.data && data2.data && resultsArr?.map((item) => {
                    return (
                        <div className="search__item" key={item.id}>
                            {item.first_air_date ?
                                <Link to={`/tv-show_detail/${item.id}/${item.original_name}`} onClick={handleClickSearch}>
                                    <div className="search-surro">
                                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className="search__img"></img>
                                        <p className="search__name">{item.original_name}</p>
                                    </div>
                                </Link> :
                                <Link to={`/film_detail/${item.id}/${item.original_title}`} onClick={handleClickSearch}>
                                    <div className="search-surro">
                                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className="search__img"></img>
                                        <p className="search__name">{item.original_title}</p>
                                    </div>
                                </Link>
                            }
                            <hr />
                        </div>
                    )
                })}
                <Link to={`/search_response/${inputValue}`} onClick={handleClickSearch}><div className="seach-box__seeall">Xem tất cả</div></Link>
            </div> : null}
        </>
    );
}
export default Header
