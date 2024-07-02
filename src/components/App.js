import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(()=> {
    onAuthStateChanged(authService,(user)=>console.log(user), []);
  })
  console.log(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn = {isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} NTwitter</footer>
    </>
  );
}

export default App;
