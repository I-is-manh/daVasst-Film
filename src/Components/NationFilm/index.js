import React, { useEffect, useState } from "react";
import { Row, Col, Pagination } from "antd"
import { Link, useSearchParams } from "react-router-dom";
import "./NationFilm.css"
import { useQuery } from "@tanstack/react-query"
import { getFilmByNation } from "../../Helper";
function NationFilm() {
    const [searchParam, setSearchParam] = useSearchParams();
    const nationID = searchParam.get("nationID") || ""
    const [arrFilm, setArrFilm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [total,setTotal] = useState(1)
    const handleChange = (e) => {
        setCurrentPage(e)
    }
    const getFilm = async () => {
        const data = await getFilmByNation(nationID,currentPage)
        return data
    }
    // const sliceArray = (arr) => {
    //     if (arr) {
    //         let arrSliced = arr
    //         arrSliced = arrSliced.slice(currentPage * 20 - 20, currentPage * 20)
    //         return arrSliced
    //     }
    // }
    const data = useQuery({
        queryKey: ["page",currentPage],
        queryFn: getFilm,
    })
    useEffect(() => {
        setTotal(data.data?.length)
        setArrFilm(data.data?.results)
    }, [data.data, currentPage])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [currentPage])
    return (
        <div className="container nationFilm">
            <Row className="nationFilm-list">
                {arrFilm && arrFilm.length !== 0 &&
                    arrFilm.map((item, index) => {
                        return (
                            <Col className="nationFilm-item" xxl={6} xl={6} md={12} sm={12} xs={24} key={`${item.id}+${index}`}>
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
                    <Pagination defaultCurrent={1} onChange={handleChange} total={total} pageSize={20} />;
                </Row>
            </div>
        </div>

    );
}
export default NationFilm