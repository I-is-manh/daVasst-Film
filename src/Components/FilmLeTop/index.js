import React, { useEffect, useState } from "react";
import "./FilmLeTop.css"
import { Row, Col, Pagination } from "antd";
import { getFilmLeTopAll } from "../../Helper";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FilterTV from "../FilterTVShow";
function FilmLeTop() {
    const [arrFilm, setArrFilm] = useState(null)
    const [filter, setFilter] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0)
    const data = useQuery({
        queryKey: ["filmletop"],
        queryFn: getFilmLeTopAll,
        staleTime: Infinity,
        cacheTime: Infinity
    })
    const sliceArray = (arr) =>{
        let arrSliced = arr
        arrSliced = arrSliced.slice(currentPage * 20 - 20, currentPage * 20)
        return arrSliced
    }
    useEffect(() => {
        if (data.data) {
            let arrSliced = data.data
            arrSliced = arrSliced.slice(currentPage * 20 - 20, currentPage * 20)
            setArrFilm(arrSliced)
            setTotal(data.data.length)
        }
    }, [data.data, currentPage])
    useEffect(() => {
        if (data.data && filter) {
            let filteredMovies = data.data
            if (filter.primary_release_year !== undefined || filter.with_genres !== undefined || filter.with_origin_country !== undefined) {
                if (filter.primary_release_year !== undefined) {
                    filteredMovies = filteredMovies.filter(movie => movie.release_date.startsWith(filter.primary_release_year))
                }
                if (filter.with_genres !== undefined) {
                    filteredMovies = filteredMovies.filter(movie => movie.genre_ids.includes(filter.with_genres))
                }
                // if (filter.with_origin_country !== undefined) {
                //     filteredMovies = filteredMovies.filter(movie => movie.origin_country.includes(filter.with_origin_country))
                // }
                setTotal(filteredMovies.length)
                setArrFilm(sliceArray(filteredMovies))
            }
            else {
                setArrFilm(sliceArray(data.data))
                setTotal(data.data.length)
            }
        }
    }, [filter, currentPage])
    const onChange = (e) => {
        setCurrentPage(e)
    }
    return (
        <div className="tv-show container-fluid">
            <div className="container">
                <Row justify={"space-between"}>
                    <Col xxl={8} xl={8}>
                        <p className="tv-show__title">
                            Danh sách phim lẻ được đề xuất xem
                        </p>
                    </Col>
                    <Col xxl={16} xl={16}>
                        <FilterTV f={setFilter} />
                    </Col>
                </Row>
                <div className="tv-show__list">
                    {arrFilm && arrFilm.length !== 0 &&
                        <Row>
                            {arrFilm.map((item, index) => {
                                return (
                                    <Col xxl={6} xl={6} md={12} sm={12} xs={24} className="tv-show__item" key={`${item.genre_ids[0]}+${index}`}>
                                        <Link to={`/film_detail/${item.id}/${item.title}`}>
                                            <div className="tv-show-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="tv-show-img"></img>
                                                <p className="tv-show__name">{item.title}</p>
                                            </div>
                                        </Link>
                                    </Col>
                                )
                            })}
                        </Row>
                    }
                </div>
                <div className="pagination">
                    <Row className="pagination__main">
                        <Pagination defaultCurrent={1} onChange={onChange} total={total} pageSize={20} />;
                    </Row>
                </div>
            </div>
        </div>
    );
}
export default FilmLeTop
