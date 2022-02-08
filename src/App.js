import "./App.css";
import Row from "./container/Row";
import requests from "./request";
import Banner from "./container/Banner";
import Nav from "./container/Nav";
function App() {
  return (
    <>
      <div className="App">
        <Nav />
        <Banner />
        <Row
          isLargeRow
          title="netflix orginal"
          fetchUrl={requests.fetchNetflixOriginals}
        />
        <Row title="Trending now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchTopActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchTopComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchTopHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchTopRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchTopDocumentaries} />
      </div>
    </>
  );
}

export default App;
