import React from "react"
import "./TV-ShowRelate.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
function TVShowRelate(prop) {
    const getImg = (src) =>{
        if(src == null){
            return prop.value.poster_path;
        }
        else{
            return src;
        }
    }
    return (
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
            {prop.value.seasons &&
                prop.value.seasons.map((item) => {
                    return (
                        <SwiperSlide style={{ height: "170px" }} key={item.id}>
                                <div className="filmrelate-surro" >
                                    <img src={`https://image.tmdb.org/t/p/original${getImg(item.poster_path)}`} alt="Ảnh film bị lỗi" className="filmrelate__img"></img>
                                    <p className="filmrelate__name">Mùa : {item.season_number}</p>
                                </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
}

export default TVShowRelate;