import { Config } from "../config/config";

const {Client} = require("@googlemaps/google-maps-services-js");

   
export const DeletePOI=async(index, index1, travelPlan=[[[],[]] ,[]],startLocation={lat:6.927079,lng:79.857750})=>{
  console.log(index,index1)
    const client = new Client({});
    var start_location={}
    var end_location={}
    var k=0
    var l=0
    for(var i=0; i<=index;i++){
      for (var j=0; j<travelPlan[0][i].length;j++){
        var k=k+1
        if(i==index && j==index1){
            l=k
        }
      }
    } 
    
    console.log(index,index1,travelPlan,l)
    var travelDays=travelPlan[0].length
    var plan=travelPlan[0]

    if(index>0){
      if(index1>0){
        console.log("1")
        start_location=plan[index][index1-1].geometry.location
        // travelPlan[0][index].pop(index1)
      }
      else if(index1==0){
        console.log("2")
        if(plan[index-1].length==0){
          start_location=startLocation
        }
        else{
          start_location=plan[index-1][plan[index-1].length-1].geometry.location
        }
        
        // travelPlan[0][index].pop(index1)
      }
      
    }
    else if(index==0){
      if(index1==0){
        start_location=startLocation
        // travelPlan[0][index].pop(index1)

      }
      else if(index1>0){
        console.log("4")
        start_location=plan[index][index1-1].geometry.location
        // travelPlan[0][index].pop(index1)
      }
      
    }


    if(index<travelDays-1){
      if(index1==plan[index].length-1){
        console.log("5")
        if(plan[index+1].length==0){
          travelPlan[0][index].splice(index1,1)
          travelPlan[1].pop(l-1)
          return travelPlan
        }
        end_location=plan[index+1][0].geometry.location
        travelPlan[0][index].splice(index1,1)
        
      }
      else if(index1<plan[index].length-1){
        console.log("6")
        end_location=plan[index][index1+1].geometry.location
        travelPlan[0][index].splice(index1,1)
        
      }
    }
    else if(index==travelDays-1){
       if(index1==plan[index].length-1){

        console.log("7")
        travelPlan[0][index].splice(index1,1)
          travelPlan[1].pop(l-1)
          return travelPlan
       }
       else if (index1<plan[index].length-1){
         console.log("8")
          end_location=plan[index][index1+1].geometry.location
          travelPlan[0][index].splice(index1,1)
        
       }
    }
    

    return client
      .directions({params:{
          origin:start_location,
          destination:end_location,
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          key: Config.apiKey,

        }})
        .then((response) => {
          const route = response.data.routes[0];
          console.log(route.legs[0])
          travelPlan[1].splice(l-1,1)
          travelPlan[1][l-1]=route.legs[0]
         
          return travelPlan
         

        })
         .catch((e) =>{ 
           console.log(e)
        });
}

export const DeleteDay=async(day, travelPlan)=>{
  // console.log(day)
  const client = new Client({});
  var start_location={}
  var end_location={}

  var remove_count=0

  var pivot=0
  for(let i=0;i<day-1;i++){
    pivot=pivot+travelPlan[0][i].length
  }
  

  var travelDays=travelPlan[0].length
  if(day==travelDays){
    remove_count=travelPlan[0][day-1].length
    travelPlan[0].splice(day-1,1)
    travelPlan[1].splice(pivot,remove_count)
    return travelPlan
  }

  if(day<travelDays){
    // console.log(travelPlan[0][day])
    if(travelPlan[0][day].length==0){
      travelPlan[0].splice(day-1,1)
      travelPlan[1].splice(pivot,remove_count)
      return travelPlan
    }
    start_location=travelPlan[0][day-2][travelPlan[0][day-2].length-1].geometry.location
    end_location=travelPlan[0][day][0].geometry.location
    remove_count=travelPlan[0][day-1].length
    travelPlan[0].splice(day-1,1)
    travelPlan[1].splice(pivot,remove_count)
  }
  return client
      .directions({params:{
          origin:start_location,
          destination:end_location,
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          key: Config.apiKey,

        }})
        .then((response) => {
          const route = response.data.routes[0];

          travelPlan[1][pivot]=route.legs[0]
         
          return travelPlan
         

        })
         .catch((e) =>{ 
           console.log(e)
        });
  return;
}


export const findPois=async(day,travelPlan,allpois, startLocation={lat:6.927079,lng:79.857750})=>{
    // console.log(day,travelPlan,allpois)
    const client = new Client({});
    const allpoisDays=travelPlan[0].length
    const num_pois_in_day=travelPlan[0][day-1].length
    var start_location={}
    var end_location={}
    if(num_pois_in_day==0){
      if(day==1){
        start_location=startLocation
      }
      else{
        start_location=travelPlan[0][day-2][travelPlan[0][day-2].length-1].geometry.location
      }
    }
    else{
       start_location=travelPlan[0][day-1][num_pois_in_day-1].geometry.location
    }

    
    var l=0
    for (let i=0; i<day-1;i++){
      l+=travelPlan[0][i].length
    }
    // console.log(travelPlan[1])

    var remaining_time=32400

    for(let i=0; i<travelPlan[0][day-1].length; i++){
          remaining_time-=travelPlan[1][l+i].duration.value+3600
          // remaining_time-=travelPlan[1][l+i].duration.value+travelPlan[0][day-1][i].time
    }
    remaining_time-=3600
    // console.log(remaining_time)


    var poisRoute=new Array()
    var pois=new Array()
    var poisRouteSuitable=new Array()
    
    for(var i=0; i<allpois.length;i++){
        const waypts = [];
        if(day<allpoisDays){
          if(travelPlan[0][day].length==0){
            end_location=allpois[i].geometry.location
          }
          else{
            end_location=travelPlan[0][day][0].geometry.location
          }
           waypts.push(allpois[i].geometry.location)
        }else{
          end_location=allpois[i].geometry.location
        }
      // console.log(end_location)
      client
      .directions({params:{
          
          origin:start_location,
          destination:end_location,
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
          waypoints:waypts,
          key: Config.apiKey,

        }
      })
        .then((response) => {
          const route = response.data.routes[0];
          const poisLegs=[]
          for (let i = 0; i < route.legs.length; i++) {
            poisLegs.push(route.legs[i])
          }
          // console.log(poisLegs)  
          poisRoute.push(poisLegs)
        })
         .catch((e) =>{ 
           console.log(e)
        })  
        await new Promise(r => setTimeout(r, 500)); 
      }
      await new Promise(r => setTimeout(r, 6000));
      
       for(let i=0; i<poisRoute.length;i++){
        if(Array.isArray(poisRoute[i])){
            var t=3600
            for(let j=0; j<poisRoute[i].length;j++){
                t+=poisRoute[i][j].duration.value
            }
            if(t<=remaining_time){
              // if(t<=remaining_time-allpois[i].time){
              pois.push(allpois[i])
              poisRouteSuitable.push(poisRoute[i])
            }
        }
        else{
          if(poisRoute[i].duration.value<=remaining_time){
            pois.push(allpois[i])
            poisRouteSuitable.push(poisRoute[i])
          }
        }
        
    }   
     return [pois,poisRouteSuitable]
    // return allpois
}


export const addPoiToPlan=async(day,poi, route,travelPlan)=>{
  
  var pivot=0
  for(let i=0;i<=day-1;i++){
    pivot+=travelPlan[0][i].length
  }
  

  if(Array.isArray(route)){
    
    if(route.length==1){
      travelPlan[1].splice(pivot+1, 0, route[0])
    }
    // else if(travelPlan[0][day-1].length==0){
    //   console.log("shshshs")
    //   travelPlan[1].splice(0, 1)
    //   travelPlan[1].splice(0, 0, route[0])
    //   travelPlan[1].splice(1, 0, route[1])
    // }
    else{
      travelPlan[1].splice(pivot, 1,route[0],route[1])
      // travelPlan[1].splice(pivot, 0, )
      // travelPlan[1].splice(pivot+1, 0, )
    } 
  }
  travelPlan[0][day-1].push(poi)

  var k=0;
  for(let i=0;i<travelPlan[0].length;i++){
    for(let j=0;j<travelPlan[0][i].length;j++){
      k+=1;
    }
  }
  if(travelPlan[1].length !=k){
    travelPlan[1].pop()
  }
  // else{
  //   travelPlan[1].splice(pivot+1, 0, route)
  // }
  // console.log(day)
  // if(day==1){
  //   travelPlan[1].splice(0,1)
  // }
  
  return travelPlan

}

export const AddDay=async(travelPlan)=>{
  travelPlan[0].push([])
  return travelPlan
}


   
export const switchPOI=async(index, index1, travelPlan=[[[],[]] ,[]],allpois,startLocation={lat:6.927079,lng:79.857750})=>{
  const client = new Client({});
  var start_location={}
  var end_location={}
  
  
  var travelDays=travelPlan[0].length
  var plan=travelPlan[0]

  if(index>0){
    if(index1>0){
      console.log("1")
      start_location=plan[index][index1-1].geometry.location
      // travelPlan[0][index].pop(index1)
    }
    else if(index1==0){
      console.log("2")
      if(plan[index-1].length==0){
        start_location=startLocation
      }
      else{
        start_location=plan[index-1][plan[index-1].length-1].geometry.location
      }
      
      // travelPlan[0][index].pop(index1)
    }
    
  }
  else if(index==0){
    if(index1==0){
      start_location=startLocation
      // travelPlan[0][index].pop(index1)

    }
    else if(index1>0){
      console.log("4")
      start_location=plan[index][index1-1].geometry.location
      // travelPlan[0][index].pop(index1)
    }
    
  }


  if(index<travelDays-1){
    if(index1==plan[index].length-1){
      console.log("5")
      if(plan[index+1].length==0){
        end_location=startLocation
      }else{
        end_location=plan[index+1][0].geometry.location
      }
     
      // travelPlan[0][index].splice(index1,1)
      
    }
    else if(index1<plan[index].length-1){
      console.log("6")
      console.log(plan[index])
      console.log(index1)
      end_location=plan[index][index1+1].geometry.location
      
      // travelPlan[0][index].splice(index1,1)
      
    }
  }
  else if(index==travelDays-1){
     if(index1==plan[index].length-1){

      console.log("7")
      return findPois(index+1,travelPlan,allpois)
     }
     else if (index1<plan[index].length-1){
       console.log("8")
        end_location=plan[index][index1+1].geometry.location
        // travelPlan[0][index].splice(index1,1)
      
     }
  }
  

  var remaining_time=32400

  var pivot=0
  for(let i=0;i<index;i++){
    pivot+=travelPlan[0][i].length
  }
  
  for(let i=0; i<travelPlan[0][index].length; i++){
      // if(index1!=i) remaining_time-=travelPlan[1][pivot+i].duration.value+travelPlan[0][index][i].time
      if(index1!=i) remaining_time-=travelPlan[1][pivot+i].duration.value+3600
        
  }
  remaining_time-=3600
  // console.log(remaining_time)


  var poisRoute=new Array()
  var pois=new Array()
  var poisRouteSuitable=new Array()
    for(var i=0; i<allpois.length;i++){
      const waypts = [allpois[i].geometry.location];
      
      
    client
    .directions({params:{
        
        origin:start_location,
        destination:end_location,
        optimizeWaypoints: true,
        travelMode: 'DRIVING',
        waypoints:waypts,
        key: Config.apiKey,

      }
    })
      .then((response) => {
        const route = response.data.routes[0];
        // console.log(route)
        const poisLegs=[]
        for (let i = 0; i < route.legs.length; i++) {
          poisLegs.push(route.legs[i])
        }
        // console.log(poisLegs)  
        poisRoute.push(poisLegs)
      })
       .catch((e) =>{ 
         console.log(e)
      })   
    }
    await new Promise(r => setTimeout(r, 6000));
    
     for(let i=0; i<poisRoute.length;i++){
      if(Array.isArray(poisRoute[i])){
          var t=3600
          for(let j=0; j<poisRoute[i].length;j++){
              t+=poisRoute[i][j].duration.value
          }
          // if(t<=remaining_time-allpois[i].time){
          if(t<=remaining_time){
            pois.push(allpois[i])
            poisRouteSuitable.push(poisRoute[i])
          }
      }
      else{
        if(poisRoute[i].duration.value<=remaining_time){
          pois.push(allpois[i])
          poisRouteSuitable.push(poisRoute[i])
        }
      }
      
  } 
  console.log(pois,poisRouteSuitable)  
   return [pois,poisRouteSuitable]
}



export const addPoiToPlan1=async(index,index1,poi, route,travelPlan)=>{
  var k=0
  var l=0
  for(var i=0; i<=index;i++){
    for (var j=0; j<travelPlan[0][i].length;j++){
      var k=k+1
      if(i==index && j==index1){
          l=k
      }
    }
  } 

 
  travelPlan[0][index][index1]=poi;
  if(Array.isArray(route)){
    if(route.length==1){
      travelPlan[1].splice(l-1, 1)
      travelPlan[1].splice(l-1, 0, route[0])
    }
    else{
      travelPlan[1].splice(l-1, 1)
      travelPlan[1].splice(l-1, 1)
      travelPlan[1].splice(l-1, 0, route[0],route[1])
    } 
  }
  // else{
  //   travelPlan[1].splice(pivot+1, 0, route)
  // }
  
  return travelPlan

}