import { useState, useEffect } from 'react';

var ENV = process.env;
var mostRecentMoviesURL = ENV.REACT_APP_API_DOMAIN + '/discover/movie?api_key=' + ENV.REACT_APP_MOVIE_DB_API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';


const Popup = () => {

}

const AddMovieCard = (props) => {

    return(
        <div className="movie-card" key={props.movie.id}>
            <div className="card-img-cont">
            <img src={ENV.REACT_APP_API_BASE_IMAGE_URL + props.movie.poster_path} alt="..." className="card-img"/>
            </div>
            <h5 style={{margin: "15px 0px", fontWeight: "500", fontSize: "14px"}}>{props.movie.title}</h5>
            <span className="movie-rating">{props.movie.vote_average}</span>
        </div>
    )

}

async function GetMovies(inputStr){

    let retData;

    if(inputStr.trim() === "")
    {
        console.log("test");
        retData = await fetch(mostRecentMoviesURL)
                        .then(data => {console.log(data); return data.json()});
    }
    else
    {
        fetch(ENV.REACT_APP_API_DOMAIN + '/search/movie?api_key=' + ENV.REACT_APP_MOVIE_DB_API_KEY + '&query=' + inputStr)
        .then(data => {
            fetch(ENV.REACT_APP_API_DOMAIN + '/movie/' + data.id + '?api_key=' + ENV.REACT_APP_MOVIE_DB_API_KEY)
            .then(detailData => {return detailData});
            });
    }

    return retData;
}

const MovieGrid = (props) => {

    const [movieArr, setMovies] = useState(null);

    console.log(movieArr);

    let displayMovies = [];

    useEffect(() => {

		(async () => {
			let buf = await GetMovies("");
			setMovies(buf.results);
        })();
        
    }, []);

    if(movieArr){
        movieArr.forEach(movie => {
            displayMovies.push(AddMovieCard(movie={movie}))
        });
    }

    return (
        <div className="movie-grid">
            {displayMovies}
        </div>
    );
}

export default MovieGrid;