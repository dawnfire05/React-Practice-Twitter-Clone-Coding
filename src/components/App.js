import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(fasle);
  return (
    <>
      <AppRouter isLoggedIn = {isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()} NTwitter</footer>
    </>
    <AppRouter/>
  );
}

export default App;
