import React, { useEffect, useState } from "react"
import "./FilmTop.css"
import { Row, Col } from "antd"
import { getFilmBo, getFilmBoTop, getFilmLeTop } from "../../../Helper";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
function FilmTop() {
    const [arrFilm, setArrFilm] = useState(null);
    const [state, setState] = useState('Le')
    let filmExist = []
    const getFilm = async () => {
        const data = await getFilmLeTop(1);
        return data.results
    }
    const getFilmBo1 = async () => {
        const data = await getFilmBoTop(1);
        return data.results
    }
    const checkTypePhimLe = () =>{
        if(state === "Le") return true
        else return false
    }
    const checkTypePhimBo = () => {
        if(state === "Bo") return true 
        else return false
    }
    const data1 = useQuery({
        queryKey: ["upcomingLe",state],
        queryFn: getFilm,
        staleTime : Infinity,
        cacheTime : Infinity,
        enabled : checkTypePhimLe
    })
    const data2 = useQuery({
        queryKey : ["upcomingBo",state],
        queryFn : getFilmBo1,
        staleTime : Infinity,
        cacheTime : Infinity,
        enabled : checkTypePhimBo
    })
    useEffect(()=>{
        if(state === "Le" && data1.data){
            setArrFilm(data1.data)
        }
        else if(state === "Bo" && data2.data){
            setArrFilm(data2.data)
        }
    },[data1.data,data2.data])
    const handleClick = (genre) => {
        if (state == 'Le') {
            if (genre == 'Le') {
                return
            }
            else setState('Bo')
        }
        else {
            if (genre == 'Bo') {
                return
            }
            else setState('Le')
        }
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
        <>
            <div className="filmtop container-fluid">
                <div className="container">
                    <div className="filmtop__header">
                        <p className="filmtop__title">Phim được đánh giá cao</p>
                        <Row className="filmtop__genre">
                            <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={28} onClick={() => { handleClick('Le') }}>Phim lẻ</Col>
                            <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={16} onClick={() => { handleClick('Bo') }}>Phim bộ</Col>
                        </Row>
                        <Link className="filmtop__seeAll" to={ state === "Bo" ? "/filmbotop" : "/filmletop" }>Xem tất cả</Link>
                    </div>
                    {arrFilm && arrFilm.length !== 0 &&
                        <Row className="filmtop__container">
                            <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24} className="filmtop__left">
                                {state == "Bo" ? <Link to={`/tv-show_detail/${arrFilm[0].id}/${arrFilm[0].original_name}`}>
                                    <div className="filmtop__bigimg">
                                        <img src={`https://image.tmdb.org/t/p/original${arrFilm[0].backdrop_path}`} className="filmtop__img"></img>
                                        <p className="filmtop__name big">{arrFilm[0].original_name ? arrFilm[0].original_name : arrFilm[0].original_title}</p>
                                    </div>
                                </Link> : <Link to={`/film_detail/${arrFilm[0].id}/${arrFilm[0].original_title}`}>
                                    <div className="filmtop__bigimg">
                                        <img src={`https://image.tmdb.org/t/p/original${arrFilm[0].backdrop_path}`} className="filmtop__img"></img>
                                        <p className="filmtop__name big">{arrFilm[0].original_name ? arrFilm[0].original_name : arrFilm[0].original_title}</p>
                                    </div>
                                </Link>}
                                <Row gutter={[7]}>
                                    {arrFilm[1] &&
                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} className="filmtop__under" >
                                            {state == "Bo" ? <Link to={`/tv-show_detail/${arrFilm[1].id}/${arrFilm[1].original_name}`}>
                                                <div className="filmtop__bigimg">
                                                    <img src={`https://image.tmdb.org/t/p/original${arrFilm[1].backdrop_path}`} className="filmtop__img"></img>
                                                    <p className="filmtop__name big">{arrFilm[1].original_name ? arrFilm[1].original_name : arrFilm[1].original_title}</p>
                                                </div>
                                            </Link> : <Link to={`/film_detail/${arrFilm[1].id}/${arrFilm[1].original_title}`}>
                                                <div className="filmtop__bigimg">
                                                    <img src={`https://image.tmdb.org/t/p/original${arrFilm[1].backdrop_path}`} className="filmtop__img"></img>
                                                    <p className="filmtop__name big">{arrFilm[1].original_name ? arrFilm[1].original_name : arrFilm[1].original_title}</p>
                                                </div>
                                            </Link>}
                                        </Col>
                                    }
                                    {arrFilm[2] &&
                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} className="filmtop__under">
                                            {state == "Bo" ? <Link to={`/tv-show_detail/${arrFilm[2].id}/${arrFilm[2].original_name}`}>
                                                <div className="filmtop__bigimg">
                                                    <img src={`https://image.tmdb.org/t/p/original${arrFilm[2].backdrop_path}`} className="filmtop__img"></img>
                                                    <p className="filmtop__name big">{arrFilm[2].original_name ? arrFilm[2].original_name : arrFilm[2].original_title}</p>
                                                </div>
                                            </Link> : <Link to={`/film_detail/${arrFilm[2].id}/${arrFilm[2].original_title}`}>
                                                <div className="filmtop__bigimg">
                                                    <img src={`https://image.tmdb.org/t/p/original${arrFilm[2].backdrop_path}`} className="filmtop__img"></img>
                                                    <p className="filmtop__name big">{arrFilm[2].original_name ? arrFilm[2].original_name : arrFilm[2].original_title}</p>
                                                </div>
                                            </Link>}
                                        </Col>
                                    }
                                </Row>
                            </Col>
                            <Col xxl={14} xl={14} lg={24} md={24} sm={24} xs={24}>
                                <Row className="filmtop__list" gutter={[10, 15]}>
                                    {arrFilm && arrFilm.map((item, index) => {
                                        if (filmExist.includes(item.id) == false && index < 12) {
                                            filmExist.push(item.id)
                                            return (
                                                <Col xxl={8} xl={8} lg={12} md={12} sm={12} xs={12} className="filmtop__item" key={item.id}>
                                                    {state == "Bo" ? <Link to={`/tv-show_detail/${item.id}/${item.original_name}`}>
                                                        <div className="filmtop__item-surro">
                                                            <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="filmtop__img"></img>
                                                            <p className="filmtop__item-name">{item.original_title ? item.original_title : item.original_name}</p>
                                                        </div></Link> : <Link to={`/film_detail/${item.id}/${item.original_title}`}>
                                                        <div className="filmtop__item-surro">
                                                            <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="filmtop__img"></img>
                                                            <p className="filmtop__item-name">{item.original_title ? item.original_title : item.original_name}</p>
                                                        </div>
                                                    </Link>}
                                                </Col>
                                            )
                                        }
                                        else {
                                            return null
                                        }
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    }
                </div>

            </div>
        </>
    );
}
export default FilmTop
