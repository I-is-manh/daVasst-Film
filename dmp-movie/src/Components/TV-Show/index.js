import React, { useEffect, useState } from "react";
import "./FilmBo.css"
import { Row, Col, Pagination } from "antd";
import { getFilmBo, getFilmBoTop, getFilmLe, getFilmTop, getUpComing,getFilmLeTop } from "../../Helper";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import SearchBar from "../SearchBar";
import { Link, useSearchParams } from "react-router-dom";
function Film_Bo() {
    const [searchParam, setSearchParam] = useSearchParams();
    const getType = searchParam.get("typeoffilm") || ""
    const [arrFilm, setArrFilm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [infoSearch, setInfoSearch] = useState({
        "theloai": null,
        "quocgia": null,
        "release": null
    })
    let TypeFilm;
    const handleChange = (e) => {
        setCurrentPage(e)
    }
    const getFilmUpComing = async () => {
        const data = await getUpComing(currentPage);
        setArrFilm(data.results)
    }
    const getFilmDeCu = async (currentPage) => {
        const data = await getFilmLeTop(currentPage);
        const data2 = await getFilmBoTop(currentPage)
        setArrFilm([...data.results,...data2.results])
    }
    const getTVShow = async (currentPage) => {
        const data = await getFilmBo(currentPage)
        setArrFilm(data.results)
    }
    const getFilmLE = async (currentPage) => {
        const data = await getFilmLe(currentPage);
        setArrFilm(data.results)
    }
    const checkTypeofFilm = () => {
        if (getType == "phim-le") {
            TypeFilm = "phim lẻ"
        }
        else if (getType == "phim-bo") {
            TypeFilm = "phim bộ"
        }
        else if (getType == "phim-top") {
            TypeFilm = "phim được đánh giá cao"
        }
        else if (getType == "phim-upcoming") {
            TypeFilm = "phim sắp ra mắt"
        }
    }
    checkTypeofFilm();
    useEffect(() => {
        if (getType == "phim-bo") {
            getTVShow(currentPage)
        }
        else if (getType == "phim-le") {
            getFilmLE(currentPage)
        }
        else if (getType == "phim-top") {
            getFilmDeCu(currentPage)
        }
        else if (getType == "phim-upcoming") {
            getFilmUpComing(currentPage)
        }
    }, [currentPage, infoSearch])
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
                        <SearchBar f={setInfoSearch} />
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
                                        </Link> }
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
