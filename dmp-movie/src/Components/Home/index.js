import React, { useEffect, useState } from "react";
import "./Home.css"
import  Recommend  from "./FILMRECOM/Recommend"
import FilmLe from "./FilmLE";
import FilmBo from  "./FilmBo"
import FilmTop from "./FilmTop";
import FilmUpComing from "./FilmUpComing";
function Home() {
    return (
        <>
            <Recommend/>
            <FilmLe/>
            <FilmBo/>
            <FilmTop/>
            <FilmUpComing/>
        </>
    );
}
export default Home;
