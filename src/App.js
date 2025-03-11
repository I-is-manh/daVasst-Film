import './App.css';
import DefaultLayout from './Components/DefaultLayout';
import { Routes,Route } from 'react-router-dom';
import Film_Bo from './Components/TV-Show';
import Home from "./Components/Home"
import Film_Detail from './Components/Film_Detail';
import FilmDetailTVShow from './Components/FilmDetailTVShow';
import FilmGenreDetail from "./Components/FilmGenreDetail"
import NationFilm from './Components/NationFilm';
import SearchResponse from './Components/SearchRespone';
import XemVideo from './Components/XemVideo';
import ListUpComing from './Components/ListUpComing';
import ShowFilmLe from './Components/ShowFilmLe';
import FilmLeTop from './Components/FilmLeTop';
import FilmBoTop from './Components/FilmBoTop';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout/>}>
          <Route path='/' element={<Home/>} index></Route>
          <Route path='/tv_show' element={<Film_Bo/>}></Route>
          <Route path='/film_detail/:id/:Moviename' element={<Film_Detail/>}></Route>
          <Route path='/genre_detail' element={<FilmGenreDetail/>}></Route>
          <Route path='/tv-show_detail/:id/:Moviename' element={<FilmDetailTVShow/>}></Route>
          <Route path='/nation_film' element={<NationFilm/>}></Route>
          <Route path='/search_response/:nameoffilm' element={<SearchResponse/>}></Route>
          <Route path='/xemphim' element={<XemVideo/>}></Route>
          <Route path='/listupcoming' element={<ListUpComing/>}></Route>
          <Route path='/showfilmle' element={<ShowFilmLe/>}></Route>
          <Route path='/filmbotop' element={<FilmBoTop/>}></Route>
          <Route path='/filmletop' element={<FilmLeTop/>}></Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
