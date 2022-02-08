import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../request";
import "../container/Banner.css";
function Banner(props) {
  const [movie, setmovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }
    fetchData();
  }, []);
  const baseUrl = "http://image.tmdb.org/t/p/original/";

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.name || movie?.original_name || movie?.title}
        </h1>

        <button className="banner_buttons">Play</button>
        <button className="banner_buttons">My List</button>

        <h1 className="movie_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadebottom" />
    </header>
  );
}

export default Banner;
{
  /* <div className='banner_contents'></div>
      <h1>{movie?.name ||movie?.title || movie?.original_name}</h1> */
}
