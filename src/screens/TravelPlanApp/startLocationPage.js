import { Flex, Box,Heading ,HStack} from "@chakra-ui/layout";
import { Button ,Text} from "@chakra-ui/react";
import Autocomplete from "react-google-autocomplete";
import { useHistory } from "react-router";
import { Config } from "../../config/config"
import { useContext,useState } from "react";
import { TravelContext } from "../../context/TravelContext";

const StartLocation=()=>{
    const history=useHistory()
    const [start_location,setStartLocation]=useState({lat:6.927079,lng:79.857750})
    const [start_location_name,setStartLocationName]=useState("colombo")
    const {state, dispatch}=useContext(TravelContext)
    return(
        <>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" m={5}>
        <Box maxW="60%" borderWidth="1px" borderRadius="lg" overflow="hidden" m="auto" padding="25" boxShadow="dark-lg">
                <Heading>Select location to start your trip</Heading>
                <Box pt={10} pb={10}>
                
                <Autocomplete style={{width:"40%" ,height:"30px", padding:"5px", margin:"15px",background:"grey", borderRadius:"5px", color:"white"}}
                        apiKey={Config.apiKey}

                        onPlaceSelected={(place) => {
                            console.log(place)
                        if(place.geometry.location){
                            let location={lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}
                           setStartLocation(location)
                           setStartLocationName(place.name)
                        }
                        }}

                        options={{
                            types: ['(cities)' ],
                            componentRestrictions: { country: "LK" },
                            fields:["ALL"]
                        }}
                        >
                        </Autocomplete>

                        <Text>your current starting location : {start_location_name}</Text>
                
                </Box>

                <HStack justifyContent="space-between">
                                            
                            <Button colorScheme="teal" variant="outline"  onClick={() => {

                            dispatch({type:"USER_PREFERENCES",payload:{userPreferences:{
                                startLocation:start_location,
                                startLocationName:start_location_name
                            }}}) ;
                            history.push("/travelPlan/customPlan")

                            }} >
                            Next
                            </Button>
                </HStack >

        </Box>
        </Flex>
        
        </>
    )
}

export default StartLocation;
