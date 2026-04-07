import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { use, useState } from "react"
import useGlobalReducer from '../hooks/useGlobalReducer';

export const FormContacts = () => {

  const { store, dispatch, createContact, updateContact } = useGlobalReducer()
  const { id } = useParams()
  let navigate = useNavigate()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  const payload = {
    name: name,
    phone: phone,
    email: email,
    address: address

  }

  function saveContacts(e) {
    e.preventDefault()

    if (name.trim() == "" || phone.trim() == "" || email.trim() == "" || address.trim() == "") {
      alert("Empty Fields")
      return null
    }

    if (!id) {
      createContact(payload)
    } else {
      updateContact(id, payload)
    }
    alert("Se grabo los datos del contacto");
    navigate("/");
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");


  }

  useEffect(() => {
    if (id && store.contacts.length > 0) {
      const currentContact = store.contacts.find(contact => contact.id == id)
      setName(currentContact.name)
      setPhone(currentContact.phone)
      setEmail(currentContact.email)
      setAddress(currentContact.address)
    }
  }, [id, store.contacts])


  return (
    <>
      <div>FormContacts</div>

      <div className="container my-4">
        <h1 className='text-center mb-3'>{!id ? "Agregar un nuevo contacto" : `Actualizar Contacto: ${name}`}</h1>
        <form onSubmit={saveContacts}>
          <div className="mb-3">
            <label htmlFor="FullName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="FullName" placeholder='Full Name' onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input type="email" className="form-control" id="Email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="Phone" placeholder='Enter Phone' onChange={(e) => setPhone(e.target.value)} value={phone} required />
          </div>
          <div className="mb-3">
            <label htmlFor="Address" className="form-label">Address</label>
            <input type="text" className="form-control" id="Address" placeholder='Enter Address' onChange={(e) => setAddress(e.target.value)} value={address} required />
          </div>
          <button type="submit" className="btn btn-primary col-12 my-3">{!id ? "Agregar" : "Actualizar"}</button>
        </form>

        <Link to='/'>

          Volver a contactos

        </Link>

      </div>
    </>
  )
}
