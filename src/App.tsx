import { useState } from "react";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Mentorías App</h1>
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <Login onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default App;
