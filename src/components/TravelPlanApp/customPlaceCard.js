import React , {useEffect,useState}from "react"
import { useHistory } from "react-router"
import { Box, Flex ,HStack, VStack} from "@chakra-ui/layout"
import { Image,Button,Badge, Avatar , } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"


export const CustomPlaceCard=({photo,index,name,address,description=""})=>{
    const [link,setLink]=useState("")
    const history=useHistory()
    useEffect(() => {
        
        
        setLink(photo)
    }, [photo])
    return(
        <Flex flexDirection="row" margin={5} borderWidth="1px" borderRadius="lg" p={5} width="100%">
                           <Image src={link}  width="400px" height="300px" objectFit="cover" borderRadius="lg"  />
                           <VStack spacing={3.5} alignItems="start" p={5}>
                                 <Avatar name={index.toString()}  />
                                 <Box lineHeight="tall" fontWeight="semibold" as="h4"> {name}</Box>                               
                                
                                 <Box color="gray.600" fontSize="sm">{description}</Box>

                                 <Box color="gray.600" fontSize="sm">{address}</Box>                                       
                                
                                        

                           </VStack>

        </Flex>
    )
}