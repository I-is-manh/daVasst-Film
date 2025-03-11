import React, { useEffect, useState } from "react";
import "./search.css"
import { useParams, Link } from "react-router-dom";
import { getSearchFilmBo, getSearchFilmLe } from "../../Helper";
import { Row, Col, Pagination } from "antd"
import { useQuery } from "@tanstack/react-query"
function SearchResponse() {
    const { nameoffilm } = useParams()
    const [arrFilm, setArrFilm] = useState(null)
    const [currentpage, setCurrentpage] = useState(1)
    const [total,setTotal]= useState(0)
    const data1 = useQuery({
        queryKey: ["searchresponse1", nameoffilm],
        queryFn: () => { return getSearchFilmLe(nameoffilm) },
        staleTime: 6000 * 1000,
        cacheTime: 6000 * 1000
    })
    const data2 = useQuery({
        queryKey: ["searchresponse2", nameoffilm],
        queryFn: () => { return getSearchFilmBo(nameoffilm) },
        staleTime: 6000 * 1000,
        cacheTime: 6000 * 1000
    })
    useEffect(() => {
        if (Array.isArray(data1.data?.results) && Array.isArray(data2.data?.results)) {
            let arr = [...data1.data?.results, ...data2.data?.results]
            let tong = data1.data?.total_results + data2.data?.total_results
            setArrFilm(arr)
            setTotal(tong)
        }
    }, [data1.data, data2.data])
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
                                        {item.first_air_date ? <Link to={`/tv-show_detail/${item.id}/${item.original_name}`}>
                                            <div className="searchFilm-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className="searchFilm-img"></img>
                                                <p className="searchFilm-name">{item.original_title ? item.original_title : item.original_name}</p>
                                            </div>
                                        </Link> : <Link to={`/film_detail/${item.id}/${item.original_title}`}>
                                            <div className="searchFilm-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className="searchFilm-img"></img>
                                                <p className="searchFilm-name">{item.original_title ? item.original_title : item.original_name}</p>
                                            </div>
                                        </Link> }
                                    </Col>
                                )
                            })}
                        </Row>
                        : <p className="">Không tìm thấy phim như vậy</p>}
                </Row>
                <div className="pagination">
                    <Row className="pagination__main">
                        <Pagination defaultCurrent={1} total={total}   pageSize={40} />;
                    </Row>
                </div>
            </div>
        </div>
    );
}
export default SearchResponse;
