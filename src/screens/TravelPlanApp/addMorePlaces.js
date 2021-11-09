import { useContext, useState, useEffect } from "react"
import { findPois, addPoiToPlan } from "../../services/EditPlanServices"
import { useParams } from 'react-router'
import { TravelContext } from "../../context/TravelContext"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { Flex, HStack ,VStack} from "@chakra-ui/layout"
import { GrAddCircle } from "react-icons/gr";
import { Button } from "@chakra-ui/button"
import { useHistory } from "react-router"
import { Tabs, TabList, TabPanels, Tab, TabPanel,Alert,Spinner,Input, InputGroup, InputLeftAddon,Textarea ,InputRightAddon} from "@chakra-ui/react"
import { AlertIcon } from "@chakra-ui/alert"
import Autocomplete from "react-google-autocomplete";
import { Config } from "../../config/config"
import { timeSlots } from "../../services/times"

export const AddMorePlaces=()=>{
    const history=useHistory()
    const {day}=useParams()
    const [pois,setPois]=useState([])
    const [route,setRoute]=useState([])
    const {state, dispatch}=useContext(TravelContext)
    const [place1,setPlace1]=useState({})
    

    const [poisCustom,setPoisCustom]=useState([])
    const [routeCustom,setRouteCustom]=useState([])

    const [poisCustom1,setPoisCustom1]=useState([])
    const [routeCustom1,setRouteCustom1]=useState([])

    const [hours,setHours]=useState("1")
    const [minutes,setMinutes]=useState("00")

    useEffect(()=>{
        if(!state.travelPlan){
            history.push("/travelPlan/travelPlan")
        }
    },[])

    useEffect(() => {
        if(state.custom_poi){ setPoisCustom(state.custom_poi[0]) ; setRouteCustom(state.custom_poi[1]) }
        else {setPoisCustom([]); setRouteCustom([]) }
    }, [])


    useEffect(() => {
        findPois(day, state.editTravelPlan, state.allpois,state.userPreferences.startLocation).then((res)=>{
            console.log(res)
            setPois(res[0])
            setRoute(res[1])
        })
    }, [state])


    const addPoi=(day,poi, route)=>{
            addPoiToPlan(day,poi, route,state.editTravelPlan).then((res)=>{
                // console.log(res)
                dispatch({type:"set_editTravelPlan" , payload:{editTravelPlan:res}})
                dispatch({type:"custom_poi", payload:{custom_poi:""}})
            })
    }

    return(
        <>
        <Tabs isFitted variant="line"  >
        <TabList  position="fixed" width="full" zIndex="8" bg="white" p={2} >
            <Tab >Place sugests for you</Tab>
            <Tab>Find by your self</Tab>
            <Tab>Add custom event</Tab>
        </TabList>


        <TabPanels >


        <TabPanel>
        <Flex flexDirection="column" alignItems="center" width="100%" p={2} mt="6">
        {
            pois.length==0 ? 
            <>
                <Alert status="warning" mt="100px">
                    <AlertIcon />
                    Seems there is no pois for suggests. 
                </Alert>
            
            </> :<></>
        }
        
        { 
         pois.map((Item, index)=>{
            return(
                <>
                <HStack m={3}>

                <Button colorScheme="black" variant="outline" onClick={()=>{
                                addPoi(day,Item, route[index]);
                                history.push("/travelPlan/editPlan")

                 }}>
                     <GrAddCircle />           
                </Button>



                <PlaceCard  index={index+1} name={Item.name} address={Item.vicinity?Item.vicinity : Item.formatted_address  } photo={Item.photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${Item.photos[0].photo_reference}&key=${Config.apiKey}` : Item.photos[0].url} rating={Item.rating} place_id={Item.place_id}/>
                </HStack>
                </>
            )
        })

    }



        
        
        </Flex>
        </TabPanel>


        <TabPanel>


        <Flex flexDirection="column" alignItems="center" p={10}>
                <Autocomplete style={{width:"40%" ,height:"30px", padding:"5px", margin:"15px",background:"grey", borderRadius:"5px", color:"white"}}
                apiKey={Config.apiKey}

                onPlaceSelected={(place) => {
                if(place.geometry.location){
                    setPoisCustom([])
                    setRouteCustom([])
                    let location={lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}
                    place.geometry.location=location;
                    place.photos[0].url=place.photos[0].getUrl()

                    var vt=0;
                    for(let i=0;i<place.types.length; i++){
                       let time=timeSlots[place.types[i]]
                       if(Number.isInteger(time)) vt=Math.max(vt,time)
                       
                    }
                    place.time=vt

                    setPlace1(place)
                    document.getElementById("notifier").style.display="none"
                    document.getElementById("spinner").style.display="block"
                    findPois(day, state.editTravelPlan, [place], state.userPreferences.startLocation).then((res)=>{
                        // console.log(res)
                        document.getElementById("spinner").style.display="none"
                        setPoisCustom(res[0])
                        setRouteCustom(res[1])
                        if(res[0].length==0){
                            document.getElementById("notifier").style.display="block"
                        }
                        dispatch({type:"custom_poi", payload:{custom_poi:[res[0],res[1]]}})
                    })
                }
                }}

                options={{
                    types: ['geocode' , 'establishment'],
                    componentRestrictions: { country: "LK" },
                    fields:["ALL"]
                }}
                >
                </Autocomplete>


                <Spinner size="xl" id="spinner" display="none" />
                <Alert status="warning" id="notifier" display="none" >
                    <AlertIcon />
                       It seems you can't go there from your last location within that day...
                </Alert>

                { 
                    poisCustom.map((Item, index)=>{
                        return(
                            <>
                            <HStack m={3}>

                            <Button colorScheme="black" variant="outline" onClick={()=>{
                                            addPoi(day,Item, routeCustom[index]);
                                            history.push("/travelPlan/editPlan")

                            }}>
                                <GrAddCircle />           
                            </Button>



                            <PlaceCard  index={index+1} name={Item.name} address={Item.vicinity?Item.vicinity : Item.formatted_address  } photo={Item.photos[0].url } rating={Item.rating} place_id={Item.place_id}/>
                            </HStack>
                            </>
                        )
                    })

                }




        </Flex>






        </TabPanel>

        <TabPanel>
                <Flex flexDirection="column" alignItems="center" p={10} >

                         <HStack justifyContent="space-around" id="time" width="60%" m={3}>

                        <InputGroup >
                        <InputLeftAddon children="Expected visiting time" />
                                <Input type="text"   onChange={(e)=>setHours(e.target.value) }  value={hours} />
                        <InputRightAddon children="hours" />
                        </InputGroup>

                        <InputGroup >
                                <Input type="text"   onChange={(e)=>setMinutes(e.target.value) }  value={minutes} />
                        <InputRightAddon children="minutes" />
                        </InputGroup>

                        </HStack>


                        <Autocomplete style={{width:"40%" ,height:"30px", padding:"5px", margin:"15px",background:"grey", borderRadius:"5px", color:"white"}}
                        apiKey={Config.apiKey}

                        onPlaceSelected={(place) => {
                            console.log(place)
                        if(place.geometry.location){
                            setPoisCustom1([])
                            setRouteCustom1([])
                            let location={lat:place.geometry.location.lat(),lng:place.geometry.location.lng()}
                            place.geometry.location=location;


                            let h=parseFloat(hours)
                            let m=parseFloat(minutes)
                            console.log(hours,minutes)

                            // if(isNaN(h) || isNaN(m)){
                            //     document.getElementById("notifier1").style.display="block"
                            //     return;
                            // }
                            // if(h>=9 || h<0 || m>=60 || m<0 ){
                            //     document.getElementById("notifier1").style.display="block"
                            //     return;
                            // }
                            let time=h*3600 + m*60
                            place.time=time;
                            place.photos=[{
                                url:"https://uploads-ssl.webflow.com/576fd5a8f192527e50a4b918/605b5fb7ff14b82bc8d41e28_Sri%20Lanka%20travel%20guide%20(1).jpg"
                            }]
                            place.name=""
                            place.custom=true
                            setPlace1(place)
                            document.getElementById("notifier1").style.display="none"
                            document.getElementById("spinner1").style.display="block"
                            findPois(day, state.editTravelPlan, [place],state.userPreferences.startLocation).then((res)=>{
                                console.log(res)
                                document.getElementById("spinner1").style.display="none"
                                setPoisCustom1(res[0])
                                setRouteCustom1(res[1])
                                if(res[0].length==0){
                                    document.getElementById("notifier1").style.display="block"
                                }
                            })
                        }
                        }}

                        options={{
                            types: ['(cities)' ],
                            componentRestrictions: { country: "LK" },
                            fields:["ALL"]
                        }}
                        >
                        </Autocomplete>

                        

                        <Spinner size="xl" id="spinner1" display="none" />
                        <Alert status="warning" id="notifier1" display="none" >
                            <AlertIcon />
                            It seems you can't go there from your last location within that day...
                        </Alert>

                        { 
                            poisCustom1.map((Item, index)=>{
                                return(
                                    <>
                                    <HStack m={3}>

                                    <Button colorScheme="black" variant="outline" onClick={()=>{
                                                    if(poisCustom1[0].name){
                                                        addPoi(day,Item, routeCustom1[index]);
                                                        history.push("/travelPlan/editPlan")
                                                        return;
                                                    }
                                                    document.getElementById("name").style.borderColor="red"

                                                    

                                    }}>
                                        <GrAddCircle />           
                                    </Button>

                                        <VStack p={5} boxShadow="lg" m={5}> 
                                        <InputGroup m={5}>
                                        <InputLeftAddon children="Event Name" />
                                        <Input type="text" id="name"  onChange={(e)=>{poisCustom1[index].name=e.target.value}} />
                                        </InputGroup>

                                        
                                        <InputLeftAddon children="Event discription"   />
                                        <Textarea type="text"   onChange={(e)=>{poisCustom1[index].description=e.target.value}}/>
                                        
                                       </VStack>

                                    </HStack>
                                    </>
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