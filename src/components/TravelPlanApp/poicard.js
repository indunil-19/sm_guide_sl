import { Divider, Flex, HStack, Text, VStack,  } from "@chakra-ui/layout"
import React from "react"
import { Heading } from "@chakra-ui/layout";
import { IoLocation } from "react-icons/io5";
import { Tag } from "@chakra-ui/tag";
import { Carousal } from "../../components/TravelPlanApp/carousal"
import { Review } from "../../components/TravelPlanApp/review"
import { Link } from "react-router-dom";


export const PoiCard=({data={}})=>{
    console.log(data)
    return(
        <Flex   flexDirection="column" alignItems="center" width="70%" marginX="auto" boxShadow="dark-lg" padding={4} marginTop={2}>            
            

            <HStack><IoLocation/>
            <Heading padding={5}>{data.name}</Heading>
            </HStack>

            <Carousal photos={data.photos} />


            <HStack spacing={6}  p={2}> 
                {(data.types)  && data.types.map((type)=>{
                    return(
                        <Tag  variant="solid" colorScheme="teal">
                            {type}
                        </Tag>
                    )
                })}
            </HStack>

            

            <Text fontSize="md">{data.formatted_address}</Text>
            
         
            <VStack alignItems="start"  width="100%" p={5}>
                <HStack><Text>open now : { data.opening_hours? data.opening_hours.open_now? "Open" :"Close" : ""}</Text></HStack>

                {data.opening_hours && data.opening_hours.weekday_text.map(item=>{
                   return(
                    
                          <Text>{item}</Text>
                     
                   )
                })}

                <Text >website : <a target="_blank" href={data.website}>{data.website}</a></Text>
            </VStack>



            <Divider  padding="5" />
            
            <Text fontSize="3xl">User reviews</Text>
            
            <Flex flexDirection="column">
            {(data.reviews) && data.reviews.map((review)=>{
                return(
                    <Review  author_name={review.author_name} profile_photo_url={review.profile_photo_url} relative_time_description={review.relative_time_description} text={review.text} rating={review.rating} author_url={review.author_url}/>
                )
            })}
            
            
            </Flex>
                       
        </Flex>
    )
}
