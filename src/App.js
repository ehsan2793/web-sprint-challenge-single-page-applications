import React from "react";
import { Link, Route, Switch } from 'react-router-dom'
import Home from './components/homepage';
import Help from './components/Help'
import Shop from './components/Shop';
import Conferm from './components/Conferm'

const App = () => {
  return (
    <div className="App">
      <nav>
         <h2 className="lambda-pizza">Lambda Pizza</h2>
        <div className="links">
           <Link to="/">Home</Link>
           <Link to="/help">Help</Link>
            <Link id="order-pizza" to="/pizza"> Pizza</Link> 
       
        </div>
      </nav>
      <Switch>
      <Route path= "/pizza/conferm" >
        <Conferm/>
        </Route>

        <Route path= "/help" >
        <Help/>
        </Route>

        <Route path= "/pizza" >
        <Shop/>
        </Route>

        <Route path= "/" >
        <Home/>
        </Route>
      
        </Switch>
       
{/* /pizza/conferm */}


    </div>
  );
};
export default App;
