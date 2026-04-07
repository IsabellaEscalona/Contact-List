import { use, useState } from "react"
import useGlobalReducer from "./hooks/useGlobalReducer"

export const initialStore = () => {
  return {
    contacts: []
  }
}

export default function storeReducer(state, action) {

  switch (action.type) {
    case 'GET_CONTACTS':
      return { ...state, contacts: action.payload }

    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] }
    case "UPDATE_CONTACT":
      console.log(action.payload.name)
      return {
        ...state, contacts: state.contacts.map(contact => {
          if (contact.id == action.payload.id) {
            contact = action.payload
          }
        })
      }
    case "DELETE_CONTACT":
      return { ...state, contacts: state.contacts.filter(item => item.id !== action.payload) }
    default:
      return state
  }
}




