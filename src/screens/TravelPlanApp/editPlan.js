import React , {useContext,useEffect,useState}from "react"
import { useHistory } from "react-router"
import { Box, Flex ,HStack, VStack} from "@chakra-ui/layout"
import { Button,Text,Badge ,Divider,useToast} from "@chakra-ui/react"
import {IoLocationSharp} from "react-icons/io5"
import {MdDriveEta} from "react-icons/md"
import { TravelContext } from "../../context/TravelContext"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { AiFillDelete , AiOutlineCheck} from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { DeletePOI , DeleteDay,AddDay} from "../../services/EditPlanServices"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Config } from "../../config/config"
import { CustomPlaceCard } from "../../components/TravelPlanApp/customPlaceCard"

export const EditPlan=()=>{
    const toast=useToast()
    const history=useHistory()
    const {state, dispatch}=useContext(TravelContext)
    const [plan,setPlan]=useState([[], []])


    useEffect(()=>{
        if(!state.travelPlan){
            history.push("/travelPlan/travelPlan")
        }
    },[])

    useEffect( ()=>{  
        // console.log(JSON.parse(localStorage.getItem("travelPlan")))
        setPlan(state.editTravelPlan)
        //  console.log(r[0][0][0].photos[0].photo_reference)
        // "wet",[],"2","buddhsism",[],["ancient", "natural", "parks"]
        // state.userPreferences.climate,state.userPreferences.provinces,state.userPreferences.days,state.userPreferences.religion,state.userPreferences.thingsLike,state.userPreferences.placesLike
    
    } ,[] )


    const deletePOI=(index,index1)=>{
        DeletePOI(index,index1,plan, state.userPreferences.startLocation).then((res)=>{
            dispatch({type:"set_editTravelPlan" , payload:{editTravelPlan:res}})
            setPlan(res)
            console.log(res)
        }).catch(e=>{
            console.log(e)
        })
    }

    const deleteDay=(day)=>{
        DeleteDay(day,plan).then((res)=>{
                console.log(res)
                dispatch({type:"set_editTravelPlan" , payload:{editTravelPlan:res}})
                setPlan(res)
            }).catch(e=>{
                console.log(e)
            })
    }
    const AddADay=()=>{
        AddDay(plan).then((res)=>{
            console.log(res)
            dispatch({type:"set_editTravelPlan" , payload:{editTravelPlan:res}})
            setPlan(res)
        }).catch(e=>{
            console.log(e)
        })
    }
    var i=0;
    var accomodation=""
    return(
        <>
       
        <Flex flexDirection="column" alignItems="center" width="100%">

            <HStack> 
                   <IoLocationSharp/> <Badge size="15">9.00 a.m</Badge> <Text fontSize="3xl">Start -{ state.userPreferences ? state.userPreferences.startLocationName : ""}</Text>                  
            </HStack>
         

            <>
                    { (plan[0]) &&
                    plan[0].map((Item=[], index)=>{
                    
                        return (
                        <>
                        {
                            index==0 ? <>
                            
                              <Box color="white" backgroundColor="black" padding={3} >Day {index+1}</Box>
                            </>:
                            <HStack>

                            <Box color="white" backgroundColor="black" padding={3} >Day {index+1}</Box>
                                    <Button colorScheme="red" variant="outline" onClick={()=>{
                                            deleteDay(index+1)
                                    }}>
                                    <IoMdCloseCircleOutline />
                                    </Button>
                            </HStack> 
                        } 
                           
                        {
                            Item.map( (subItem, index1,)=>{
                                i=i+1
                                accomodation=subItem.geometry.location
                                return(
                                <> 
                                 <HStack>
                                        <VStack>
                                            <Button leftIcon={<AiFillDelete />} colorScheme="teal" variant="solid" onClick={()=>{
                                                    deletePOI(index,index1)
                                            }}>
                                                Delete
                                            </Button>

                                            <Button leftIcon={<FaExchangeAlt />} colorScheme="teal" variant="solid" onClick={()=>{
                                                    history.push(`/travelPlan/switchpois/${index}/${index1}`)
                                            }}>
                                            change
                                            </Button>

                                        </VStack>
                                            <> 
                                            {subItem.custom ?
                                            <CustomCard name={subItem.name} photo={subItem.photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${subItem.photos[0].photo_reference}&key=${Config.apiKey}` : subItem.photos[0].url} address={subItem.formatted_address} index={i} distance={plan[1][i-1].distance.text} duration={plan[1][i-1].duration.text}  description={subItem.description} />
                                            :
                                            <Card name={subItem.name} photo={subItem.photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${subItem.photos[0].photo_reference}&key=${Config.apiKey}` : subItem.photos[0].url} address={subItem.formatted_address} rating={subItem.rating} index={i} distance={plan[1][i-1].distance.text} duration={plan[1][i-1].duration.text}  place_id={subItem.place_id}/>
                                            }
                                            </>
                         
                                </HStack>
                                </>
                                )
                            })
                        }   
                            
                            <Button colorScheme="red" variant="outline" m={15} width="50%" onClick={()=>{
                                            if(index!=0){
                                                if(plan[0][index-1].length==0){
                                                    toast({
                                                        title:"add places to previous days first",
                                                        duration:4000,
                                                        status:"error",
                                                        isClosable:true
                                                    })
                                                    return 
                                                }
                                            }
                                            history.push('/travelPlan/addMorePlaces/'+(index+1))
                                        }}>
                                Add more places
                           </Button>




                           <Button colorScheme="teal" variant="solid" m={15} width="50%" onClick={()=>{
                                                if(Item.length==0){
                                                        toast({
                                                            title:"add places before find accomodations",
                                                            duration:4000,
                                                            status:"error",
                                                            isClosable:true
                                                        })
                                                        return
                                                }
                                            dispatch({type:"accomodation_location", payload:{
                                                accomodation_location:accomodation
                                            }})
                                            history.push('/travelPlan/nearbyhotels')
                                        }}>
                                Find Accomodations
                           </Button>
                           <Divider orientation="horizontal" mb={2} />
                        </>
                        
                        
                    )
                    })}             
             </>
            
             <Button colorScheme="blackAlpha" variant="solid" m={15} width="50%" onClick={()=>{
                                                        AddADay();
                                        }}>

                            Add A Day
            </Button>
            

            <HStack> 
                   <IoLocationSharp/> <Badge size="15">6.00 p.m</Badge> <Text fontSize="3xl">End - {plan[1].length ? plan[1][plan[1].length-1].end_address : ""}</Text>                  
            </HStack>


        <VStack position="fixed" bottom="0" right="0" p={3} >
        <Button colorScheme="teal" size="lg" borderRadius="50%" onClick={()=>{
            dispatch({type:"set_travelPlan" , payload:{travelPlan:state.editTravelPlan}})
            history.push("/travelPlan/travelPlan")
        }}>
            <AiOutlineCheck/>
        </Button>

        </VStack>



        </Flex>





         
        </>
    )
}

const Card=({distance,duration,photo,index,name,address, types=[], rating, place_id})=>{


    return(
        <Flex flexDirection="column" alignItems="center" padding="10px">
                        <HStack  h="100px" p={4}>
                            <Divider orientation="vertical"   variant="dashed" />
                            <VStack>
                                <HStack>< MdDriveEta /> <Text fontSize="2xl">{distance} </Text> </HStack>
                                <Badge size="15">{duration}</Badge>
                            </VStack>

                        </HStack>
                        
                       
                        <PlaceCard  photo={photo} index={index} name={name} address={address} types={types} rating={rating} place_id={place_id}/>
                       
                        


            </Flex>
    )
}
const CustomCard=({distance,duration,photo,index,name,address,description})=>{

    return(
        <Flex flexDirection="column" alignItems="center" padding="10px">
                        <HStack  h="100px" p={4}>
                            <Divider orientation="vertical"   variant="dashed" />
                            <VStack>
                                <HStack>< MdDriveEta /> <Text fontSize="2xl">{distance} </Text> </HStack>
                                <Badge size="15">{duration}</Badge>
                            </VStack>

                        </HStack>
                        
                        <CustomPlaceCard  photo={photo} index={index} name={name} address={address} description={description}/>                     
        </Flex>
    )
}

  