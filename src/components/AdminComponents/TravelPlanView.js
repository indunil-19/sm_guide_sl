import React , {useContext,useEffect,useState, useRef}from "react"
import { useHistory } from "react-router"
import { Box, Flex ,HStack,Stack, VStack} from "@chakra-ui/layout"
import { Image,Heading,Button,Text,Badge, Avatar , Skeleton ,Divider,AlertDialog, AlertDialogBody, AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,Tabs, TabList, TabPanels, Tab, TabPanel,useToast} from "@chakra-ui/react"
import {IoLocationSharp} from "react-icons/io5"
import {MdDriveEta} from "react-icons/md"
import { PlaceCard } from "../../components/AdminComponents/placeCard"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,Polyline } from "react-google-maps"
import { AdminContext } from "../../context/AdminContext"
import NavBar from "../navbar"



export const TravelPlan=()=>{
    const history=useHistory()
    const {state, dispatch}=useContext(AdminContext)
    const [plan,setPlan]=useState([[], []])
    useEffect( ()=>{ 

            setPlan(state.travelPlan)
            
      
 } ,[state] )
    var i=0;
    var accomodation=""


   

    return(
        <>
              
     
         <Tabs variant="soft-rounded" colorScheme="teal">
         <Flex alignItems="center" flexDirection="column" boxShadow="lg">
             <Image src="https://www.thexpressng.com/wp-content/uploads/2019/03/SriLanka_Slider.jpg" alt="Segun Adebayo"  height="400px" width="100%" objectFit="cover"/>
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

        <Flex flexDirection="column" alignItems="center">
        

            <HStack> 
                   <IoLocationSharp/> <Badge size="15">9.00 a.m</Badge> <Text fontSize="3xl">Start from colombo</Text>                  
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

                                <Card name={subItem.name} photo={subItem.photos[0].photo_reference} address={subItem.formatted_address} rating={subItem.rating} index={i} distance={plan[1][i-1].distance.text} duration={plan[1][i-1].duration.text}  place_id={subItem.place_id}/>
                                </>
                                )
                            })
                        }
                           {/* <Button colorScheme="teal" variant="solid" m={15} width="50%" onClick={()=>{
                                            dispatch({type:"accomodation_location", payload:{
                                                accomodation_location:accomodation
                                            }})
                                            history.push('/travelPlan/nearbyhotels')
                                        }}>
                                Find Accomodations
                           </Button> */}
                           <Divider orientation="horizontal" mb={2} />
                        </>
                        
                        
                    )
                    })}             
             </>
                 


            <HStack> 
                   <IoLocationSharp/> <Badge size="15">6.00 p.m</Badge> <Text fontSize="3xl">End - colombo</Text>                  
            </HStack>


            



        </Flex>

        </TabPanel>



        <TabPanel>

           <Route />
        </TabPanel>


       


        </TabPanels>
        </Tabs>

   
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
const Map=()=>{
    const {state,dispatch}=useContext(AdminContext)
    const [plan,setPlan]=useState([[[]],[]])
    useEffect(()=>{
        setPlan(state.travelPlan)
    },[state.travelPlan])
    const [open,setOpen]=useState(false);

    var i=0;
    const path=[{lat:6.927079,lng:79.857750}]
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
        <Marker position={{lat:6.927079,lng:79.857750}} label={"start"} />
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
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        </Flex>    
        </>
    )
}
