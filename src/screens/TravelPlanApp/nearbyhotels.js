import React, { useEffect,useState , useContext} from "react"
import { getNearByHotels} from "../../services/ViewPOIServices"
import { TravelContext } from "../../context/TravelContext"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { Flex } from "@chakra-ui/layout"
import { Config } from "../../config/config"
import { useHistory } from "react-router"

export const NearByHotels=()=>{
    const [data,setData]=useState([])
    const {state, dispatch}=useContext(TravelContext)
    const history=useHistory()
    
    useEffect(()=>{
        if(!state.travelPlan){
            history.push("/travelPlan/travelPlan")
        }
    },[])

    useEffect( ()=>{
            getNearByHotels(state.accomodation_location).
            then((r)=>{
                setData(r)
                // console.log(r)   
            }); 
            
        },[state.accomodation_location] )

  
    return(
        <>
        <Flex flexDirection="column" alignItems="center" p={5}>
        
        { 
         data.map((Item, index)=>{
            return(
                <>
                
                <PlaceCard  index={index+1} name={Item.name} address={Item.vicinity} photo={Item.photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${Item.photos[0].photo_reference}&key=${Config.apiKey}` : Item.photos[0]?  Item.photos[0].url:"" } rating={Item.rating} place_id={Item.place_id}/>
                
                </>
            )
        })
    }
        
        </Flex>
        </>
    )
}





