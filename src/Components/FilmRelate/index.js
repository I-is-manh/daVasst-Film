import React from "react"
import { useState, useEffect } from "react"
import { Row, Col } from "antd"
import "./FilmRelate.css"
import { getRelate } from "../../Helper"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { Link, useNavigate } from "react-router-dom"
import { QueryClient } from "@tanstack/react-query"
function FilmRelate(prop) {
    const [arrFilm, setArrFilm] = useState(null)
    const navi = useNavigate();
    useEffect(() => {
        const getFilm = async () => {
            const data = await getRelate(prop.value)
            setArrFilm(data.results)
        }
        getFilm(prop.value)
    }, [])
    const handleClick = () =>{
        prop.f(!prop.state)
        prop.f3()
    }
    return (
        <div className="filmrelate container-fluid">
            <div className="container">
                <div className="filmrelate__title">
                    Danh sách phim liên quan
                </div>
                <div className="filmrelate_list">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        navigation
                        autoplay={true}
                        breakpoints={{
                            1600: {
                                slidesPerView: 5,
                                spaceBetween: 20
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 20
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 20
                            },
                            576: {
                                slidesPerView: 3,
                                spaceBetween: 20
                            },
                            310: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            }
                        }}
                    >
                        {arrFilm &&
                            arrFilm.map((item) => {
                                return (
                                    <SwiperSlide style={{ height: "150px" }} key={item.id}>
                                        <Link to={`/film_detail/${item.id}/${item.original_title}`} onClick={handleClick}>
                                            <div className="filmrelate-surro" >
                                                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="Ảnh film bị lỗi" className="filmrelate__img"></img>
                                                <p className="filmrelate__name">{item.title}</p>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default FilmRelate;