import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const baseUrl = "http://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [lastMovie, setLastMovie] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     SetTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || "")
  //       .then((url) => {
  //         console.log(url);
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         SetTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  const handleClick = (movie) => {
    movieTrailer(movie?.name || "")
      .then((url) => {
        //https://www.youtube.com/watch?v=oyk0WPTQlhg
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");

        if (lastMovie === movie.name && trailerUrl !== "") setTrailerUrl("");
        else {
          setTrailerUrl(videoId);
          setLastMovie(movie.name);
        }
      })
      .catch((error) => {
        console.log("HANDLE ERROR GRACEFULLY", error);
        if (lastMovie === movie.name && trailerUrl !== "") setTrailerUrl("");
        else {
          setTrailerUrl("");
          setTrailerUrl("XtMThy8QKqU");
          setLastMovie(movie.name);
        }
      });
  };
  // console.log("error", handleClick(movie));

  console.table(movie);

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className={"row_posters"}>
          {movie.map((val) => {
            return (
              <img
                key={val.id}
                onClick={() => handleClick(movie)}
                className={`row-poster ${isLargeRow && "row_posterLarge"}`}
                alt={val.name}
                src={`${baseUrl}${
                  isLargeRow ? val.poster_path : val.backdrop_path
                }`}
              />
            );
          })}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

      {/*   
  <div>{movie.map((val,idx)=>{
      return <>
      <p>{val.id}</p>
      <img src={val.backdrop_path} alt={val.name}></img>
      </>
  })}</div> */}

      {/* <div className='row_poster'>Check${movie.map(movie=>{
      <img src={movie.poster_path} alt={movie.original_name}></img>
  })}}</div> */}
    </>
  );
};

export default Row;
