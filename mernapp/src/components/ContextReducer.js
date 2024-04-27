import React, { createContext,useContext,useReducer } from 'react'

const cartStateContext=createContext();
const cartDispatchContext=createContext();

const reducer =(state,action)=>{
    switch (action.type) {
        case 'ADD':
          return [...state,{id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
                let arr = [...state]
                arr.find((food, index) => {
                    if (food.id === action.id) {
                        console.log(food.qty, parseInt(action.qty), action.price + food.price)
                        arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                    }
                    return arr
                })
                return arr
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