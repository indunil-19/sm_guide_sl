import './App.css';
import TravelApp from './screens/landingPage';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"
import {TravelPlanRoutes} from './screens/TravelPlanApp'
import { Adminroutes } from './screens/AdminPortal/Adminroutes';
import ReactGA from 'react-ga';
import { useEffect } from 'react';
ReactGA.initialize('G-0BFM1STVER');

function App() {  
  useEffect(()=>{
    ReactGA.pageview(window.location.pathname + window.location.search);
  },[])


  return (
    <ChakraProvider>
    <div className="App">
      <BrowserRouter>
      
        <Switch>
    
          <Route  path="/">
            <TravelApp/>
          </Route>
          
          <Route path="/travelPlan">
            <TravelPlanRoutes  />
          </Route>

          <Route path="/admin">
            <Adminroutes  />
          </Route>
          
        </Switch>
        
      </BrowserRouter>
    
    </div>
    </ChakraProvider>
    
  );
}


export default App;

