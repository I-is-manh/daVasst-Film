import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams, useLocation } from "react-router-dom";
import "./FilmGenreDetail.css"
import { getFilmGenreDetail } from "../../Helper"
import { Col, Row, Pagination } from "antd";
import SearchBar from "../SearchBar";
function FilmGenreDetail() {
    const [arrFilm, setArrFilm] = useState(null)
    const [searchParam, setSearchParams] = useSearchParams();
    const id = searchParam.get("genreID") || ""
    let type = searchParam.get("genre_name") || ""
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        const getGenreDetail = async () => {
            const data = await getFilmGenreDetail(id, currentPage);
            setArrFilm(data.results)
        }
        getGenreDetail()
    }, [id,currentPage])
    useEffect(()=>{
        window.scrollTo({top : 0,behavior:"smooth"})
    },[id,currentPage])
    const handleChange = (e) => {
        setCurrentPage(e)
    }
    const handleGenre = () => {
        if (type == "phim-hanh-dong") {
            type = " phim hành động"
        }
        else if (type == "phim-lang-man") {
            type = "phim lãng mạn"
        }
        else if (type == "phim-kinh-di") {
            type = "phim kinh dị"
        }
        else if (type == "phim-hai-huoc") {
            type = "phim hài hước"
        }
    }
    handleGenre()
    return (
        <div className="genreDetail container-fluid">
            <div className="container">
                <Row justify={"space-between"}>
                    <Col xxl={8} xl={8}>
                        <p className="tv-show__title">
                            Danh sách {type}
                        </p>
                    </Col>
                    <Col xxl={16} xl={16}>
                        <SearchBar />
                    </Col>
                </Row>
            </div>
            <div className="container genreDetail_list">
                <Row className="genreDetail-row">
                    {arrFilm && arrFilm.length !== 0 &&
                        arrFilm.map((item) => {
                            return (
                                <Col className="genreDetail-item" xxl={6} xl={6} md={12} sm={12} xs={24} key={item.id}>
                                    <Link to={`/film_detail/${item.id}/${item.original_title}`}>
                                        <div className="genreDetail-surro">
                                            <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="genreDetail-img"></img>
                                            <p className="genreDetail-name">{item.original_title}</p>
                                        </div>
                                    </Link>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
            <div className="pagination">
                <Row className="pagination__main">
                    <Pagination defaultCurrent={1} onChange={handleChange} total={10000} pageSize={20} />;
                </Row>
            </div>
        </div>
    );
}
export default FilmGenreDetail;