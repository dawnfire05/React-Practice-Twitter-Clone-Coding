import { authService } from "fbase";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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

    const ToggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const {
            target : {name},
        } = event;
        let provider;
        if (name === "google"){
            provider = new GoogleAuthProvider();
        }else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
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
                        setError(error.message);
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
                        setError(error.message);
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
                {error}
            </form>
            <span onClick={ToggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name = "google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name = "github">
                    Continue with Github
                </button>
            </div>
        </div>
    )
}
export default Auth;