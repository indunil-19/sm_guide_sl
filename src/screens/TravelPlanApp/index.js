import { Route, Switch,useHistory } from "react-router"
import NavBar from "../../components/TravelPlanApp/navbar"
import { Home } from "./Home"
import { TravelPlan } from "./TravelPlan"
import { UserPreferences } from "./userPreferences"
import { TravelProvider } from "../../context/TravelContext"
import { ViewPois } from "./ViewPOI"
import { NearByHotels } from "./nearbyhotels"
import { EditPlan } from "./editPlan"
import { AddMorePlaces } from "./addMorePlaces"
import { MyPlans } from "./Myplans"
import { ViewMyTravelPlan } from "./ViewMyTravelPlan"
import { PlanReview } from "./PlanReview"
import { MyAccount } from "./myAccount"
import { Footer2 } from "../../components/TravelPlanApp/Footer2"
import { Box } from "@chakra-ui/layout"
import { TopRatedPlans } from "./TopRatedPlans"
import { SignIn } from "./signIn"
import { SignUp } from "./signUp"
import { About } from "./about"
import { Contact } from "./contact"
import { Provinces } from "./provinces"
import { Province } from "./province"
import { CustomPlan } from "./customPlan"
import { TravelContext } from "../../context/TravelContext"
import {useContext,useEffect} from "react"
import { SwitchPois } from "./switchPois"
import { ChangePassword } from "./changePassword"
import ResestPassword from "./resestPassword"
import StartLocation from "./startLocationPage"



const TravelPlanApp=()=>{
  const history=useHistory()
  const {state, dispatch}=useContext(TravelContext)
  useEffect(()=>{  
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
        if(!history.location.pathname.endsWith('/reset')){
            history.push('/travelPlan/signin')
        }
        
           
    }
  },[])

    return(
        <>
      
        <NavBar/>
        <Box minHeight="100vh" >
        <Switch >
             <Route path="/travelPlan/reset">
                <ResestPassword />
            </Route>
            <Route path="/travelPlan/switchpois/:index/:index1">
                <SwitchPois />
            </Route>
            <Route path="/travelPlan/changePassword">
                <ChangePassword/>
            </Route>
            <Route path="/travelPlan/customPlan">
                <CustomPlan/>
            </Route>
            <Route path="/travelPlan/startLocationSelect">
                <StartLocation/>
            </Route>
            <Route path="/travelPlan/province/:pid">
                <Province/>
            </Route>
            <Route path="/travelPlan/provinces">
                <Provinces />
            </Route>
            <Route path="/travelPlan/about">
                <About/>
            </Route>
            <Route path="/travelPlan/contact">
                <Contact/>
            </Route>
            <Route path="/travelPlan/signin" >
                <SignIn/>
            </Route>
            <Route path="/travelPlan/signUp">
                <SignUp/>
            </Route>
            <Route path="/travelPlan/toprated">
                <TopRatedPlans/>
            </Route>
            <Route path="/travelPlan/myAccount">
                <MyAccount/>
            </Route>
            <Route path="/travelplan/review">
                <PlanReview/>
            </Route>
            <Route path="/travelPlan/viewMyTravelPlan">
                <ViewMyTravelPlan/>
            </Route>
            <Route path="/travelPlan/myplans" >
                <MyPlans/>
            </Route>
            <Route path="/travelPlan/addMorePlaces/:day">
                <AddMorePlaces/>
            </Route>
            <Route path="/travelPlan/editPlan" >
                <EditPlan/>
            </Route>
            <Route path="/travelPlan/nearbyhotels" >
                <NearByHotels/>
            </Route>
            <Route path="/travelPlan/viewpoi/:place_id" >
                <ViewPois/>
            </Route>
             <Route path="/travelPlan/userPreferences">
                <UserPreferences/>
            </Route>
            <Route path="/travelPlan/travelPlan">
                <TravelPlan/>
            </Route>
            <Route path="/travelPlan">
                <Home />
            </Route>
        </Switch>
        </Box>
        <Footer2/>
      
        </>
    )
}

export const TravelPlanRoutes=()=>{
    return(
        <>
             <TravelProvider>
               <TravelPlanApp/>
            </TravelProvider>
        </>
    )
}