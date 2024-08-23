import React, { useEffect, useState } from "react";
import "./search.css"
import { useParams, Link } from "react-router-dom";
import { getSearchFilmBo, getSearchFilmLe } from "../../Helper";
import { Row, Col, Pagination } from "antd"
function SearchResponse() {
    const { nameoffilm } = useParams()
    const [arrFilm, setArrFilm] = useState(null)
    useEffect(() => {
        const getFilm = async () => {
            const data = await getSearchFilmLe(nameoffilm)
            const data2 = await getSearchFilmBo(nameoffilm)
            setArrFilm([...data.results,...data2.results])
        }
        getFilm()
    }, [nameoffilm])
    return (
        <div className="searchFilm container-fluid">
            <div className="container">
                <p className="searchFilm-keyword">Từ khóa {nameoffilm}</p>
                <Row>
                    {arrFilm ?
                        <Row>
                            {arrFilm.map((item) => {
                                return (
                                    <Col xxl={6} xl={6} md={12} sm={12} xs={24} key={item.id} className="searchFilm-item">
                                        <div className="searchFilm-surro">
                                            <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="searchFilm-img"></img>
                                            <p className="searchFilm-name">{item.original_title ? item.original_title : item.original_name}</p>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                        : <p className="">Không tìm thấy phim như vậy</p>}
                </Row>
            </div>
        </div>
    );
}
export default SearchResponse;