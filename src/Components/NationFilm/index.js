import React, { useEffect, useState } from "react";
import { Row, Col, Pagination } from "antd"
import { Link, useSearchParams } from "react-router-dom";
import "./NationFilm.css"
import { getFilmBo } from "../../Helper";
function NationFilm() {
    const [searchParam, setSearchParam] = useSearchParams();
    const nationID = searchParam.get("nationID") || ""
    const [arrFilm, setArrFilm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const handleChange = (e) => {
        setCurrentPage(e)
    }
    useEffect(() => {
        const getFilm = async () => {
            const data = await getFilmBo(currentPage)
            const data2 = data.results.filter((item) => {
                if (item.origin_country.indexOf(nationID) !== -1) {
                    return item
                }
            })
            setArrFilm(data2)
        }
        getFilm()
    }, [nationID, currentPage])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [nationID, currentPage])
    return (
        <div className="container nationFilm">
            <Row className="nationFilm-list">
                {arrFilm && arrFilm.length !== 0 &&
                    arrFilm.map((item) => {
                        return (
                            <Col className="nationFilm-item" xxl={6} xl={6} md={12} sm={12} xs={24} key={item.id}>
                                <Link to={`/tv-show_detail/${item.id}/${item.original_title ? item.original_title : item.original_name}`}>
                                    <div className="nationFilm-surro">
                                        <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="nationFilm-img"></img>
                                        <p className="nationFilm-name">{item.original_title ? item.original_title : item.original_name}</p>
                                    </div>
                                </Link>
                            </Col>
                        )
                    })
                }
            </Row>
            <div className="pagination">
                <Row className="pagination__main">
                    <Pagination defaultCurrent={1} onChange={handleChange} total={10000} pageSize={20} />;
                </Row>
            </div>
        </div>

    );
}
export default NationFilm
// /tv-show_detail/:id/:Moviename