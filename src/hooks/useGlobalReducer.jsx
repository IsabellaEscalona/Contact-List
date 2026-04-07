// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()
const API = "https://playground.4geeks.com/contact/agendas/NoahCL/contacts"

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    // Provide the store and dispatch method to all child components.

    useEffect(() => {

        getContact()

    }, [])

    const getContact = () => {

        fetch(API)
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: "GET_CONTACTS", payload: data.contacts })
            })

    }

    const createContact = (contact) => {

        fetch(API, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: "ADD_CONTACT", payload: data })
            })

    }

    const updateContact = (id, contact) => {
        console.log("este es el id del PUT" + id)

        fetch(`${API}/${id}`, {

            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
                console.log(response?.data?.name);
                dispatch({ type: "UPDATE_CONTACT", payload: data })
            })

    }

    const deleteContact = (id) => {
        fetch(`${API}/${id}`, {
            method: 'DELETE'
        })

            .then((response) => {
                if (response.ok) {
                    dispatch({ type: "DELETE_CONTACT", payload: id })
                }

            })
            .catch((error) => console.log(error.message))
    }

    return <StoreContext.Provider value={{ store, dispatch, createContact, deleteContact, updateContact }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
/* export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
} */

const useGlobalReducer = () => useContext(StoreContext)

export default useGlobalReducer