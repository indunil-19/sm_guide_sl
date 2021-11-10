import React , {useContext,useEffect,useState, useRef}from "react"
import { useHistory } from "react-router"
import { Box, Flex ,HStack,Stack, VStack} from "@chakra-ui/layout"
import { Image,Heading,Button,Text,Badge, Avatar , Skeleton ,Divider,AlertDialog, AlertDialogBody, AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,Tabs, TabList, TabPanels, Tab, TabPanel,useToast,Spinner} from "@chakra-ui/react"
import {IoLocationSharp} from "react-icons/io5"
import {MdDriveEta} from "react-icons/md"
import { TravelContext } from "../../context/TravelContext"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { FiEdit, FiSave} from "react-icons/fi";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow,DirectionsRenderer,Polyline } from "react-google-maps"
import { Config } from "../../config/config"
import { CustomPlaceCard } from "../../components/TravelPlanApp/customPlaceCard"


export const TravelPlan=()=>{
    const toast=useToast()
    const history=useHistory()
    const {state, dispatch}=useContext(TravelContext)
    const [isloading,setLoading]=useState(false)
    const [plan,setPlan]=useState([[], []])
    
    useEffect( ()=>{ 

        if(state.travelPlan){
            setLoading(true)
            setPlan(state.travelPlan)
            console.log(state.travelPlan)
            
        }
        else{
        //  console.log("44")
        //  getTravelPlan("wet",[],"2","buddhsism",[],["ancient", "natural", "parks"]).then((r)=>{
        //  console.log(r[0])
        //  setPlan(r[0])
        //  setLoading(true)
        dispatch({type:"USER_PREFERENCES",payload:{userPreferences:{
            startLocation:{lat:6.927079,lng:79.857750},
            startLocationName:"colombo"
        }}}) ;
         dispatch({type:"set_travelPlan" , payload:{travelPlan:[[[]],[]]}})
         dispatch({type:"set_pois" , payload:{allpois:[]}})
         
         
        //  console.log(r[0][0][0].photos[0].photo_reference)
        // "wet",[],"2","buddhsism",[],["ancient", "natural", "parks"]
        // state.userPreferences.climate,state.userPreferences.provinces,state.userPreferences.days,state.userPreferences.religion,state.userPreferences.thingsLike,state.userPreferences.placesLike
  
    // })
}
 } ,[state] )
    var i=0;
    var accomodation=""


    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()


    const savePlan=()=>{
        fetch('/api/user/saveTravelPlan',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                travelPlan:state.travelPlan,
                start_location:state.userPreferences.startLocation,
                start_location_name:state.userPreferences.startLocationName
            })
        }).then(res=>res.json()).then((data)=>{
                if(data.error){
                    toast({
                        title: data.error,
                        position:"top-right",
                        status:"error",
                        duration: 4000,
                        isClosable: true,
                      })
                }
                else{
                    toast({
                        title: data.message,
                        position:"top-right",
                        status:"success",
                        duration: 4000,
                        isClosable: true,
                      })
                    history.push("/travelPlan/myplans")
                }
                
        }).catch((err)=>{
            console.log(err)
        })
    }

    const updatePlan=()=>{
        fetch('/api/user/updateTravelPlan',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                planId:state.planId,
                travelPlan:state.travelPlan,
                start_location:state.userPreferences.startLocation,
                start_location_name:state.userPreferences.startLocationName
            })
        }).then(res=>res.json()).then((data)=>{
                console.log(data)
                history.push("/travelPlan/myplans")
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
                <>
                
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {state.planId ? "update" : "save"} Travel Plan
                        </AlertDialogHeader>

                        <AlertDialogBody>
                        Do you want to {state.planId ? "update" : "save"}?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" onClick={onClose} ml={3} onClick={()=>{
                                if(state.planId){
                                    updatePlan();
                                }
                                else{
                                    savePlan();
                                }
                                        
                        }}>
                            save
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
                </>


         {/* {!isloading? 
                <Flex justifyContent="center" alignItems="center">
                <Spinner
                thickness="7px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                width="300px"
                height="300px"
                
                /> </Flex>: */}

         <Tabs variant="soft-rounded" colorScheme="teal">
         <Flex alignItems="center" flexDirection="column" boxShadow="lg">
             <Image src="https://www.thexpressng.com/wp-content/uploads/2019/03/SriLanka_Slider.jpg"   height="400px" width="100%" objectFit="cover"/>
             <Heading  marginTop="-350px" boxShadow="dark-lg" borderRadius="5px" padding="10px" marginBottom="300px">{plan[0].length} Day Trip in </Heading>
             <Stack direction="row" spacing={4} align="center">                    
                    <TabList m="5px">
                        <Tab>Travel Plan</Tab>
                        <Tab>Travel Route</Tab>
                    </TabList>
             </Stack>
        </Flex>

        <TabPanels>
        <TabPanel>

        <Flex flexDirection="column" alignItems="center" width="100%">
        

            <HStack> 
                   <IoLocationSharp/> <Badge size="15">9.00 a.m</Badge> <Text fontSize="3xl">Start -{ state.userPreferences ? state.userPreferences.startLocationName : ""}</Text>                  
            </HStack>
         

            <>
                    { (plan[0]) &&
                    plan[0].map((Item=[], index)=>{
                        
                        return (
                        <>
                           <Box color="white" backgroundColor="black" padding={3} >Day {index+1}</Box>
                        {
                            Item.map( (subItem, index,)=>{
                                i=i+1
                                accomodation=subItem.geometry.location
                                return(
                                <> 
                                {subItem.custom ?
                                <CustomCard name={subItem.name} photo={subItem.photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${subItem.photos[0].photo_reference}&key=${Config.apiKey}` : subItem.photos[0].url} address={subItem.formatted_address} index={i} distance={plan[1][i-1].distance.text} duration={plan[1][i-1].duration.text}  description={subItem.description} />
                                :
                                <Card name={subItem.name} photo={subItem.photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${subItem.photos[0].photo_reference}&key=${Config.apiKey}` : subItem.photos[0].url} address={subItem.formatted_address} rating={subItem.rating} index={i} distance={plan[1][i-1].distance.text} duration={plan[1][i-1].duration.text}  place_id={subItem.place_id}/>
                                }
                                </>
                                )
                            })
                        }
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
                 


            <HStack> 
                   <IoLocationSharp/> <Badge size="15">6.00 p.m</Badge> <Text fontSize="3xl">End - {plan[1].length ? plan[1][plan[1].length-1].end_address : ""}</Text>                  
            </HStack>


            



        </Flex>

        <VStack position="fixed" bottom="0" right="0" p={3} >
        <Button colorScheme="teal" size="lg" borderRadius="50%" onClick={async()=>{
            await localStorage.setItem("travelPlan",JSON.stringify(state.travelPlan))
            await dispatch({type:"set_editTravelPlan",payload:{editTravelPlan:JSON.parse(localStorage.getItem("travelPlan"))}})
            history.push("/travelPlan/editPlan")
        }}>
            <FiEdit/>
        </Button>

        <Button colorScheme="teal" size="lg" borderRadius="50%" onClick={()=>{
             setIsOpen(true)

        }}>
            <FiSave />
        </Button>
        </VStack>
        </TabPanel>



        <TabPanel>

           <Route />
        </TabPanel>
        </TabPanels>
        </Tabs>

        {/* } */}

         
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


const Map=()=>{
    const {state,dispatch}=useContext(TravelContext)
    const [plan,setPlan]=useState([[[]],[]])
    useEffect(()=>{
        setPlan(state.travelPlan)
    },[state.travelPlan])
    const [open,setOpen]=useState(false);

    var i=0;
    const path=[state.userPreferences.startLocation]
      return(
          <>
  
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 7.291418, lng:80.636696}}
      >
     {/* {plan?
     <DirectionsRenderer directions={ plan[1][1] } />
     :<> </>
    } */}
        <Marker position={state.userPreferences.startLocation} label={"start"} />
        {plan && plan[0].map((item=[],index)=>{
            return(
                <>
                    {item.map((subitem,index)=>{
                        i=i+1
                        path.push(subitem.geometry.location)
                        return(
                            <>
                            <Marker position={subitem.geometry.location} label={`${i}`} />
                            
                            </>
                        )
                    })}
                </>
            )
        })

        }

        <Polyline   path={path}/>

      
    
      </GoogleMap>
          
          </>
    )
}

const MapWrapped = withScriptjs(withGoogleMap(Map));


const Route=()=>{
    return(
        <>
        <Flex width="80%" height="100vh" flexDirection="column" mx="auto" my="2" boxShadow="dark-lg">
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Config.apiKey}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        </Flex>    
        </>
    )
}
