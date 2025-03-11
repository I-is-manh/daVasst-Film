import React, { useEffect, useState } from "react";
import { Row, Col, Pagination } from "antd";
import { getUpComingLe } from "../../Helper";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
function ListUpComing() {
    const [arrFilm, setArrFilm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const handleChange = (e) => {
        setCurrentPage(e)
    }
    const getFilmUpComingLe = async (currentPage) => {
        const data = await getUpComingLe(currentPage);
        return data
    }
    const {data} = useQuery({
        queryKey : ["upcomingLe",currentPage],
        queryFn : ()=>{return getFilmUpComingLe(currentPage)},
        staleTime : 600 * 1000,
        cacheTime : 600 * 1000
    })
    useEffect(()=>{
        setArrFilm(data?.results)
    },[data])
    return (
        <div className="tv-show container-fluid">
            <div className="container">
                <Row justify={"space-between"}>
                    <Col xxl={8} xl={8}>
                        <p className="tv-show__title">
                            Các phim sắp chiếu trên Da Vasst_Film
                        </p>
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
export default ListUpComing
