import {  Tabs, TabList, TabPanels, Tab, TabPanel, } from "@chakra-ui/react"
import React, { useEffect,useState } from "react"
import { useParams } from 'react-router'
import { getPoiData , getNearByPlaces} from "../../services/ViewPOIServices"
import {NearByPlaceCard} from '../../components/TravelPlanApp/nearbyplace'
import { PoiCard } from "../../components/TravelPlanApp/poicard"
import { Flex } from "@chakra-ui/layout"

export const ViewPois=()=>{
    const [data,setData]=useState({})
    const {place_id}=useParams()
    const [location,setLocation]=useState({})
    const [nearByPlaces,setNearByPlaces]=useState([])
    // const [a,setA]=useState(false)

    

    useEffect( ()=>{
            getPoiData(place_id).then((r)=>{
                
                setData(r)
                setLocation(r.geometry.location)
                // console.log(r)
                
            }); 
            
        },[place_id] )

    useEffect(()=>{
        
        getNearByPlaces(location).then((r)=>{
            setNearByPlaces(r)
            // setA(true)
            console.log(r)
        })

    }, [location])
    return(
        <>

        {/* <Box width="full"  p="6" bg="white"  position="fixed" zIndex="8" height="70px">
        <HStack spacing="24px" justifyContent="center" alignItems="center"> 
                <Button colorScheme="red" variant="outline">
                    Button
                </Button>
                <Button colorScheme="red" variant="outline">
                    Button
                </Button>
        </HStack>
        </Box>
        <Box width="full" boxShadow="lg"  p="6" bg="white" height="70px">
        </Box>  */}
        <Tabs isFitted variant="line"  >
        <TabList  position="fixed" width="full" zIndex="8" bg="white" p={2} >
            <Tab >Place Details</Tab>
            <Tab>You may like</Tab>
        </TabList>


        <TabPanels >


            <TabPanel>
        
        

            <PoiCard data={data} />
         
        
          {/* <iframe src="https://github.com/googlemaps/google-maps-services-js/blob/master/e2e/places/details.test.ts" /> */}
         
          </TabPanel>


         <TabPanel >
             <Flex flexDirection="column" alignItems="start" width="100%" p={2}>
            { (nearByPlaces)  && nearByPlaces.map((nearByPlace,index)=>{
                return (
                    // <>{nearByPlace.name}</>
                    <NearByPlaceCard name={nearByPlace.name} photo={nearByPlace.photos ? nearByPlace.photos[0].photo_reference : "" } address={nearByPlace.vicinity} rating={nearByPlace.rating} index={index}  />
                )
            }) 
            
            
            }
            </Flex>
         </TabPanel>


        </TabPanels>

        </Tabs>
        
        
        
        </>
    )
}





