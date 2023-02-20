import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './asset/searchIcon.svg';
import MovieCard from "./component/MovieCard";
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=a29540f7';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const searchMovies = (title) => {
        console.log(isPending);
        setTimeout(() => {
            fetch(`${API_URL}&s=${title}`)
                .then(res => {
                    if (!res.ok) {
                        throw Error(`Couldn't fetch the data for ${title}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setMovies(data.Search);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    setIsPending(false);
                    setError(err.message);
                });
        }, 1000);

    }

    useEffect(() => {
        searchMovies('Superman');
    }, []);

    return (
        <div className="app">
            <h1>Movie Land</h1>
            {error && <div  style={{ color: "red" }}>{error} </div>}
            {isPending && <div className="loader" style={{ color: "white" }}></div>}
            <div className="search">
                <input
                    placeholder="search movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <img src={SearchIcon} alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />

            </div>
            {
                movies?.length > 0 ?
                    (<div className="container">
                        {
                            movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))
                        }
                    </div>)
                    :
                    <div className="empty">
                        <h2>No Movies Found !</h2>
                    </div>
            }

        </div>
    );
}

export default App;


