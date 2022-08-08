import { useReducer, useContext, createContext, ReactNode } from "react"
import { cartReducer, ADD_ORDER, REMOVE_ORDER, UPDATE_ORDER } from "./reducer"
import { Order } from "../../lib/items"

type CartContextType = {
  cartState: Order[]
  addOrder: (order: Order) => void
  removeOrder: (order: Order) => void
  updateOrder: (order: Order) => void
}

type Props = {
  children?: ReactNode
  initialState: Order[]
}

const CartContext = createContext<CartContextType>({
  cartState: [],
  addOrder: () => {},
  removeOrder: () => {},
  updateOrder: () => {}
})

export const useCartContext = () => {
  return useContext(CartContext)
}

export const CartContextProvider = ({ children, initialState }: Props) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState)

  const addOrder = (order: Order) => dispatch({ type: ADD_ORDER, order })

  const removeOrder = (order: Order) => dispatch({ type: REMOVE_ORDER, order })

  const updateOrder = (order: Order) => dispatch({ type: UPDATE_ORDER, order })

  return (
    <CartContext.Provider
      value={{
        cartState,
        addOrder,
        removeOrder,
        updateOrder
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
