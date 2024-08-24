export const api_key = "d295bf691f6221a3c4ae5e3cdb72c13f";
export const getGenre = async() =>{
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=vi`)
    const data = await res.json();
    return data
}
export const getFilm = async() =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=vi&page=1`);
    const data = await res.json();
    return data;
}
export const getFilmLe = async(number) =>{
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=${number}&language=vi&api_key=${api_key}`)
    const data = await res.json();
    return data
}
export const getFilmBo = async(number) =>{
    const res = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=vi&page=${number}&sort_by=popularity.desc&api_key=${api_key}`)
    const data = await res.json();
    return data
}
export const getFilmLeTop = async(number) =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=vi&page=${number}&api_key=${api_key}`)
    const data = res.json();
    return data
}
export const getFilmBoTop = async(number) =>{
    const res = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=vi&page=${number}&api_key=${api_key}`)
    const data = res.json();
    return data
}
export const getUpComing = async(number) =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=vi&page=${number}&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getNation = async() =>{
    const res = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=${api_key}`)
    const data = res.json()
    return data
}
export const getFilmItem = async(filmId) =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=vi&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getCredit = async(filmId) =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=${api_key}`)
    const data = res.json()
    return data
}
export const getRelate = async(filmId) =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/similar?language=vi&page=1&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getRecomendByFilm = async(filmId) =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/recommendations?language=vi&page=1&api_key=$${api_key}`)
    const data = await res.json()
    return data
}
export const getDetailTVshow = async(filmId) =>{
    const res = await fetch(`https://api.themoviedb.org/3/tv/${filmId}?language=vi&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getCreditTvshow = async(filmId) =>{
    const res = await fetch(`https://api.themoviedb.org/3/tv/${filmId}/credits?language=vi&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getTVShowSimilar = async(filmID) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${filmID}/similar?language=vi&page=1&api_key=${api_key}`)
    const data = await res.json()
    return data
}
export const getFilmGenreDetail = async(genreID,number) =>{
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreID}&page=${number}`)
    const data = await res.json()
    return data
}
export const getSearchFilmLe = async(nameoffilm) =>{
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${nameoffilm}&language=vi`)
    const data = await res.json()
    return data
}
export const getSearchFilmBo = async(nameoffilm) =>{
    const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${nameoffilm}&language=vi`)
    const data = await res.json()
    return data
}
export const getVideoLe = async(id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`)
    const data = await res.json()
    return data
}
export const getVideoBo = async(id) => {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=en-US`)
    const data = await res.json()
    return data
}