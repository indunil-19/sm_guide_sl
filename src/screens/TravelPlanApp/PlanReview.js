import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout"
import { AiOutlineStar } from "react-icons/ai";
import { StarIcon } from "@chakra-ui/icons";
import { useState,useContext,useEffect,useRef } from "react";
import { Input,Textarea,Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, } from "@chakra-ui/react"
import { TravelContext } from "../../context/TravelContext"
import { FaRegShareSquare } from "react-icons/fa";
import { useToast } from "@chakra-ui/toast";

export const PlanReview=()=>{
    const [rate,setRate]=useState(0)
    const [edit,setEdit]=useState(false)
    const [review, setReview]=useState("")
    const {state, dispatch}=useContext(TravelContext)

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
    const toast=useToast()

    useEffect(() => {
        fetch('/user/getReview',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                planId:state.planId
            })   
            }).then(res=>res.json()).
            then(result=>{

              if(result.data.review || result.data.rate){
                setRate(result.data.rate)
                setReview(result.data.review)
                setEdit(false)
                return
              }
              setEdit(true)
               
            })
            .catch((e)=>{
                console.log(e)
            })
    }, [])

    const submitReview=()=>{
        fetch('/user/addReview',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                rate:rate,
                review:review,
                planId:state.planId
                })
            }).then(res=>res.json()).
            then(result=>{
              if(result.data.review || result.data.rate){
                setRate(result.data.rate)
                setReview(result.data.review)
                setEdit(false)
              }
               
            })
            .catch((e)=>{
                console.log(e)
            })
        
     }
     const sharePlan=()=>{
        fetch('/user/sharePlan',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                planId:state.planId
                })
            }).then(res=>res.json()).
            then(result=>{
                setIsOpen(false)
               if(result.result){
                    toast({
                        description: "your plan is shared, thank you",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    })
               }
               else{
                    toast({
                        description: "you can't share this",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    })
               }
              
               
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
                    Share your Travel Plan with us
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={()=>{
                        sharePlan()
                    }} ml={3}>
                        share
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        
            s
        
        <Flex flexDirection="column" justifyContent="center" alignItems="center" p={10}>
             <HStack spacing={5}>
                <Flex minWidth="md" boxShadow="dark-lg" borderRadius="lg" flexDirection="column" p={5} alignItems="center">
                    <VStack  minWidth="md">
                    <Heading size="xl" p={5}>
                        How do you feel about your travel plan????
                    </Heading>
                    <HStack p={4}>
                    <StarIcon color={rate>=1 ? "teal" : "gray.200"} onClick={()=>{
                        if(edit){
                            setRate(1)
                        }
                        
                    }}  />
                    <StarIcon color={rate>=2 ? "teal" : "gray.200"} onClick={()=>{
                        if(edit){
                            setRate(2)
                        }
                    }} />
                    <StarIcon color={rate>=3 ? "teal" : "gray.200"} onClick={()=>{
                        if(edit){
                            setRate(3)
                        }
                    }} />
                    <StarIcon color={rate>=4 ? "teal" : "gray.200"} onClick={()=>{
                        if(edit){
                            setRate(4)
                        }
                    }} />
                    <StarIcon color={rate>=5 ? "teal" : "gray.200"} onClick={()=>{
                        if(edit){
                            setRate(5)
                        }
                    }} />
                    </HStack>

                    <Textarea value={review}
                            onChange={(e)=>setReview(e.target.value)}
                        placeholder="Describe your expereince"
                        size="lg"
                        isDisabled={!edit}
                    />

                    {edit ? <Button colorScheme="blue" onClick={()=>{
                            submitReview()
                    }}>submit</Button> : 
                                <Button colorScheme="blue" onClick={()=>{
                                    setEdit(true)
                            }}>Edit</Button>
                    
                    }
                    </VStack>
                </Flex>
                {
                    rate ? <FaRegShareSquare  onClick={()=>{
                        setIsOpen(true)
                }}/> : <></>
                }
                </HStack>
        </Flex>
        
        </>
    )
}