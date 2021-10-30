import { useState, useEffect } from 'react';

//Environment variables for URL's needed to access api. Environment api key embedded into variables.
var ENV = process.env;
//Gets the current date so that the latest movies can be sorted starting from this date.
const thisDate = new Date();
var mostRecentMoviesURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + ENV.REACT_APP_MOVIE_DB_API_KEY + '&language=en-US&page=1&sort_by=primary_release_date.desc&region=US&primary_release_date.lte=' + thisDate.getFullYear() + '-' + (thisDate.getMonth() + 1) + '-' + thisDate.getDate();
var searchMovieURL = ENV.REACT_APP_API_DOMAIN + '/search/movie?api_key=' + ENV.REACT_APP_MOVIE_DB_API_KEY + '&query=';

//Popup component
const Popup = (props) => {
    
   
    //If there is no movie prop provided, do not render component.
    if(props.movie === null)
    {
        return(null);
    }
    else
    {

    //Month array allows numeral release date to be translated into month name.
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //Year, month, day for release date stored in this array by using regex to pull from string. A default value is provided if there is no release date given.
    let dateNumbers = props.movie.release_date.match(/\d+/g) || [1,1,1];

        return(
            <div className="grey-background" >
                <div className="popup">
                <button className="x-button" onClick={() => props.setPopupMovie(null)}><i className="fas fa-times"></i></button>
                <h3 style={{margin: "8px 20px 16px 0px", fontSize: "16px"}}>{props.movie.title}</h3>
                    <div className="popup-grid">
                        <div>
                            <img src={ENV.REACT_APP_API_BASE_IMAGE_URL + props.movie.poster_path} alt="..." style={{width: "100%"}} />
                        </div>
                        <div>
                            <p className="paragraph" style={{marginTop: "0px"}}><b>Release date: </b>{months[parseInt(dateNumbers[1]) - 1]} {dateNumbers[2]}, {dateNumbers[0]}</p>
                            <p className="paragraph">{props.movie.overview} </p>
                            <p className="paragraph"><b>{props.movie.vote_average}</b> / 10 ({props.movie.vote_count} total votes)</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//Component for a single movie card in the grid. Pulls data from movie prop provided.
const AddMovieCard = (props) => {

    return(
        <div className="movie-card" key={props.movie.id} onClick={() => props.setPopupMovie(props.movie)}>
            <div className="card-img-cont">
            <img src={ENV.REACT_APP_API_BASE_IMAGE_URL + props.movie.poster_path} alt="..." className="card-img"/>
            </div>
            <h5 style={{margin: "15px 0px", fontWeight: "500", fontSize: "14px", maxWidth: "300px"}}>{props.movie.title}</h5>
            <span className="movie-rating">{props.movie.vote_average}</span>
        </div>
    )

}

//Asynchronous function for retrieving data from the api endpoints. One for newest releases and one for a search query.
async function GetMovies(inputStr){

    

    let retData;

    if(inputStr.trim() === "")
    {
        retData = await fetch(mostRecentMoviesURL)
                        .then(data => { return data.json() });
    }
    else
    {
        retData = await fetch(searchMovieURL + inputStr)
                        .then(data => { return data.json() });
    }

    return retData;
}

const MovieGrid = (props) => {

    //Two state variables to upadate the component when new movie data is fetched and when a popup is set to be displayed for a movie.
    const [movieArr, setMovies] = useState(null);
    const [popupMovie, setPopupMovie] = useState(null);

    let displayMovies = [];

    useEffect(() => {

		(async () => {
			let buf = await GetMovies(props.queryStr);
			setMovies(buf.results);
        })();
        
    }, [props.queryStr]);

    //Fills displayMovies array with a AddMovieCard component created for each movie in movieArr.
    if(movieArr){
        movieArr.forEach(movie => {
            displayMovies.push( <AddMovieCard movie={movie} key={movie.id} setPopupMovie={setPopupMovie} /> )
        });
    }

    //Renders movie grid and popup if the movie array is not null.
    if(movieArr !== null)    
    {
        return (
            <div className="movie-grid">
                {displayMovies}
                <Popup movie={popupMovie} setPopupMovie={setPopupMovie} />
            </div>
        );
    }
    else
    {
        return (null);
    }
}

export default MovieGrid;