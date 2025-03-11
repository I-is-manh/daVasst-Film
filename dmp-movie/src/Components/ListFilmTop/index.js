import React, { useEffect, useState } from "react";
import "./FilmBo.css"
import { Row, Col, Pagination } from "antd";
import { getFilmBo, getFilmBoTop, getFilmLe, getFilmTop, getFilmLeTop } from "../../Helper";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import SearchBar from "../SearchBar";
import { Link, useSearchParams } from "react-router-dom";
import FilterBox from "../FilterBox";
import FilterTV from "../FilterTVShow";
function Film_Bo() {
    const [searchParam, setSearchParam] = useSearchParams();
    const getType = searchParam.get("typeoffilm") || ""
    const [arrFilm, setArrFilm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState(null)
    let TypeFilm;
    const handleChange = (e) => {
        setCurrentPage(e)
    }
    const getFilmDeCu = async (currentPage, filter) => {
        const data = await getFilmLeTop(currentPage, filter);
        setArrFilm([...data?.results])
    }
    const getTVShow = async (currentPage, filter) => {
        const data = await getFilmBo(currentPage, filter)
        setArrFilm(data?.results)
    }
    const getFilmLE = async (currentPage, filter) => {
        const data = await getFilmLe(currentPage, filter);
        setArrFilm(data?.results)
    }
    const checkTypeofFilm = () => {
        if (getType == "phim-le") {
            TypeFilm = "phim lẻ"
        }
        else if (getType == "phim-bo") {
            TypeFilm = "phim bộ"
        }
    }
    checkTypeofFilm();
    useEffect(() => {
        if (getType == "phim-bo") {
            getTVShow(currentPage, filter)
        }
        else if (getType == "phim-le") {
            getFilmLE(currentPage, filter)
        }
    }, [currentPage, filter])
    return (
        <div className="tv-show container-fluid">
            <div className="container">
                <Row justify={"space-between"}>
                    <Col xxl={8} xl={8}>
                        <p className="tv-show__title">
                            Danh sách {TypeFilm}
                        </p>
                    </Col>
                    <Col xxl={16} xl={16}>
                        {TypeFilm === "phim lẻ" ? <SearchBar f={setFilter} /> : <FilterTV/> }
                    </Col>
                </Row>
                <div className="tv-show__list">
                    {arrFilm && arrFilm.length !== 0 &&
                        <Row>
                            {arrFilm.map((item, index) => {
                                return (
                                    <Col xxl={6} xl={6} md={12} sm={12} xs={24} className="tv-show__item" key={`${item.genre_ids[0]}+${index}`}>
                                        {item.first_air_date ? <Link to={`/tv-show_detail/${item.id}/${item.original_name}`}>
                                            <div className="tv-show-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="tv-show-img"></img>
                                                <p className="tv-show__name">{item.original_title ? item.original_title : item.original_name}</p>
                                            </div>
                                        </Link> : <Link to={`/film_detail/${item.id}/${item.original_name}`}>
                                            <div className="tv-show-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="tv-show-img"></img>
                                                <p className="tv-show__name">{item.original_title ? item.original_title : item.original_name}</p>
                                            </div>
                                        </Link>}
                                    </Col>
                                )
                            })}
                        </Row>
                    }
                </div>
                <div className="pagination">
                    <Row className="pagination__main">
                        <Pagination defaultCurrent={1} onChange={handleChange} total={10000} pageSize={20} />;
                    </Row>
                </div>
            </div>
        </div>
    );
}
export default Film_Bo
