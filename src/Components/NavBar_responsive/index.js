import { useRef, useState } from "react";
import "./NavBar.css"
import { DownOutlined } from "@ant-design/icons"
import Genre__Responsive from "../Film_Genre_responsive";
import Film_Genre from "../../Film_Genre";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query";
import { getVideoBySearchMovie, getVideoBySearchTVShow } from "../../Helper";
function NavBar(prop) {
    const [state, setState] = useState(false);
    const [state2, setState2] = useState(false)
    const [openSearch, setOpenSearch] = useState(false);
    const [searchbox, setSearchBox] = useState(false)
    const [inputValue,setInputValue] = useState(null)
    const ref = useRef(null)
    const navi = useNavigate()
    let resultsArr = []
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
    const handleClick = () => {
        setState(!state)
    }
    const handleSearch = () => {
        setState2(!state2)
        setOpenSearch(!openSearch)
    }
    const handleChange = (e) => {
        if (e.target.value.length === 0) {
            setSearchBox(false)
        }
        else {
            setSearchBox(true)
        }
        setInputValue(e.target.value)
    }
    const handleChange2 = (e) => {
        if (e.key == "Enter") {
            navi(`/search_response/${e.target.value}`)
            setSearchBox(false)
            ref.current.value = ""
            ref.current.focus();
        }
    }
    const handleClickSearch = () => {
        setSearchBox(false)
        ref.current.value = ""
        ref.current.focus();
        prop.f(false)
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
                        <input type="text" className="header__text_res" placeholder="Nội dung..." onChange={handleChange} ref={ref} onKeyDown={handleChange2}></input>
                        <SearchOutlined className="icon_search" />
                    </div>
                </div> : null}
            </ul>
            {searchbox ? <div className="search_resp">
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
            </div> : 
            null}
        </div>
    );
}
export default NavBar;