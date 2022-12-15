import { Button } from "@chakra-ui/react";
import "./App.css";
import { Route } from 'react-router-dom'
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";

function App() {
  return (
    <div className="App">
      <Route path='/' component={HomePage} exact/>
      <Route path='/chats' component={ChatPage}/>
      
    </div>
  );
}

export default App;
