import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Flex,
    Heading,
    Button
  } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ViewIcon } from "@chakra-ui/icons"
export const Provinces=()=>{
    return(
        <>
        <>
                <Flex p={6} backgroundColor="white" boxShadow="xl" flexDirection="column" alignItems="center">
                <Heading fontStyle="oblique" mb={4}>Sri Lanka's Provonces</Heading>

                <Table variant="simple" p={[10,null,10,null]}>
  <TableCaption>Imperial to metric conversion factors</TableCaption>
  <Thead>
    <Tr>
      <Th></Th>
      <Th>Name</Th>
      <Th isNumeric>View</Th>
    </Tr>
  </Thead>
  <Tbody>
        <TableRow index="1" name="Northern Province" province_id="p1"/>
        <TableRow index="2" name="North Western Province" province_id="p2"/>
        <TableRow index="3" name="Western Province" province_id="p3"/>
        <TableRow index="4" name="North Central Province" province_id="p4"/>
        <TableRow index="5" name="Central Province" province_id="p5"/>
        <TableRow index="6" name="Sabaragamuwa Province" province_id="p6"/>
        <TableRow index="7" name="Eastern Province" province_id="p7"/>
        <TableRow index="8" name="Uva Province" province_id="p8"/>
        <TableRow index="9" name="Southern Province" province_id="p9"/>

  </Tbody>
  
</Table>
                </Flex>
        </>
        </>
    )
}

const TableRow=({index, name, province_id})=>{
    return(
        <Tr>
        <Td>{index}</Td>
        <Td>{name}</Td>
        <Td isNumeric><Button colorScheme="teal" size="xs"><Link to={`/admin/viewProvinces/${province_id}`}><ViewIcon /></Link></Button></Td>
      </Tr>
    )
}