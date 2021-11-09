export const initialState=[
]

export const Travelreducer =(state,action)=>{
   switch(action.type){
   
        case "USER":
            return action.payload

        case "UPDATE":
            return {
                ...state,
                firstname:action.payload.firstname,
                lastname:action.payload.lastname,
                dob:action.payload.dob,
                country:action.payload.country,
                religion:action.payload.religion,
                email:action.payload.email,
                pic:action.payload.pic
                // password:action.payload.password
            }
        case "USER_PREFERENCES":
            return{
                ...state,
                userPreferences:action.payload.userPreferences
            }
        case "accomodation_location":
            return{
                ...state,
                accomodation_location:action.payload.accomodation_location
            }
        case "set_travelPlan":
            return{
                ...state,
                travelPlan:action.payload.travelPlan,
            }
        case "set_editTravelPlan":
                return{
                    ...state,
                    editTravelPlan:action.payload.editTravelPlan,
                }
        case "set_pois":
            return{
                ...state,
                allpois:action.payload.allpois
            }
        case "set_planId":
            return{
                ...state,
                planId:action.payload.planId
            }
        case "custom_pois":
            return{
                ...state,
                custom_pois:action.payload.custom_pois
            }
        case "custom_poi":
            return{
                ...state,
                custom_poi:action.payload.custom_poi
            }
        case "CLEAR":
            return null
        default :
           return state
   }

    return state
}