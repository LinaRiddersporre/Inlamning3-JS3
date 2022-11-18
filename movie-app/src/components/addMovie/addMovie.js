import firebase from 'firebase/app';
import 'firebase/database'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import configuration from '../firebase/firebaseconfig';
import BasicModal from '../modal/modal';
import './_addMovie.css'

const AddMovie = (props) => {
    const [message, setMessage] = useState(props.errorMessage)
    const [openModal, setOpenModal] = useState(false)
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

    function addMovie(movieTitle, shortMovieDescription, longMovieDescrition, moviePicture, creator){
        firebase.database().ref('movies/' + movieTitle).set({
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
        const movieTitle = e.target.children[1].value;
        const shortMovieDescription = e.target.children[2].value;
        const longMovieDescrition = e.target.children[3].value;
        let moviePicture = e.target.children[4].value;
        if(moviePicture === ''){
            moviePicture = 'https://media.gettyimages.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=gi&k=20&c=8ClshQC50T-wPj6CPvnPnFq1Er6Fs8fbrreXWehvdgk='
        }
        const creator = storage
        console.log(moviePicture)
        addMovie(movieTitle, shortMovieDescription, longMovieDescrition, moviePicture, creator);
        setMessage('Filmen är skapad')
        setOpenModal(true)
    }

    const alert = () => {
        if(openModal===true){
            return(
                <div>
                    <BasicModal 
                        errorMessage={message}
                        catchClose={catchClose}
                        openModal={openModal}    
                    />
                </div>
            )
        }
    }

    const catchClose = (boolean) => {
        setOpenModal(boolean)
        console.log(boolean)
    }

    return(
        <div>
            {alert()}
            <form onSubmit={submitForm} className='form'>
                <h1>Lägg till en film</h1>
                <input type='text' placeholder='Filmtitel' className='movieTitleInput' required></input>
                <textarea cols={'30'} rows='8' placeholder='Kort beskrivning' className='discriptionInput' required></textarea>
                <textarea cols={'40'} rows='15' placeholder='Lång beskrivning' className='discriptionInput' required></textarea>
                <input type='text' placeholder='Alternativ url till bild' className='urlInput'></input>
                <input type='submit' value='Lägg till film' required></input>
            </form>
        </div>
    )
}

export default AddMovie;