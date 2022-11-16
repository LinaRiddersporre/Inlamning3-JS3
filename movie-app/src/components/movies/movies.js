import firebase from 'firebase/app';
import 'firebase/database'
import configuration from '../firebase/firebaseconfig';
import {useState} from 'react'
import { NavLink } from 'react-router-dom';
import './_movie.css'

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

    // inte bästa sättet, får klura på annat sätt
    function handleRemove(key, movie) {
        arrayOfMovies.splice(key, 1)
        setArrayOfMovies(arrayOfMovies => [...arrayOfMovies])
        console.log(movie)
        movieRef.ref('movies/').child(movie).remove()
        console.log(arrayOfMovies)
    }
    

    return(
        <div>
            <h1>Filmtoppen</h1>
            <div>
            {arrayOfMovies.map((movie, index) => {
            return (
                <div key={index}> 
                    <NavLink 
                    to={`/movies/${movie.movieTitle}`}
                    ><h2>Filmtitel: {movie.movieTitle}</h2></NavLink>
                    <img src={`${movie.moviePicture}`}/>
                    <p>{movie.shortMovieDescription}</p>
                    {localStorage.getItem('id')===movie.creator ? <button onClick={() =>{handleRemove(index, movie.movieTitle)}}>Ta bort</button> : null}
                </div>
            )
        })}
            </div>
        </div>
    )
}

export default Movies;