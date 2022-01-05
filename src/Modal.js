import React, { useContext,useState }  from 'react'
import NoteContext from './context/notes/NoteContext';

const Modal = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleonchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        console.log(note.title)
        // console.log(e.target.value)
    }
    const submitNote = (e) => {
        console.log(props.id);
        e.preventDefault();
        // addNote(note.title,note.description,note.tag);
    }
    return (
        <>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;
