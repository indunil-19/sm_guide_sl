import {  Flex, HStack, Text, Box, Link  } from "@chakra-ui/layout"
import React from "react"
import { Tag , TagLabel,} from "@chakra-ui/tag";
import { Avatar } from "@chakra-ui/avatar";
import { StarIcon } from "@chakra-ui/icons"

export const Review=({author_name, author_url,profile_photo_url,relative_time_description,text,rating})=>{
    return(
        <Flex borderWidth="1px" borderRadius="lg" alignItems="start" flexDirection="column" p={5} m={5}>
                    <Link href={author_url} isExternal>
                    <Tag size="lg" colorScheme="red" borderRadius="full">
                    <Avatar
                        src={profile_photo_url}
                        size="xs"
                        name="Segun Adebayo"
                        ml={-1}
                        mr={2}
                    />
                    <TagLabel>{author_name}</TagLabel>
                    </Tag>
                    </Link>

                    <Tag m={2}>{relative_time_description}</Tag>

                    <HStack m={2}>
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <Box>rating {rating}</Box>
                                        
                    </HStack>
                    <Text fontSize="sm">{text}</Text>
            </Flex>
    )
}
