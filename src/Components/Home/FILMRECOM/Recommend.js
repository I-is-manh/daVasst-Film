import React from "react";
import "./Filmrecom.css"
import { useState, useEffect } from "react";
import { Row, Col } from "antd"
import { getFilm } from "../../../Helper";
import { Scrollbar } from 'react-scrollbars-custom';
import { Link } from "react-router-dom"
function Recommend() {
    const [nowPlaying, setNowPlaying] = useState([]);
    useEffect(() => {
        const getList = async () => {
            const data = await getFilm();
            setNowPlaying(data.results);
        }
        getList()
    }, [])
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    return (
        <div className="recommend container-fluid">
            <div className="container">
                <div className="recommend__title">
                    Phim đề cử
                </div>
                <div className="recommend_list">
                    <Row className="recommend__content" justify={"space-around"} wrap={false} gutter={[, 10]}>
                        {nowPlaying.map((item) => {
                            return (
                                <Col xl={5} lg={10} md={10} sm={12} xs={12} className="recommend__item" key={item.id}>
                                    <Link to={`/film_detail/${item.id}/${item.original_title}`}>
                                        <div className="recommend_card">
                                            <img src={` https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="recommend__img"></img>
                                            <div className="recommend_desc">
                                                <p className="recommend_name">
                                                    {item.original_title}
                                                </p>
                                                <p className="recommend_date">
                                                    {formatDate(item.release_date)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        </div>
    );
}
export default Recommend;