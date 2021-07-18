import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.css";
import AddAccommodation from "./components/AddAccommodations/AddAccommodation";
import Inside from "./components/Inside";
import { LoginContext } from "./components/LoginContext";
import MyAccommodations from "./components/MyAccommodations";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import { getRequest } from "./lib/axios";

function App() {
  const { logged, setLogged, setUser, user } = useContext(LoginContext);

  const isLogged = async () => {
    try {
      const data = await getRequest(`users/me`);
      if (data.status === 200) {
        setLogged(true);
        setUser(data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        setLogged(false);
      } else {
        setLogged(true);
      }
    }
  };
  useEffect(() => {
    isLogged();
  }, [logged]);

  return (
    <Router>
      <NavBar />
      {!logged && <Redirect to='/welcome/login' />}
      <Route path='/welcome/login' exact component={Welcome} />
      <Route path='/accommodations' exact component={Inside} />
      <Route path='/accommodations/me' exact component={MyAccommodations} />
      <AddAccommodation />
    </Router>
  );
}

export default App;
