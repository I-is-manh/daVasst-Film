import React, { useEffect, useState } from "react"
import "./Detail-TVShow.css"
import { Link, useParams } from "react-router-dom"
import { getCreditTvshow, getDetailTVshow, getVideoBo } from "../../Helper";
import { Col, Row, Rate } from "antd";
import { YoutubeOutlined, PlayCircleOutlined, HomeOutlined } from "@ant-design/icons"
import { Breadcrumb } from "antd"
import TVShowRelate from "../TV-showRelate";
import TVShowSimilar from "../TV-ShowSimilar";
import { useQuery } from "@tanstack/react-query";
function FilmDetailTVShow() {
    const { id, Moviename } = useParams()
    const [render, setRender] = useState(false)
    const [credit, setCredit] = useState(null)
    const data = useQuery({
        queryKey: ["videoBo", id],
        queryFn: () => { return getVideoBo(id) },
        staleTime: 6000 * 1000,
        cacheTime: 6000 * 1000
    })
    const film = useQuery({
        queryKey: ["filmDetail", id],
        queryFn: () => { return getDetailTVshow(id) },
        staleTime: 6000 * 1000,
        cacheTime: 6000 * 1000
    })
    // const credit = useQuery({
    //     queryKey: ["credit",id],
    //     queryFn: () => { return getCreditTvshow(id) },
    //     staleTime : 6000 * 1000,
    //     cacheTime : 6000 * 1000
    // })
    const breadcrumbData = [
        {
            "title": <Link to={"/"}><HomeOutlined />Home</Link>,
        }
    ]
    useEffect(() => {
        const getCredit = async () => {
            const data = await getCreditTvshow(id)
            if (data.cast.length !== 0) {
                setCredit(data.cast)
            }
            else if (data.crew.length !== 0) {
                setCredit(data.crew)
            }
        }
        getCredit()
    }, [id])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [id])
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${year}`;
    };
    const getGenre = () => {
        if (film.data?.genres.length === 0) return
        let strGenre = ""
        for (let i = 0; i < film.data?.genres.length - 1; i++) {
            strGenre += film.data?.genres[i].name + ','
        }
        strGenre += film.data?.genres[film.data?.genres.length - 1].name
        return strGenre
    }
    const getRuntime = () => {
        let time = Math.floor(film.data?.last_episode_to_air.runtime / 60)
        let min = film.data?.last_episode_to_air.runtime - (time * 60)
        if (time === 0) {
            return `${min} phút`
        }
        else if (min === 0) {
            return `${time} tiếng`
        }
        else {
            return `${time} tiếng ${min} phút`
        }
    }
    const getActing = () => {
        if (credit.length === 0) {
            return ""
        }
        else {
            let acting = ""
            if (credit.length > 4) {
                for (let i = 0; i < 4; i++) {
                    if (credit[i].known_for_department === "Acting") {
                        acting += credit[i].name + ','
                    }
                }
                acting += credit[credit.length - 1].name
                acting += "..."
                return acting
            }
            else {
                for (let i = 0; i < credit.length - 1; i++) {
                    if (credit[i].known_for_department === "Acting") {
                        acting += credit[i].name + ','
                    }
                }
                acting += credit[credit.length - 1].name
                acting += "..."
                return acting
            }
        }
    }
    const getDirector = () => {
        if (credit) {
            if (credit.length === 0) return
            for (let i = 0; i < credit.length; i++) {
                if (credit[i].known_for_department === "Directing" || credit[i].known_for_department === "Production") {
                    return credit[i].name
                }
            }
            return null
        }
    }
    if (film.data) {
        for (let i = 0; i < film.data?.genres.length; i++) {
            let item = {
                "title": <Link to={`/genre_detail/${film.data?.genres[i].id}`}>{film.data?.genres[i].name}</Link>,
            }
            breadcrumbData.push(item)
        }
        breadcrumbData.push({
            "title": Moviename
        })
    }
    const getKeyTrailer = () => {
        if (data.data?.results.length === 0) {
            return null
        }
        else {
            return data.data?.results[0].key
        }
    }
    return (
        <>
            {film.data && <div className="tv-show_Detail">
                <Breadcrumb items={breadcrumbData} separator=">" className="breadcrumb"></Breadcrumb>
                <div className="tv-show_Detail-poster" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${film.data?.poster_path})` }}>
                    <Row className="tv-showDetail__posterandname">
                        <Col xxl={8} xl={8} lg={0} md={0} sm={0} xs={0}>
                            <img src={`https://image.tmdb.org/t/p/original${film.data?.backdrop_path}`} className="tv-showDetail__img"></img>
                        </Col>
                        <Col xxl={16} xl={16} md={24} sm={24} xs={24}>
                            <div className="tv-showDetail__surroTitle">
                                <p className="tv-showDetail__name">
                                    {film.data?.original_name}({formatDate(film.data?.first_air_date)})
                                </p>
                                <div className="tv-showDetail__btn">
                                    <Link to={{ pathname: "/xemphim", search: `key=${getKeyTrailer()}&name=${film.data?.name}` }}><button className="trailer"><YoutubeOutlined /> Trailer</button></Link>
                                    <Link to={{ pathname: "/xemphim", search: `key=${getKeyTrailer()}&name=${film.data?.name}` }}><button className="play_film"><PlayCircleOutlined /> Xem phim</button></Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="filmDetail__infomation container">
                    <div className="filmDetail__vote">
                        <Rate allowHalf defaultValue={film.data?.vote_average} ></Rate>
                        <p className="filmDetail__votecnt"> Số lượt bình chọn : {film.data?.vote_count}</p>
                    </div>
                    <Row className="filmDetail__info-detail" gutter={[10, 10]}>
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Năm phát hành : {formatDate(film.data?.last_air_date)}
                        </Col>
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Quốc gia : {film.data.production_countries[0] ? film.data?.production_countries[0].name : "Chưa có thông tin về quốc gia"}
                        </Col>
                        <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Thể loại : {getGenre()}
                        </Col>
                        {credit?.length !== 0 && <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Đạo diễn : {getDirector() !== null ? getDirector() : "Chưa có thông tin của đạo diễn"}
                        </Col>}
                        {/* <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Mùa : {film.data?.last_episode_to_air.name}
                        </Col> */}
                        {/* <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Thời lượng mỗi tập : {getRuntime()}
                        </Col> */}
                        {credit && <Col className="filmDetail__item" xxl={8} xl={8} md={24} sm={24} xs={24}>
                            Diễn viên : {getActing() !== "" ? getActing() : "Chưa có thông tin của diễn viên"}
                        </Col>}
                    </Row>
                </div>
                <div className="filmDetail__desc container">
                    <h2 className="filmDetail__desc-header">Nội dung phim : </h2>
                    <p className="filmDetail__desc-main">
                        {film.data.overview ? film.data?.overview : "Không có nội dung do nhà cung cấp API không làm"}
                    </p>
                </div>
                <div className="tv-show__episode container">
                    <p className="tv-show__episode-title">Danh sách các mùa của phim</p>
                    <TVShowRelate value={film.data} />
                </div>
                <div className="tv-show__similar container">
                    <p className="tv-show__similar-title">Danh sách các phim tương tự</p>
                    <TVShowSimilar value={id} state={render} f={setRender} />
                </div>
            </div>}
        </>
    );
}
export default FilmDetailTVShow;