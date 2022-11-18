import React from "react";
import firebase from 'firebase/app';
import 'firebase/database'
import configuration from "../firebase/firebaseconfig";
import BasicModal from "../modal/modal";
import './_login.css'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {errorMessage : ''};
        this.state = {openModal : false};
    }

    submitForm = (e) =>{
        e.preventDefault()
        const userName = e.target.children[1].value
        const password = e.target.children[2].value
        console.log(e.target.children, password)
        this.loginCheck(userName, password)
    }

    loginCheck = (userName, password) => {
        firebase.database().ref().child('users').orderByChild('userName').equalTo(userName).once('value', snapshot => {
            if(!snapshot.exists()){
                console.log("finns inte/ fel lösen");
                this.setState({errorMessage: 'Finns inte'})
                this.setState({openModal: true})
            }else{
                firebase.database().ref().child('users').orderByChild('password').equalTo(password).once('value', snapshot => {
                    if(!snapshot.exists()){
                        this.setState({errorMessage: 'Fel lösenord'})
                        this.setState({openModal: true})
                    }else{
                        this.setState({errorMessage: 'Inloggad'})
                        this.setState({openModal: true})
                        localStorage.setItem('id', `${userName}`)
                    }
                })
            }
        })
    }

    alert = () => {
        if(this.state.openModal===true){
            return(
                <div>
                    {console.log(this.state.openModal)}
                    <BasicModal 
                        errorMessage={this.state.errorMessage} 
                        catchClose={this.catchClose}
                        openModal={this.state.openModal}
                    />
                </div>    
            )
        }
    }

    catchClose = (boolean) => {
        this.setState({openModal: boolean})
        console.log(boolean)
    }

    render (){
        if(!firebase.apps.length){
            firebase.initializeApp(configuration());
        }
        return(
            <div className="formBody">
                {this.alert()}
                <form onSubmit={this.submitForm} className='form'>
                    <h1>Logga in</h1>
                    <input type='email' placeholder='@gmail.com' className="mailInput" required></input>
                    <input type='password' placeholder='Lösenord' className="passwordInput" required></input>
                    <input type='submit' value='Logga in'></input>
                </form>
            </div>
        )
    }
}

export default Login;