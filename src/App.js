import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import Navbar from "./Components/Navbar";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import ProtectedRoute from "./Util/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moviex-react" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" component="ERROR 404" />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
