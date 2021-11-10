import { Select } from "@chakra-ui/select"
import { InputGroup } from "@chakra-ui/input"
import { Flex, HStack, Text } from "@chakra-ui/layout"
import { useEffect, useState,useRef } from "react"
import { BiSearch } from "react-icons/bi"
import { PlanCard } from "../../components/AdminComponents/planCard"
import { AiOutlineDelete } from "react-icons/ai"
import { MdPublic } from "react-icons/md"
import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,Alert} from "@chakra-ui/react"
import { AlertIcon } from "@chakra-ui/alert"
import { useHistory } from "react-router"


export const SharedPlan=()=>{
    const alert=useRef()
    useEffect(()=>{
            getSharedPlans()
    },[])
    const history=useHistory()

    const [rate,setRate]=useState("5")
    const [plans,setPlans]=useState([])
    const [pid,setPID]=useState("")

    // useEffect(()=>{
    //     getSharedPlans()
    // },[])
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const [isOpen1, setIsOpen1] = useState(false)
    const onClose1 = () => setIsOpen1(false)
    const cancelRef1 = useRef()


    const getSharedPlans=()=>{
        fetch('/api/admin/getsharedPlans',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(
                {
                    rate:rate,

                }
            )
        }).then(res=>res.json()).
        then(data=>{
            setPlans(data.myPlans)
            if(data.myPlans.length==0){
                alert.current.style.display="block"
                return
            }
            alert.current.style.display="none"
            console.log(data)
        }).catch(e=>{
            console.log(e)
        })
    }

    const deleteAleart=(planId)=>{
        console.log(planId)
        setIsOpen(true)
        setPID(planId)
    }
    const publicAleart=(planId)=>{
        console.log(planId)
        setIsOpen1(true)
        setPID(planId)
    }

    const deletePlan=()=>{
        fetch('/api/admin/deleteTravelPlan',{
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
    const publicPlan=()=>{
        fetch('/api/admin/setPublicPlan',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                planId:pid})
            }).then(res=>res.json()).
            then(result=>{
                if(result.data){
                    setIsOpen1(false)
                    history.push("/admin/publicPlans")     
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


        <AlertDialog
                isOpen={isOpen1}
                leastDestructiveRef={cancelRef1}
                onClose={onClose1}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    public Travel Plan
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef1} onClick={onClose1}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={()=>{
                        publicPlan();
                    }} ml={3}>
                        Public
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
        </AlertDialog>
        
        <Flex flexDirection="column" alignItems="center">
        <HStack width="full">
        <InputGroup>
            <Text>select rate</Text>
            <Select  onChange={(e)=>setRate(e.target.value)} value={rate}>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
            </Select>
            </InputGroup>
            <Button colorScheme="teal" size="xs" leftIcon={<BiSearch/>} p={4} onClick={()=>getSharedPlans()}>
                search
            </Button>
        </HStack>
        </Flex>



        <>
        {plans && plans.map((plan,index)=>{
                    return(
                        <>
                         <Flex flexDirection="column" alignItems="center" p={3}>
                            <HStack>

                            <Button colorScheme="red" onClick={()=>{
                                         deleteAleart(plan._id)
                            }}><AiOutlineDelete /></Button>



                            <Button colorScheme="blue" onClick={()=>{
                                        publicAleart(plan._id)
                            }}><MdPublic /></Button>
                        
                            <PlanCard _id={plan._id} name={plan.name ? plan.name : `My plan ${index+1}`} days={plan.travelPlan[0].length} createdDate={plan.createdAt} travelPlan={plan.travelPlan} />

                            </HStack>
                         </Flex>
                        </>
                    )
        })}

        <Flex display="none" ref={alert}> 
        <Alert status="warning" m={5} > 
            <AlertIcon />
            Seems there is no shred plans...
        </Alert>
        </Flex>

        </>















        
        
        </>
    )
}