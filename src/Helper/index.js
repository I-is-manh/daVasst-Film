export const api_key = process.env.api_key;
export const getGenre = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=vi`)
    const data = await res.json();
    return data
}
export const getFilm = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=vi&page=1`);
    const data = await res.json();
    return data;
    
}
export const getFilmLe = async (number, filter) => {
    let str = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=${number}&language=vi&api_key=${api_key}`;
    let hehe = ""
    if(filter !== null){
        for(let key in filter){
            if(filter[key] !== undefined){
                str += `&${key}=${filter[key]}`
            }
        }
    }
    const res = await fetch(str)
    const data = await res.json();
    return data
}
export const getFilmBo = async (number, filter) => {
    let str = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=vi&page=${number}&sort_by=popularity.desc&api_key=${api_key}`
    if(filter !== null){
        for(let key in filter){
            if(filter[key] !== undefined){
                str += `&${key}=${filter[key]}`
            }
        }
    }
    const res = await fetch(str)
    const data = await res.json();
    return data
}
export const getFilmLeTop = async (number) => {
    let str = `https://api.themoviedb.org/3/movie/top_rated?language=vi&page=${number}&api_key=${api_key}`
    const res = await fetch(str)
    const data = await res.json();
    return data
}
export const getFilmLeTopAll = async () => {
    let page = 1
    let total_page = 50
    let arrFilm = []
    while(page <= total_page){
        const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=vi&api_key=${api_key}&page=${page}`)
        const data = await res.json();
        page++
        arrFilm = [...arrFilm,...data.results]
    }
    return arrFilm
}
export const getFilmBoTop = async (number) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=vi&page=${number}&api_key=${api_key}`)
    const data = await res.json();
    return data
}
export const getFilmBoTopAll = async () => {
    let page = 1
    let total_page = 50
    let arrFilm = []
    while(page <= total_page){
        const res = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=vi&api_key=${api_key}&page=${page}`)
        const data = await res.json();
        // total_page = data.total_pages
        page++
        arrFilm = [...arrFilm,...data.results]
    }
    return arrFilm
}
export const getUpComingLe = async (number) => {
    let str = `https://api.themoviedb.org/3/movie/upcoming?language=vi&page=${number}&api_key=${api_key}`
    const res = await fetch(str)
    const data = await res.json()
    return data
}
export const getNation = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${api_key}`)
    const data = res.json()
    return data
}
export const getFilmItem = async (filmId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=vi&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getCredit = async (filmId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=${api_key}`)
    const data = res.json()
    return data
}
export const getRelate = async (filmId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/similar?language=vi&page=1&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getRecomendByFilm = async (filmId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/recommendations?language=vi&page=1&api_key=$${api_key}`)
    const data = await res.json()
    return data
}
export const getDetailTVshow = async (filmId) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${filmId}?language=vi&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getCreditTvshow = async (filmId) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${filmId}/credits?language=vi&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getTVShowSimilar = async (filmID) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${filmID}/similar?language=vi&page=1&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getFilmGenreDetail = async (genreID, number, filter) => {
    let str
    if (filter.quocgia === undefined && filter.release === undefined) {
        str = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreID}&page=${number}`
    }
    else {
        str = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreID}&page=${number}&primary_release_year=${filter.release}&with_origin_country=${filter.quocgia}`
    }
    const res = await fetch(str)
    const data = await res.json()
    return data
}
export const getSearchFilmLe = async (nameoffilm) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${nameoffilm}&language=vi`)
    const data = await res.json()
    return data
}
export const getSearchFilmBo = async (nameoffilm) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${nameoffilm}&language=vi`)
    const data = await res.json()
    return data
}
export const getVideoLe = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`)
    const data = await res.json()
    return data
}
export const getVideoBo = async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=en-US`)
    const data = await res.json()
    return data
}
export const getVideoBySearchMovie = async (name) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${name}&language=vi`)
    const data = await res.json()
    return data
}
export const getVideoBySearchTVShow = async (name) => {
    const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=vi&query=${name}`)
    const data = await res.json()
    return data
}
export const getGenreTV = async() =>{
    const res = await fetch(`https://api.themoviedb.org/3/genre/tv/list?language=vi&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getFilmByNation = async(nationID,page) => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_origin_country=${nationID}&language=vi-VN&page=${page}`)
    const data = await res.json()
    return data
}