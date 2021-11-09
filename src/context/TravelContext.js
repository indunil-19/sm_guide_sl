import React, {createContext, useReducer} from 'react';
import { initialState, Travelreducer } from '../reducer/TravelReducer';

export const TravelContext =createContext()

export const TravelProvider=({children})=>{
    const [state, dispatch]= useReducer(Travelreducer, initialState)

    return(
        <TravelContext.Provider  value={{state,dispatch}}>
                {children}
        </TravelContext.Provider>
    )
}