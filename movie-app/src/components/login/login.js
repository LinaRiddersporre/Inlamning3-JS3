import React from "react";

class Login extends React.Component{

    render (){
        return(
            <div>
                <form>
                    <input type='text' placeholder='@gmail.com'></input>
                    <input type='password' placeholder='Lösenord'></input>
                    <input type='submit' value='Logga in'></input>
                </form>
            </div>
        )
    }
}

export default Login;