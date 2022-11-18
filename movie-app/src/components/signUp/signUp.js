import firebase from 'firebase/app';
import 'firebase/database'
import { useState } from 'react';
import configuration from "../firebase/firebaseconfig";
import BasicModal from '../modal/modal';


const SignUp = (props) => {
    const [message, setMessage] = useState(props.errorMessage)
    const [openModal, setOpenModal] = useState(false)
    
    if(!firebase.apps.length){
        firebase.initializeApp(configuration());
    }
    const database = firebase.database()
    const databaseRef = firebase.database().ref()

    const exist = (userName, password) => {
        databaseRef.child('users').child(userName).get().then((snapshot) => {
            if (snapshot.exists()) {
                setMessage('Finns redan')
                setOpenModal(true)
              console.log('Finns redan');
            } else {
              saveData(userName, password)  
              console.log("Ny inloggning skapad");
              setMessage('Kontot är skapat')
              setOpenModal(true)
            }
          }).catch((error) => {
            console.error(error);
          });
    }
    
    const submitForm = (e) => {
        e.preventDefault()
        const userName = e.target.children[1].value
        const password = e.target.children[2].value
        exist(userName, password)
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
    
    function saveData(userName, password){
        database.ref('users/' + userName).set({
            userName : userName,
            password : password
        })
    }
 
    return(
        <div className='formBody'>
            {alert()}
            <form onSubmit={submitForm} className='form'>
                <h1>Skapa konto</h1>
                <input type='text' placeholder='@gmail.com' className='mailInput' required></input>
                <input type='password' placeholder='Lösenord' className='passwordInput' required></input>
                <input type='submit' value='Skapa konto' ></input>
            </form>
        </div>
    )
}

export default SignUp;