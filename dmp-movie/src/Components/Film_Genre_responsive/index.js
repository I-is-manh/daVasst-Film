import React from "react"
import { useState,useEffect } from "react";
import { getGenre } from "../../Helper";
import "./Genre_res.css"
import { Link } from "react-router-dom";
function Genre__Responsive(prop) {
    const [arr,setArr] = useState([]);
    useEffect(() => {
        const getList = async() =>{
            const data = await getGenre();
            setArr(data.genres)
        }
        getList()
    }, [])
    const handleClick = () =>{
        prop.f(false)
    }
    return (
        <ul className="list_film">
            {arr.map((item)=>{
                return <Link to={`/genre_detail?genreID=${item.id}&genre_name=${item.name}`} key={item.id} onClick={handleClick}><li key={item.id} className="film_item">{item.name}</li></Link>
            })}
        </ul>
    );
}

export default Genre__Responsive;