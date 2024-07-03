import { authService } from "fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
//test

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) =>{
        const {
            target:{name, value},
        }=event;
        if(name==="email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
            let user;
            if(newAccount){
                createUserWithEmailAndPassword(authService, email, password)
                    .then((userCredential) => {
                        user = userCredential.user;
                        console.log(user);
                    })
                    .catch((error) => {
                        console.log(error.code);
                        console.log(error.message);
                    });
            } else{
                signInWithEmailAndPassword(authService, email, password)
                    .then((userCredential) => {
                        user = userCredential.user;
                        console.log(user);
                    })
                    .catch((error) => {
                        console.log(error.code);
                        console.log(error.message);
                    });
            }
    }
    
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Eamil" value={email} onChange={onChange} required/>
                <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required/>
                <input type="submit" value={newAccount ? "Create Account" : "Log in"}/>
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth;