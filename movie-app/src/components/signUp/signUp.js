import { useState } from "react"
import firebase from 'firebase/app';

// import database from "../firebase/firebase";


const SignUp = () => {
    // const [userName, setUserName] = useState();
    // const Push = () => {
    //     database.ref(url).set({
    //         userName : userName
    //     }).catch(console.log('det gick inte'))
    // }
    
    const {url} = 'https://movies-and-inlog-js3-default-rtdb.firebaseio.com/inlogg.json'

    fetch(url)
    .then(response => response)
    .then(data => {
        console.log('nehe', data)
        console.log(firebase.database())
    })

    const newName = {
        userName: '',
        password: ''
    }

    const submitForm = (e) => {
        e.preventDefault()
        newName.userName = e.target.children[0].value
        newName.password = e.target.children[1].value
       console.log(newName)
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