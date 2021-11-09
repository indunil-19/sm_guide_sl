import { TravelPlan } from "./TravelPlan"
import { Button } from "@chakra-ui/button"
import { VStack } from "@chakra-ui/layout"
import { AiFillStar } from "react-icons/ai";
import { useHistory } from "react-router"


export  const ViewMyTravelPlan=()=>{
    const history=useHistory()

    return(
        <>
       <TravelPlan />
        <VStack position="fixed" bottom="105px" right="0" p={3} >

                <Button colorScheme="pink" size="lg" borderRadius="100%" onClick={()=>{
                    history.push('/travelPlan/review')
                }}>
                    <AiFillStar />                 
                </Button>
        </VStack>
        </>
    )
}