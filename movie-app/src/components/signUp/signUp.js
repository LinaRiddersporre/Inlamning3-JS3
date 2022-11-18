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

    const exist = (userName, password) => {
        firebase.database().ref().child('users').orderByChild('userName').equalTo(userName).once('value', snapshot => {
            if(!snapshot.exists()){
                console.log("Ny inloggning skapad");
                setMessage('Kontot är skapat')
                setOpenModal(true)
                saveData(userName, password)  
            }else{
                setMessage('Finns redan')
                setOpenModal(true)
            }
        })
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
    }
    
    function saveData(userName, password){
        firebase.database().ref('users/').push({
            userName : userName,
            password : password
        })
    }
 
    return(
        <div className='formBody'>
            {alert()}
            <form onSubmit={submitForm} className='form'>
                <h1>Skapa konto</h1>
                <input type='email' placeholder='@example.com' className='mailInput' required></input>
                <input type='password' placeholder='Lösenord' className='passwordInput' required></input>
                <input type='submit' value='Skapa konto'></input>
            </form>
        </div>
    )
}

export default SignUp;