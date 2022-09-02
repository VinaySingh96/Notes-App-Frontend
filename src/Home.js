import React, { useContext,useState, useEffect, useRef } from 'react'
import NoteContext from './context/notes/NoteContext';
import NoteItem from './Components/NoteItem';
import NotesForm from './Components/NotesForm';
import {useHistory} from 'react-router-dom';

export const Home = () => {
	let history=useHistory();
	const context = useContext(NoteContext);
	const { notes, updateNotes } = context;
	const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
	useEffect(() => {
		const context = useContext(NoteContext);
		let history=useHistory();
		const {fetchNotes}=context;
		if(localStorage.getItem('token'))
		{
			fetchNotes();
		}
		else
		{
			history.push('/login');
		}
	}, []);
	const ref = useRef(null);
	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
	}
	const onchange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	}		
	const clickUpdate = (e) => {
		// console.log(note)
		updateNotes(note.id,note.etitle,note.edescription,note.etag);
}
	return (
		<div className='container'>
			<div className='container' style={{ width: "70vw" }}>
				<NotesForm />

				<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
									<input type="text" className="form-control" id="title" name="etitle" value={note.etitle} onChange={onchange}  />
								</div>
								<div className="mb-2">
									<label htmlFor="description" className="form-label mb-2">Description</label>
									<textarea className="form-control" id="description" name="edescription" value={note.edescription} onChange={onchange}  rows="2"></textarea>
								</div>
								<div className="">
									<label htmlFor="tag" className="form-label mb-2">Tag</label>
									<input type="text" className="form-control mb-2" id="tag" name="etag" value={note.etag} onChange={onchange} />
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={clickUpdate}>Save changes</button>
							</div>
						</div>
					</div>
				</div>

				<h3>Your Notes</h3>
				<div className="row my-3">
					{notes.map((note) => {
						return (
							<NoteItem key={note._id} updateNote={updateNote} note={note} />

						)
					})
					}
				</div>

			</div>
		</div>
	)
}

export default Home;