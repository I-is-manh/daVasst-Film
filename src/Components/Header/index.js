import "./Header.css"
import React, { useRef, useState,useEffect } from "react"
import { Row, Col, Input, Dropdown } from "antd"
import { SearchOutlined, SmileOutlined } from "@ant-design/icons"
import Film_Genre from "../../Film_Genre";
import NavBar from "../NavBar_responsive";
import Genre__Responsive from "../Film_Genre_responsive";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery,QueryClient } from "@tanstack/react-query"
import { getVideoBySearchMovie, getVideoBySearchTVShow } from "../../Helper"
import logo from "../../img/logodavasst.webp"
function Header() {
    const [state, setState] = useState(false);
    const [navBar, setNavBar] = useState(false)
    const [searchbox, setSearchBox] = useState(false)
    const [inputValue, setInputValue] = useState("")
    let resultsArr = []
    const refFilmGenre = useRef(null)
    const refNavBar = useRef(null)
    const refInput = useRef(null)
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
        console.log(e.target);
        if (e.target === refFilmGenre.current) {
            setState(!state)
        }
        else {
            setState(false)
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (refFilmGenre.current && !refFilmGenre.current.contains(event.target)) {
            setState(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refFilmGenre]);
    const handleBar = (e) => {
        setNavBar(!navBar)
    }
    const handleChange = (e) => {
        if (e.key == "Enter") {
            navi(`/search_response/${e.target.value}`)
            setSearchBox(false)
            refInput.current.value = ""
            refInput.current.focus();
        }
    }
    const handleClick2 = (e) => {
        navi(`/search_response/${refInput.current.value}`)
    }
    const handleChangeInput = (e) => {
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
        refInput.current.value = ""
        refInput.current.focus();
    }
    return (
        <>
            <Row className="header" onClick={handleClick} justify={"space-between"}>
                <Col xl={8} lg={8} md={8} sm={8} className="header__left">
                    <Link to="/"><img className="header__logo" src={logo} /></Link>
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
                                <p className="header__content" onClick={handleClick} ref={refFilmGenre}>Film Genre</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="header__search">
                                <input type="text" onKeyDown={handleChange} className="header__text" placeholder="Nội dung..." ref={refInput} onChange={handleChangeInput}></input>
                                <SearchOutlined onClick={handleClick2} />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} md={3} sm={3} onClick={handleBar} className={navBar ? "nav_click nav-bar" : "nav-bar"} ref={refNavBar} >
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
