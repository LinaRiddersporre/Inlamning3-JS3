import firebase from 'firebase/app';
import 'firebase/database'
import configuration from '../firebase/firebaseconfig';

const AddMovie = () => {

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
        const moviePicture = e.target.children[3].value;
        const creator = storage

        addMovie(movieTitle, shortMovieDescription, longMovieDescrition, moviePicture, creator);
        
    }
 

    return(
        <div>
            <form onSubmit={submitForm}>
                <input type='text' placeholder='Filmtitel' required></input>
                <input type='text' placeholder='Kort beskrivning' required></input>
                <input type='text' placeholder='Lång beskrivning' required></input>
                <input type='file' placeholder='bild' required></input>
                <input type='submit' value='Lägg till film' required></input>
            </form>
        </div>
    )
}

export default AddMovie;