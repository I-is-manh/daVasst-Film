import React, { useEffect, useState } from "react";
import "./TVShowSimilar.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { Link, useParams } from "react-router-dom";
import { getTVShowSimilar } from "../../Helper"
function TVShowSimilar(prop) {
    const [arrFilm, setArrFilm] = useState(null)
    useEffect(() => {
        const getSimilar = async () => {
            const data = await getTVShowSimilar(prop.value)
            setArrFilm(data.results)
        }
        getSimilar()
    }, [])
    return (
        <div className="tv-show__similar">
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
                {arrFilm && arrFilm.length !== 0 &&
                    arrFilm.map((item) => {
                        return (
                            <SwiperSlide style={{ height: "170px" }} key={item.id}>
                                <Link to={`/tv-show_detail/${item.id}/${item.original_name}`}>
                                    <div className="tv-show-surro">
                                        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} className="tv-show__similar-img"></img>
                                        <p className="tv-show__similar-name">{item.original_name}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div >
    );
}

export default TVShowSimilar;