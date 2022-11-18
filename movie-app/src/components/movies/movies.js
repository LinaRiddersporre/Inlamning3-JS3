import firebase from 'firebase/app';
import 'firebase/database'
import configuration from '../firebase/firebaseconfig';
import {useState} from 'react'
import { NavLink } from 'react-router-dom';
import './_movies.css'

const Movies = () => {
    const [arrayOfMovies, setArrayOfMovies] = useState([])
    if(!firebase.apps.length){
        firebase.initializeApp(configuration());
    }
    const movieRef = firebase.database()

    function getMoviesFromDatabase(){
        movieRef.ref('movies/').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let childData = childSnapshot.val()
                setArrayOfMovies(arrayOfMovies => [...arrayOfMovies, childData])
            })
        })
    }

    if(!arrayOfMovies.length > 0){
        getMoviesFromDatabase();
        console.log(arrayOfMovies, 'arrayOfMovies')
    }

    function handleRemove(key, movie) {
        arrayOfMovies.splice(key, 1)
        setArrayOfMovies(arrayOfMovies => [...arrayOfMovies])
        console.log(movie)
        movieRef.ref('movies/').child(movie).remove()
        console.log(arrayOfMovies)
    }

    return(
        <div className='pageBody'>
            <div className='title'><h1>Filmtoppen</h1></div>
            <div className='cardBody'>
                {arrayOfMovies.map((movie, index) => {
                    return (
                        <div key={index} className='card'> 
                            <NavLink 
                            to={`/movies/${movie.movieTitle}`}
                            className='innerBox'>
                                <img src={`${movie.moviePicture}`}/>
                                <div className='movieInformaton'>
                                    <h2>{movie.movieTitle}</h2>
                                    <p>{movie.shortMovieDescription}</p>
                                </div>
                            </NavLink>
                            <span className='removeButton'>
                                {localStorage.getItem('id')===movie.creator ? <button  onClick={() =>{handleRemove(index, movie.movieTitle)}}>Ta bort</button> : null}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Movies;