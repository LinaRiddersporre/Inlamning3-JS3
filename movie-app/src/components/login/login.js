import React from "react";
import firebase from 'firebase/app';
import 'firebase/database'
import configuration from "../firebase/firebaseconfig";

class Login extends React.Component{
    submitForm = (e) =>{
        e.preventDefault()
        const userName = e.target.children[0].value
        const password = e.target.children[1].value
        console.log(userName, password)
        this.loginCheck(userName, password)
    }

    loginCheck = (userName, password) => {
        firebase.database().ref().child('users').child(userName).get().then((snapshot) => {
            if (snapshot.exists()) {
                firebase.database().ref().child('users').child(userName).on('value', (snapshot)=>{
                    const data = snapshot.val()
                    console.log(data.password)
                    if(password === data.password){
                        console.log('inloggad')
                    }else{
                        console.log('fel lösenord')
                    }
                })
                
              } else {
                console.log("finns inte");
              }
            }).catch((error) => {
              console.error(error);
        })
    }

    render (){
        if(!firebase.apps.length){
            firebase.initializeApp(configuration());
        }
        return(
            <div>
                <form onSubmit={this.submitForm}>
                    <input type='text' placeholder='@gmail.com'></input>
                    <input type='password' placeholder='Lösenord'></input>
                    <input type='submit' value='Logga in'></input>
                </form>
            </div>
        )
    }
}

export default Login;