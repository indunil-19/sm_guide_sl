import React , {useEffect,useState}from "react"
import { useHistory } from "react-router"
import { Box, Flex ,HStack, VStack} from "@chakra-ui/layout"
import { Image,Button,Badge, Avatar , } from "@chakra-ui/react"

import { StarIcon } from "@chakra-ui/icons"


export const PlaceCard=({photo,index,name,address, types=[], rating, place_id})=>{
    const [link,setLink]=useState("")
    const history=useHistory()
    useEffect(() => {
        
      
        setLink(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA`)
    }, [photo])
    return(
        <Flex flexDirection="row" margin={5} borderWidth="1px" borderRadius="lg" p={5} >
                           <Image src={link}  width="400px" height="300px" objectFit="cover" borderRadius="lg"  />
                           <VStack spacing={3.5} alignItems="start" p={5}>
                                 <Avatar name={index.toString()}  />
                                 <Box lineHeight="tall" fontWeight="semibold" as="h4"> {name}</Box>
                                 <Box color="gray.600" fontSize="sm">{address}</Box>
                                <HStack>
                                        <>    {types.map((item)=>{
                                                return(
                                                    <Badge borderRadius="full" px="2" colorScheme="teal">{item}</Badge>
                                                )
                                            })}
                                        </> 
                                         
                                </HStack>

                                <HStack>
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <Box>rating {rating}</Box>
                                        
                                </HStack>
                                        <Button colorScheme="teal" variant="outline" onClick={()=>{
                                            history.push('/admin/viewpoi/'+place_id)
                                        }}>
                                            See more...
                                        </Button>

                           </VStack>

        </Flex>
    )
}