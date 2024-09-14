import React from "react"
import "./Video.css"
import { useSearchParams } from "react-router-dom";
function XemVideo() {
    const [searchParams, setSearchParams] = useSearchParams()
    const key = searchParams.get("key") || ""
    const nameMovie = searchParams.get("name") || ""
    return (
        <div className="container">
            {key === "null" ? <p className="video_null">Chúng tôi xin lỗi bạn không thể xem phim này do lý do bản quyền</p> : 
            <>
                <p className="video__name"> Xem phim {nameMovie}</p>
                <iframe src={`https://www.youtube.com/embed/${key}`} style={{ width: "100%", height: "500px", borderRadius: "5px", border: "none" }} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>
            </>

            }
        </div>
    );
}

export default XemVideo;
