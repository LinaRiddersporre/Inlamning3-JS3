import { useState } from "react"
import firebase from 'firebase/app';
import 'firebase/database'
import configuration from "../firebase/firebaseconfig";


const SignUp = () => {
    if(!firebase.apps.length){
        firebase.initializeApp(configuration());
    }
    const database = firebase.database()
    const databaseRef = firebase.database().ref()

    const exist = (userName, password) => {
        databaseRef.child('users').child(userName).get().then((snapshot) => {
            if (snapshot.exists()) {
              console.log('Finns redan');
            } else {
              console.log("Ny inloggning skapad");
              saveData(userName, password)
            }
          }).catch((error) => {
            console.error(error);
          });
    }

    
    
    const submitForm = (e) => {
        e.preventDefault()
        exist(e.target.children[0].value, e.target.children[1].value)
    }
    
    function saveData(userName, password){
        database.ref('users/' + userName).set({
            userName : userName,
            password : password
        })
    }
 
    return(
        <div>
            
            <form onSubmit={submitForm}>
                <input type='text' placeholder='@gmail.com' ></input>
                <input type='password' placeholder='Lösenord'></input>
                <input type='submit' value='Skapa konto' ></input>
            </form>
        </div>
    )
}

export default SignUp;