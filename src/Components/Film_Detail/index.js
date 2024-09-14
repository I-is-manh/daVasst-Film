import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Detail.css"
import { getCredit, getFilmItem, getVideoLe } from "../../Helper";
import { Breadcrumb, Col, Row, Rate } from "antd";
import { YoutubeOutlined, PlayCircleOutlined, HomeOutlined } from "@ant-design/icons"
import Recommend from "../Home/FILMRECOM/Recommend";
import FilmRelate from "../FilmRelate";
import { useQuery,QueryClient } from "@tanstack/react-query"
function Film_Detail() {
    const { id, Moviename } = useParams()
    const [film, setFilm] = useState(null)
    const [credit, setCredit] = useState([])
    const [render, setRender] = useState(false)
    const [openFilm, setOpenFilm] = useState(false)
    const {data,isLoading,isError,refetch} = useQuery({
        queryKey : ["video",id],
        queryFn : ()=>{return getVideoLe(id)},
    })
    let breadCumdata = [{
        "title": <Link to={"/"}><HomeOutlined /> Home</Link>
    }]
    useEffect(() => {
        const getFilm = async (id) => {
            const data = await getFilmItem(id)
            setFilm(data)
        }
        getFilm(id)
    }, [id])
    useEffect(() => {
        const getThem = async (id) => {
            const data = await getCredit(id)
            if (data.cast.length !== 0) {
                setCredit(data.cast)
            }
            else if (data.crew.length !== 0) {
                setCredit(data.crew)
            }
        }
        getThem(id)
    }, [id])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id])
    if (film) {
        for (let i = 0; i < film.genres.length; i++) {
            const item = {
                "title": <Link to={`/genre_detail?genreID=${film.genres[i].id}&genre_name=${film.genres[i].name}`}>{film.genres[i].name}</Link>,
            }
            breadCumdata.push(item)
        }
        breadCumdata.push({
            "title": film.title
        })
    }
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${year}`;
    };
    const getGenre = () => {
        let strGenre = ""
        for (let i = 0; i < film.genres.length - 1; i++) {
            strGenre += film.genres[i].name + ','
        }
        strGenre += film.genres[film.genres.length - 1].name
        return strGenre
    }
    const getKeyTrailer = () =>{
        if(data?.results === 0) return null
        for(let i = 0;i < data?.results.length ;i++){
            if(data.results[i].type === "Teaser" || data.results[i].type === "Trailer"){
                return data.results[i].key;
            }
        }
        return null
    }
    const getDirector = () => {
        for (let i = 0; i < credit.length; i++) {
            if (credit[i].known_for_department == "Directing" || credit[i].known_for_department == "Production") {
                return credit[i].name
            }
        }
        return null
    }
    const getActing = () => {
        let acting = ""
        if (credit.length == 0) {
            return ""
        }
        for (let i = 0; i < 4; i++) {
            if (credit[i].known_for_department == "Acting") {
                acting += credit[i].name + ','
            }
        }
        acting += credit[credit.length - 1].name
        acting += "..."
        return acting
    }
    const getRuntime = () => {
        let time = Math.floor(film.runtime / 60)
        let min = film.runtime - (time * 60)
        if (time == 0) {
            return `${min} phút`
        }
        else if (min == 0) {
            return `${time} tiếng`
        }
        else {
            return `${time} tiếng ${min} phút`
        }
    }
    return (
        <>
            {film && credit && <div className="filmDetail">
                <Breadcrumb items={breadCumdata} separator=">" className="breadcrumb"></Breadcrumb>
                <div className="filmDetail_surroImg" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})` }} >
                    <Row className="filmDetail__posterandname">
                        <Col xxl={8} xl={8} lg={0} md={0} sm={0} xs={0}>
                            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} className="filmDetail__img"></img>
                        </Col>
                        <Col xxl={16} xl={16} md={24} sm={24} xs={24}>
                            <div className="filmDetail__surroTitle">
                                <p className="filmDetail__name">
                                    {film.title}({formatDate(film.release_date)})
                                </p>
                                <div className="filmDetail__btn">
                                    <Link to={{pathname : "/xemphim",search : `key=${getKeyTrailer()}&name=${film.title}`}}><button className="trailer" onClick={() => { setOpenFilm(true);refetch() }}><YoutubeOutlined /> Trailer</button></Link>
                                    {film.status === "Released" ? <Link to={{pathname : "/xemphim",search : `key=${getKeyTrailer()}&name=${film.title}`}}><button className="play_film" onClick={() => { setOpenFilm(true);refetch() }}><PlayCircleOutlined /> Xem phim</button></Link> : null}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="filmDetail__infomation container">
                    <div className="filmDetail__vote">
                        <Rate defaultValue={film.vote_average} allowClear allowHalf></Rate>
                        <p className="filmDetail__votecnt"> Số lượt bình chọn : {film.vote_count}</p>
                    </div>
                    <Row className="filmDetail__info-detail" gutter={[10, 10]}>
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Trạng thái : {film.status == "Released" ? "Đang phát hành" : "Trailer"}
                        </Col>
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Năm phát hành : {formatDate(film.release_date)}
                        </Col>
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Quốc gia : {film.production_countries[0].name}
                        </Col>
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Thể loại : {getGenre()}
                        </Col>
                        {credit && <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Đạo diễn : {getDirector() !== null ? getDirector() : "Chưa có thông tin của đạo diễn"}
                        </Col>}
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Điểm phổ biến : {film.popularity}
                        </Col>
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Thời lượng : {getRuntime()}
                        </Col>
                        {credit && <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Diễn viên : {getActing() === "" ? "Chưa có thông tin của diễn viên" : getActing()}
                        </Col>}
                    </Row>
                </div>
                <div className="filmDetail__desc container">
                    <h2 className="filmDetail__desc-header">Nội dung phim : </h2>
                    <p className="filmDetail__desc-main">
                        {film.overview}
                    </p>
                </div>
                {/* {openFilm && data ? <div className="filmDetail-video container">
                    <p className="filmDetail-video__title">Video</p>
                    {getKeyTrailer() !== null?<iframe src={`https://www.youtube.com/embed/${getKeyTrailer()}`}  style={{ width: "100%", height: "500px" ,borderRadius : "5px",border : "none"}}></iframe>:<p className="film_detail-nonevideo">Phim này không có video</p>}
                </div> : null} */}
                <div className="filmDetail-relate">
                    <FilmRelate value={id} f={setRender} state={render} f3={refetch}/>
                </div>
            </div>}
        </>
    );
}
export default Film_Detail;