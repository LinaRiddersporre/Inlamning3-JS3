import firebase from 'firebase/app';
import 'firebase/database'
import { useState } from 'react';
import configuration from "../firebase/firebaseconfig";
import BasicModal from '../modal/modal';


const SignUp = (props) => {
    const [message, setMessage] = useState(props.errorMessage)
    if(!firebase.apps.length){
        firebase.initializeApp(configuration());
    }
    const database = firebase.database()
    const databaseRef = firebase.database().ref()

    const exist = (userName, password) => {
        databaseRef.child('users').child(userName).get().then((snapshot) => {
            if (snapshot.exists()) {
                setMessage('Finns redan')
              console.log('Finns redan');
            } else {
                setMessage('Kontot är skapat')
              console.log("Ny inloggning skapad");
              saveData(userName, password)
            }
          }).catch((error) => {
            console.error(error);
          });
    }
    
    const submitForm = (e) => {
        e.preventDefault()
        const userName = e.target.children[0].value
        const password = e.target.children[1].value
        exist(userName, password)
    }

    const alert = () => {
        return(
            <div>
                <BasicModal errorMessage={message}/>
            </div>
        )
    }
    
    function saveData(userName, password){
        database.ref('users/' + userName).set({
            userName : userName,
            password : password
        })
    }
 
    return(
        <div>
            {alert()}
            <form onSubmit={submitForm}>
                <input type='text' placeholder='@gmail.com' ></input>
                <input type='password' placeholder='Lösenord'></input>
                <input type='submit' value='Skapa konto' ></input>
            </form>
        </div>
    )
}

export default SignUp;