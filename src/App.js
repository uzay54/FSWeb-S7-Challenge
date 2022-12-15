import React,{useState} from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import Pizzaform from "./components/Pizzaform";
import PizzaSays from "./components/PizzaSays";
import './App.css';


const App = () => {
  return (
  <div className="App">
    <Header/>
      <div>
        <Route exact path={"/"}>
          <PizzaSays/>
        </Route>

        <Route path={"/pizza"}>
          <Pizzaform/>
        </Route>



      </div>
  </div>
  );
};
export default App;






