import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./feature/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uEmail = user.email;
        console.log();
        dispatch(setUser(uEmail));
        // ...
      } else {
        // console.log("Matha");
      }
    });
  }, []);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
