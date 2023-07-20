import "./App.css";

import UserAuthProvider from "./contexts/UserAuthContext";
import AppContainer from "./container/AppContainer";

function App() {
  return (
    <>
      <UserAuthProvider>
        <AppContainer />
      </UserAuthProvider>
    </>
  );
}

export default App;
