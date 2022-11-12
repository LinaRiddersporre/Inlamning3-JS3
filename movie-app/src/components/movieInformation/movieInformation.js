import { useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import firebase from 'firebase/app';
import 'firebase/database'

const MovieInformation = (props) => {
    const [movie, setMovie] = useState('')

   let {id} = useParams()

   const getTheMovie = () => {
    const movieRef = firebase.database().ref(`movies/` + id)
    movieRef.on('value', (snapshot) => {
        let childData = snapshot.val()
        console.log(childData)
        setMovie(childData)
        
    })
   }

    if(movie === ''){
        getTheMovie()
    }

   const showTheMovie = () => {
    return(
         <div> 
        <h2>Filmtitel: {movie.movieTitle}</h2>
        <img src={`${movie.moviePicture}`}/>
        <p>{movie.longMovieDescrition}</p>
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