import React,{ useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const NotesForm = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleonchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        // console.log(note.title)
        // console.log(e.target.value)
    }
    const submitNote = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }

    return (
        <>
            <h3>Add a Note</h3>
            <div className="">
                <label htmlFor="title" className="form-label mb-2">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={handleonchange} />
            </div>
            <div className="mb-2">
                <label htmlFor="description" className="form-label mb-2">Description</label>
                <textarea className="form-control" id="description" name="description" onChange={handleonchange} rows="2"></textarea>
            </div>
            <div className="">
                <label htmlFor="tag" className="form-label mb-2">Tag</label>
                <input type="text" className="form-control mb-2" id="tag" name="tag" onChange={handleonchange} />
            </div>
            <button className="btn btn-primary mb-2" onClick={submitNote}>Add Note</button>
        </>
    )
}

export default NotesForm;