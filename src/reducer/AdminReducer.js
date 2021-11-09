export const initialState=[
]

export const Adminreducer =(state,action)=>{
   switch(action.type){
   
        case "Admin":
            return action.payload

        case "set_travelPlan":
            return{
                ...state,
                travelPlan:action.payload.travelPlan,
            }
        case "set_planId":
            return{
                ...state,
                planId:action.payload.planId
            }
        case "CLEAR":
            return null
        default :
           return state
   }

    return state
}