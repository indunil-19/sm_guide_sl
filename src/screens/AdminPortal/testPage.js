import { Flex } from '@chakra-ui/layout';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import {useState} from "react";


export const Map=(props)=>{
  const [open,setOpen]=useState(false);
    return(
        <>

    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 7.291418, lng:80.636696}}
      // defaultOptions={{ styles: mapStyles }}
    >
    <Marker position={{ lat: 7.291418, lng:80.636696}} label="1" onClick={()=>{setOpen(true)}}/>
    <Marker position={{ lat: 6.291418, lng:80.636696}} label="2" />



    {
      open && <InfoWindow
      onCloseClick={()=>setOpen(false)}
        
      position={
        { lat: 7.291418, lng:80.636696}
      }
    >
      <Flex>
        sdjhfh
      </Flex>
    </InfoWindow>
    }


    </GoogleMap>
        
        </>
    )
}

const MapWrapped = withScriptjs(withGoogleMap(Map));


export  function TestPage() {
    return (
        <Flex width="80%" height="100vh" flexDirection="column" mx="auto" my="2" boxShadow="dark-lg">
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Flex>
    );
  }