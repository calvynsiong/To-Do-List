import './App.css';
import { Alert, List } from './components';
import React, { useState, useEffect } from 'react';
import {BiSun, BiMoon} from "react-icons/bi"

const getLocalStorage = () => {
  let list = localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } else return []
}

function App() {
	const [entry, setEntry] = useState('');
	const [list, setList] = useState(getLocalStorage);
	const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditID] = useState(null);
  const [darkMode, setDarkMode] = useState(false)
	const [alert, setAlert] = useState({
		show: false,
		msg: '',
		type: '',
  });

   useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!entry) {
			// Make an alert if there is no entry
			showAlert(true, 'danger', 'Enter a Task!');
		} else if (entry && isEditing) {
			showAlert(true, 'success', 'Succesfully edited');
			setList(
				list.map((item) => {
					if (item.id === editId) {
						return { ...item, title: entry};
					}
					return item;
				}),
			);
      setEntry('');
      setEditID(null)
			setIsEditing(false);

			// Editing process
		} else {
			// Show alert + create new item when submitted successfully
			showAlert(true, 'success', 'Task Added! Make sure you finish it!');
			const newItem = { id: new Date().getTime().toString(), title: entry, checked: false };
			setList([...list, newItem]);
			setEntry('');
		}
	};

	const showAlert = (show = false, type = '', msg = '') => {
		setAlert({ show, type, msg });
	};

	const clearAll = () => {
		showAlert(true, 'danger', 'All tasks cleared');
		setList([]);
	};

	const removeEntry = (id) => {
		showAlert(true, 'danger', 'Task Removed');
		setList(list.filter((item) => item.id !== id));
	};
	
	
	const crossEntry = (id) => {
    // const specificItem = list.find((item) => item.id === id);
    setList(list.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked
      }
      return item
    }))


	};
	const editEntry = (id) => {
    const specificItem = list.find((item) => item.id === id);
    console.log(specificItem);
		setIsEditing(true);
		setEditID(id);
		setEntry(specificItem.title);
	};

	return (
    <main  className={darkMode?"Page dark-mode": "Page"}>
      <section className={darkMode?"section-center dark-mode": "section-center"}>
        <div>
          <button className={darkMode?"theme-btn dark-mode": "theme-btn"} onClick={()=>setDarkMode(false)}><BiSun/></button >
          <button className={darkMode?"theme-btn dark-mode": "theme-btn"} onClick={()=>setDarkMode(true)}><BiMoon/></button>
        </div>
      			<form action='' className={darkMode?"grocery-form dark-mode": "grocery-form"} onSubmit={handleSubmit}>
      				{alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      				<h2>To Do List</h2>
      				<h4>Made by Calvyn Siong</h4>
      				<div className='form-control'>
      					<input
      						type='text'
      						className='grocery'
      						placeholder="Type in a task. e.g. 'Finish Unit 2'"
      						value={entry}
      						onChange={(e) => setEntry(e.target.value)}
      					/>
      					<button
      						type='submit'
      						className={isEditing ? 'submit-btn editing' : 'submit-btn'}>
      						{isEditing ? 'edit' : 'submit'}
      					</button>
      				</div>
      			</form>
      			{list.length > 0 && (
      				<div className='grocery-container'>
            <List
              darkMode={darkMode}
      						items={list}
      						removeEntry={removeEntry}
              editEntry={editEntry}
            crossEntry={crossEntry}
            ></List>
      					<button className='clear-btn' onClick={clearAll}>
      						Clear All
      					</button>
      				</div>
      			)}
      		</section>
    </main>
	);
}

export default App;
