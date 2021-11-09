import {  useContext } from "react";
import { Flex, HStack, VStack } from "@chakra-ui/layout"
import { Text, Image, Heading , Button} from "@chakra-ui/react"
import { TravelContext } from "../../context/TravelContext";
import { useHistory } from "react-router"

export const PlanCardHome=({_id="",name,days,createdDate, travelPlan,startLocation,startLocationName})=>{
    const {state, dispatch}=useContext(TravelContext)
    const history=useHistory()

    return(
       
                    <Flex margin={5} borderWidth="1px" borderRadius="lg" p={5} maxWidth="container.md" >
                       <HStack>
                       <Image src={"https://images.unsplash.com/photo-1632429619634-3d97fc1693e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"}  width="400px" height="300px" objectFit="cover" borderRadius="lg"  /> 
                       <VStack p={3} alignItems="start" spacing={5}>
                                <HStack>
                                <Heading as="h3" size="lg">
                                    {name}
                                </Heading>                                 
                                        
                                </HStack>

                                <Heading as="h5" size="sm">
                                    {days} days
                                </Heading>

                                <Button colorScheme="teal" variant="outline" onClick={()=>{
                                        dispatch({type:"set_travelPlan" , payload:{travelPlan:travelPlan}})
                                        dispatch({type:"set_planId" , payload:{planId:_id}})
                                        dispatch({type:"USER_PREFERENCES",payload:{userPreferences:{
                                            startLocation:startLocation,
                                            startLocationName:startLocationName
                                        }}}) ;
                                        history.push("/travelPlan/viewMyTravelPlan")

                                }}>
                                    View Plan
                                </Button>

                                <Text fontSize="sm">created : {createdDate}</Text>
                       </VStack>
                       </HStack>

                    </Flex>
                    
    )
}

