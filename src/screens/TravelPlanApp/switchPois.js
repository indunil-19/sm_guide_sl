import { useContext, useState, useEffect } from "react"
import { switchPOI, addPoiToPlan1 } from "../../services/EditPlanServices"
import { useParams } from 'react-router'
import { TravelContext } from "../../context/TravelContext"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { Flex, HStack ,VStack} from "@chakra-ui/layout"
import { GrAddCircle } from "react-icons/gr";
import { Button } from "@chakra-ui/button"
import { useHistory } from "react-router"
import { Config } from "../../config/config"

export const SwitchPois=()=>{
    const {index,index1}=useParams()
    const history=useHistory()
    
    const [pois,setPois]=useState([])
    const [route,setRoute]=useState([])
    const {state, dispatch}=useContext(TravelContext)

    useEffect(()=>{
        if(!state.travelPlan){
            history.push("/travelPlan/travelPlan")
        }
    },[])


    useEffect(() => {
        
        switchPOI(parseInt(index), parseInt(index1), state.editTravelPlan, state.allpois, state.userPreferences.startLocation).then((res)=>{
            // console.log(res)
            setPois(res[0])
            setRoute(res[1])
        })
    }, [state])


    const addPoi=(poi, route)=>{
            addPoiToPlan1(index,index1,poi, route,state.editTravelPlan).then((res)=>{
                // console.log(res)
                dispatch({type:"set_travelPlan" , payload:{editTravelPlan:res}})
            });
    }

    return(
        <>
        <Flex flexDirection="column" alignItems="center" width="100%" p={2}>
        
        { 
         pois.map((Item, index)=>{
            return(
                <>
                <HStack m={3}>

                <Button colorScheme="black" variant="outline" onClick={()=>{
                                addPoi(Item, route[index]);
                                history.push("/travelPlan/editPlan")

                 }}>
                     <GrAddCircle />           
                </Button>



                <PlaceCard  index={index+1} name={Item.name} address={Item.vicinity ? Item.vicinity :Item.formatted_address} photo={Item.photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${Item.photos[0].photo_reference}&key=${Config.apiKey}` : Item.photos[0]?  Item.photos[0].url:"" } rating={Item.rating} place_id={Item.place_id}/>
                </HStack>
                </>
            )
        })
    }


        
        
        </Flex>
        </>
    )
}