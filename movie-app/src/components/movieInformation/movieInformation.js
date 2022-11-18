import { useState } from "react"
import { useParams } from "react-router-dom"
import firebase from 'firebase/app';
import 'firebase/database'
import './_movieInformation.css'

const MovieInformation = () => {
    const [movie, setMovie] = useState('')
    let {id} = useParams()
    const getTheMovie = () => {
        firebase.database().ref(`movies/` + id).on('value', (snapshot) => {
        setMovie(snapshot.val())
        })
    }

    if(movie === ''){
        getTheMovie()
    }

    const showTheMovie = () => {
        return(
            <div className="movieInformation"> 
                <img src={`${movie.moviePicture}`}/>
                <div className="innerDiv">
                    <h2>{movie.movieTitle}</h2>
                    <p>{movie.longMovieDescrition}</p>
                </div>
            </div>
        )
    }
    
    return(
        <div>
            {showTheMovie()}
        </div>
    )
}

export default MovieInformation;