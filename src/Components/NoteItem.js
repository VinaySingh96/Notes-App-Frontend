import React, { useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(NoteContext)
  const { deleteNote } = context;
  const clickEdit=()=>{
    updateNote(note);
  }
  const clickDelete = () => {
    deleteNote(note._id);
  }
  
  return (
    <div className="card mx-3 my-2" style={{ width: "15rem" }} >
      <div className="card-body" style={{ padding: "0px" }} >
        <h5 className="card-title" >{note.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted" >{note.tag}</h6>
        <p className="card-text">{note.description}</p>
        <button className='btn-small btn-danger mb-2' style={{ marginRight: "85px", borderRadius: "5px" }} onClick={clickDelete}>Delete</button>
        <button className='btn-small btn-success' style={{ borderRadius: "5px", width: "63px" }} onClick={clickEdit} >Edit</button>

      </div>
    </div>
  )
}

export default NoteItem;