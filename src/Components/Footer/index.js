import React from "react";
import { useState,useEffect } from "react";
import { Col,Row } from "antd";
import { Link } from "react-router-dom";
import "./Footer.css"
function Footer() {
    return (  
        <div className="footer container-fluid">
            <Row className="container" justify={"space-between"}>
                <Col className="footer__column" xxl={4} xl={4} lg={0} md={0} sm={0} xs={0}>
                    <img src={`https://phimmoichillv.net/dev/images/logo.png`} className="footer__img" style={{cursor : "pointer"}}></img>
                </Col>
                <Col className="footer__column" xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                    <ul className="footer__list">
                        <li className="footer__item footer__active">Phim mới</li>
                        <Link to={`/tv_show?typeoffilm=phim-le`}><li className="footer__item">Phim lẻ</li></Link>
                        <Link to={`/tv_show?typeoffilm=phim-bo`}><li className="footer__item">Phim bộ</li></Link>
                        <Link to={`/tv_show?typeoffilm=phim-top`}><li className="footer__item">Phim được đánh giá cao</li></Link>
                        <Link to={{pathname:"/genre_detail",search:"genreID=28&genre_name=phim-hanh-dong"}}><li className="footer__item">Phim hành động</li></Link>
                        <Link to={{pathname:"/genre_detail",search:"genreID=27&genre_name=phim-kinh-di"}}><li className="footer__item">Phim kinh dị</li></Link>
                        <Link to={{pathname:"/genre_detail",search:"genreID=10749&genre_name=phim-lang-man"}}><li className="footer__item">Phim lãng mạn</li></Link>
                        <Link to={{pathname:"/genre_detail",search:"genreID=35&genre_name=phim-hai-huoc"}}><li className="footer__item">Phim hài hước</li></Link>
                    </ul>
                </Col>
                <Col className="footer__column" xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                    <ul className="footer__list">
                        <li className="footer__item footer__active">Quốc gia</li>
                        <Link to={`/nation_film?nationID=US`}><li className="footer__item">Phim Mỹ</li></Link>
                        <Link to={`/nation_film?nationID=KR`}><li className="footer__item">Phim Hàn Quốc</li></Link>
                        <Link to={`/nation_film?nationID=CN`}><li className="footer__item">Phim Trung Quốc</li></Link>
                        <Link to={`/nation_film?nationID=TH`}><li className="footer__item">Phim Thái Lan</li></Link>
                        <Link to={`/nation_film?nationID=VN`}><li className="footer__item">Phim Việt Nam</li></Link>
                    </ul>
                </Col>
                <Col className="footer__column" xxl={5} xl={5} lg={5} md={5} sm={5} xs={5}>
                    <p className="footer__active footer__bq">Thông tin bản quyền</p>
                    <p className="footer__info">Tất cả bản quyền thuộc về ông Nguyễn Văn Mạnh-(da Vasst)</p>
                </Col>
            </Row>
        </div>
    );
}
export default Footer
// VN TH