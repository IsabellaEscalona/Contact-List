import React from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { Link } from "react-router-dom";
import { FaEnvelope, FaLocationDot, FaPen, FaPhoneFlip, FaRegTrashCan } from 'react-icons/fa6'

const ListContacts = () => {

    const { store, dispatch, deleteContact } = useGlobalReducer()

    const contactRender = store.contacts.map(contact => (

        <li className="list-group-item" key={contact.id}>

            <div className="row g-0 d-flex">
                <div className="col-md-2 m-0">
                    <img src="https://picsum.photos/id/103/200" className="img-fluid rounded-pill mx-auto p-2 " />
                </div>
                <div className="col-md-10">
                    <div className="card-body py-2">
                        <h5 className="card-title my-3">{contact.name}</h5>
                        <p className="card-text m-1"><FaLocationDot /> {contact.address}</p>
                        <p className="card-text m-1"><FaPhoneFlip /> {contact.phone}</p>
                        <p className="card-text m-1"><FaEnvelope /> {contact.email}</p>
                    </div>
                    <div className="card-buttons position-absolute top-0 end-0 p-4 ">
                        <button className="btn fs-5"
                            onClick={() => deleteContact(contact.id)}>
                            <FaRegTrashCan />
                        </button>
                        <Link to={"/editContact/" + contact.id}>
                            <button className="btn fs-5"><FaPen /></button>
                        </Link>
                    </div>
                </div>
            </div>

        </li>

    ))

    return (
        <div className="container-fluid">
            <div>ListContacts</div>

            <div className="row p-3">
                <Link to={"/AddContact"}>

                    <button className='btn btn-success float-end p-2'> Add New Contact</button>

                </Link>
            </div>

            <ul className="list-group">
                {contactRender}
            </ul>

        </div>
    )
}

export default ListContacts