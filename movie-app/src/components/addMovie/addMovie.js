import firebase from 'firebase/app';
import 'firebase/database'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import configuration from '../firebase/firebaseconfig';


const AddMovie = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state === null) {
            navigate("/")
        }
    })

    if(!firebase.apps.length){
        firebase.initializeApp(configuration())
    }

    const database = firebase.database()

    function addMovie(movieTitle, shortMovieDescription, longMovieDescrition, moviePicture, creator){
        database.ref('movies/' + movieTitle).set({
            movieTitle : movieTitle, 
            shortMovieDescription : shortMovieDescription, 
            longMovieDescrition : longMovieDescrition, 
            moviePicture : moviePicture,
            creator : creator
        })
    }

    const storage = localStorage.getItem('id')
    

    const submitForm = (e) => {
        e.preventDefault();
        const movieTitle = e.target.children[0].value;
        const shortMovieDescription = e.target.children[1].value;
        const longMovieDescrition = e.target.children[2].value;
        let moviePicture = e.target.children[3].value;
        if(moviePicture === ''){
            moviePicture = 'https://media.gettyimages.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=gi&k=20&c=8ClshQC50T-wPj6CPvnPnFq1Er6Fs8fbrreXWehvdgk='
        }
        // () ? moviePicture=== : null
            
        const creator = storage

        console.log(moviePicture)
        addMovie(movieTitle, shortMovieDescription, longMovieDescrition, moviePicture, creator);
        
    }
 

    return(
        <div>
            <form onSubmit={submitForm}>
                <input type='text' placeholder='Filmtitel' required></input>
                <input type='text' placeholder='Kort beskrivning' required></input>
                <input type='text' placeholder='Lång beskrivning' required></input>
                <input type='text' placeholder='Alternativ url till bild' ></input>
                <input type='submit' value='Lägg till film' required></input>
            </form>
        </div>
    )
}

export default AddMovie;