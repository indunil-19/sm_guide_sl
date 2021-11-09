import { useState, useRef, useEffect } from "react";
import { Flex, HStack, VStack } from "@chakra-ui/layout"
import {Alert,AlertIcon, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,} from "@chakra-ui/react"
import { AiOutlineDelete } from "react-icons/ai";
import { useHistory } from "react-router"
import { PlanCard } from "../../components/TravelPlanApp/planCard,";
 

export const MyPlans=()=>{
    const [plans,setPlans]=useState([])
    const history=useHistory()
    const [pid,setPID]=useState("")

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
    
   

    useEffect(()=>{

        fetch('/user/getTravelPlans').then(res=>res.json())
        .then(data=>{
            console.log(data)
            setPlans(data.myPlans)
        })

     },[])

     const deleteAleart=(planId)=>{
            console.log(planId)
            setIsOpen(true)
            setPID(planId)
     }
     const deletePlan=()=>{
        fetch('/user/deleteTravelPlan',{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                planId:pid})
            }).then(res=>res.json()).
            then(result=>{
                if(result.data){
                    setIsOpen(false)
                    const newPlans=plans.filter(plan=>{
                        return plan._id !=result.data._id                            
                    })
                    setPlans(newPlans)
                }
                
                console.log(result)
            })
            .catch((e)=>{
                console.log(e)
            })
        
     }

    return(
        <>
         <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Travel Plan
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={()=>{
                        deletePlan();
                    }} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        
            <>
            
            {plans && plans.map((plan,index)=>{
                    return(
                        <>
                         <Flex flexDirection="column" alignItems="center" p={3}>
                            <HStack>

                            <Button colorScheme="red" onClick={()=>{
                                deleteAleart(plan._id)
                                
                            }}><AiOutlineDelete /></Button>
                        
                            <PlanCard _id={plan._id} name={plan.name ? plan.name : `My plan ${index+1}`} days={plan.travelPlan[0].length} createdDate={plan.createdAt} travelPlan={plan.travelPlan} startLocation={plan.start_location} startLocationName={plan.start_location_name}   />

                            </HStack>
                         </Flex>
                        </>
                    )
            })}

            {plans.length==0 ?<>
            
                <Alert status="warning" m={5}>
                    <AlertIcon />
                    Seems you don't have saved plans
                </Alert>
            
            </>:<></>}
            
            
            </>


        </>
    )
}


