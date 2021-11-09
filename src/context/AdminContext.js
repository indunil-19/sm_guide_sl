import React, {createContext, useReducer} from 'react';
import { initialState, Adminreducer } from '../reducer/AdminReducer';

export const AdminContext =createContext()

export const AdminProvider=({children})=>{
    const [state, dispatch]= useReducer(Adminreducer, initialState)

    return(
        <AdminContext.Provider  value={{state,dispatch}}>
                {children}
        </AdminContext.Provider>
    )
}