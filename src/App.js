import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebase.config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser, setUser, toogleState } from "./feature/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uEmail = user.email;
        // dispatch(setUser(uEmail))
        dispatch(getUser(uEmail));
        
      } else {
        dispatch(toogleState())
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
