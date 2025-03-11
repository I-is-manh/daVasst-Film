import "./Film_Genre.css"
import React, { useEffect,useState } from "react";
import { getGenre } from "../Helper/index.js"
import { Link } from "react-router-dom";
function Film_Genre() {
    const [arrList, setArrList] = useState([])
    useEffect(() => {
        const getList = async() =>{
            const data = await getGenre();
            setArrList(data.genres)
        }
        getList()
    }, [])
    return (
        <div className="overlay_filmlist">
            <ul className="film__genre">
               {arrList.map((item)=>{
                    return <li className="film__genre-item" key={item.id}><Link to={`/genre_detail?genreID=${item.id}&genre_name=${item.name}`} className="film__genre-item">{item.name}</Link></li>
               })}
            </ul>
        </div>
    );
}
export default Film_Genre;