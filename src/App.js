import React from "react";
import Routes from "../src/routes/routes";
import { AuthProvider } from "./context/authContext";

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  }
}

export default App;
