import firebase from 'firebase/app';
import 'firebase/database'
import configuration from '../firebase/firebaseconfig';

const AddMovie = () => {

    if(!firebase.apps.length){
        firebase.initializeApp(configuration())
    }

    const database = firebase.database()

    function addMovie(movieTitle, shortMovieDescription, longMovieDescrition, moviePicture){
        database.ref('movies/' + movieTitle).set({
            movieTitle : movieTitle, 
            shortMovieDescription : shortMovieDescription, 
            longMovieDescrition : longMovieDescrition, 
            moviePicture : moviePicture
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        const movieTitle = e.target.children[0].value;
        const shortMovieDescription = e.target.children[1].value;
        const longMovieDescrition = e.target.children[2].value;
        const moviePicture = e.target.children[3].value;

        addMovie(movieTitle, shortMovieDescription, longMovieDescrition, moviePicture);
        
    }
 

    return(
        <div>
            <form onSubmit={submitForm}>
                <input type='text' placeholder='Filmtitel'></input>
                <input type='text' placeholder='Kort beskrivning'></input>
                <input type='text' placeholder='Lång beskrivning'></input>
                <input type='file' placeholder='bild'></input>
                <input type='submit' value='Lägg till film'></input>
            </form>
        </div>
    )
}

export default AddMovie;