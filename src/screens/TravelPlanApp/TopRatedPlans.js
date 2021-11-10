import { Flex } from "@chakra-ui/layout"
import { useState,useEffect } from "react"
import { PlanCardHome } from "../../components/TravelPlanApp/planCardhome"
export const TopRatedPlans=()=>{
    const [plans,setPlans]=useState([])
    useEffect(()=>{
            fetch("/api/user/getPublicTravelPlans").then(res=>res.json())
            .then(result=>{
                console.log(result)
                setPlans(result.myPlans)
            })
    },[])
    return(
        <>
        

        <Flex flexDirection="column" width="80%" p={3} justifyContent="center" alignItems="center" mx="auto">  

                {plans && 
                    plans.map((plan , index)=>{
                        return(
                            <>
                                <Flex minWidth="md">
                                    <PlanCardHome  name={plan.name ? plan.name : `My plan ${index+1}`} days={plan.travelPlan[0].length} createdDate={plan.createdAt} travelPlan={plan.travelPlan}/>
                                 </Flex>
                            </>
                        )
                    })
                }
                
               
 
        </Flex>


        </>
    )
}