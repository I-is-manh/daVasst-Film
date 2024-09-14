import React, { useEffect, useState } from "react";
import "./FilmBo.css"
import { Row, Col } from "antd"
import { getFilmBo } from "../../../Helper";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
function FilmBo() {
    const [arrFilm, setArrFilm] = useState(null);
    let filmExist = [];
    const getfilmbo = async () => {
        const data = await getFilmBo(1,null);
        const data2 = await getFilmBo(2,null);
        const data3 = await getFilmBo(3,null);
        const data4 = await getFilmBo(4,null);
        const data5 = await getFilmBo(5,null);
        let a = data.results;
        a = [...a, ...data2.results]
        a = [...a, ...data3.results]
        a = [...a, ...data4.results]
        a = [...a, ...data5.results]
        return a
    }
    const { data } = useQuery({
        queryKey : ["filmbo"],
        queryFn : getfilmbo,
        staleTime : Infinity,
        cacheTime : Infinity
    })
    useEffect(()=>{
        setArrFilm(data)
    },[data])
    const handleClick = (id) => {
        let newArr = data.filter((item) => {
            if (item.genre_ids.includes(id)) {
                return item;
            }
        });
        setArrFilm(newArr);
    }
    if (arrFilm) {
        if (arrFilm[0]) {
            filmExist.push(arrFilm[0].id);
        }
        if (arrFilm[1]) {
            filmExist.push(arrFilm[1].id);
        }
        if (arrFilm[2]) {
            filmExist.push(arrFilm[2].id);
        }
    }
    return (
        <div className="filmbo container-fluid">
            <div className="container">
                <div className="filmbo__header">
                    <p className="filmbo__title">Phim bộ mới cập nhật</p>
                    <Row className="filmbo__genre">
                        <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={28} onClick={() => { handleClick(10768) }}>Hành động</Col>
                        <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={16} onClick={() => { handleClick(16) }}>Hoạt hình</Col>
                        <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={27} onClick={() => { handleClick(10751) }}>Gia đình</Col>
                        <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={35} onClick={() => { handleClick(35) }}>Hài hước</Col>
                    </Row>
                    <Link className="filmbo__seeall filmbo__genre__child" to={{
                        pathname: "/tv_show",
                        search: "typeoffilm=phim-bo",
                        state: { fromDashboard: true }
                    }}>Xem tất cả</Link>
                </div>
                {arrFilm && arrFilm.length !== 0 &&
                    <Row className="filmbo__container">
                        <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24} className="filmbo__left">
                            <Link to={`/tv-show_detail/${arrFilm[0].id}/${arrFilm[0].original_name}`}>
                                <div className="filmbo__BIGimg">
                                    <div className="filmbo__item-surro">
                                        <img src={`https://image.tmdb.org/t/p/original${arrFilm[0].backdrop_path}`} className="filmbo__img"></img>
                                        <p className="filmbo__name">{arrFilm[0].original_name}</p>
                                    </div>
                                </div>
                            </Link>
                            <Row gutter={[5]} style={{height : "32%"}}>
                                {arrFilm[1] && <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} style={{ borderRadius: "5px",height:"100%" }}>
                                    <Link to={`/tv-show_detail/${arrFilm[1].id}/${arrFilm[1].original_name}`}>
                                        <div className="filmbo__under-left">
                                            <div className="filmbo__item-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${arrFilm[1].backdrop_path}`} className="filmbo__img-small"></img>
                                                <p className="filmbo__name">{arrFilm[1].original_name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>}
                                {arrFilm[2] && <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} style={{ borderRadius: "5px",height:"100%" }}>
                                    <Link to={`/tv-show_detail/${arrFilm[2].id}/${arrFilm[2].original_name}`}>
                                        <div className="filmbo__under-left">
                                            <div className="filmbo__item-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${arrFilm[2].backdrop_path}`} className="filmbo__img-small"></img>
                                                <p className="filmbo__name">{arrFilm[2].original_name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>}
                            </Row>
                        </Col>
                        <Col xxl={14} xl={14} lg={24} md={24} sm={24} xs={24}>
                            <Row className="filmbo__list">
                                {arrFilm && arrFilm.map((item, index) => {
                                    if (filmExist.includes(item.id) == false && index < 12) {
                                        filmExist.push(item.id)
                                        return (
                                            <Col xxl={8} xl={8} lg={12} md={12} sm={12} xs={12} className="filmbo__item-list" key={item.id}>
                                                <Link to={`/tv-show_detail/${item.id}/${item.original_name}`}>
                                                    <div className="filmbo__item-surro">
                                                        <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="filmbo__img"></img>
                                                        <p className="filmbo__name-list">{item.original_title ? item.original_title : item.original_name}</p>
                                                    </div>
                                                </Link>
                                            </Col>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                })}
                            </Row>
                        </Col>
                    </Row>}
            </div>
        </div>
    );
}
export default FilmBo;