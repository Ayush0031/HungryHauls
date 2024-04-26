import React, { createContext,useContext,useReducer } from 'react'

const cartStateContext=createContext();
const cartDispatchContext=createContext();

const reducer =(state,action)=>{
    switch (action.type) {
        case 'ADD':
          return [...state,{id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case 'decrement':
          return { count: state.count - 1 };
        default:
          console.log("Error in Reducer");
      }
}
export const CartProvider=({children})=>{
    // initial state is empty array because cart is empty at starting
    const[state,dispatch]= useReducer(reducer,[])
    return(
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    )

}
export const useCart=()=>useContext(cartStateContext)
export const useDispatch=()=>useContext(cartDispatchContext)