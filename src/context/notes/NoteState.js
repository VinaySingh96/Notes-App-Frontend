import NoteContext from "./NoteContext";
import React, { useContext, useState } from "react";
import AuthContext from "../AuthContext";

const NoteState = (props) => {
    const url = "http://localhost:8000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // setting the auth token dynamically
    const context=useContext(AuthContext);
    const {token} =context;
    localStorage.setItem('token',token);
    // let ls=localStorage.getItem('token');

    // fetch notes from db using api call
    const fetchNotes = async () => {
        const result = await fetch(`${url}/api/notes/fetchAllNotes`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const data = await result.json();
        setNotes(data);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API call
        const result = await fetch(`${url}/api/notes/createNote`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const data=await result.json();
       
        let note = {
            "_id":data._id,
            "title": title,
            "description": description,
            "tag": tag
        }
        setNotes(notes.concat(note));
    }
    // Delete a Note
    const deleteNote = async (id) => {
        const result = await fetch(`${url}/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        setNotes(notes.filter((note) => { return note._id !== id }));
    }

    // Update a Note
    const updateNotes = async (id, title, description, tag) => {
        // API call
        const result = await fetch(`${url}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });

        let newNotes = JSON.parse(JSON.stringify(notes));
        let i = 0;
        let note = await notes.find((note) => { i++; return note._id === id })
        newNotes[i - 1].title = title;
        newNotes[i - 1].description = description;
        newNotes[i - 1].tag = tag;
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNotes, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;