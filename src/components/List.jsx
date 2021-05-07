import React, {useEffect} from 'react';
import { FaTrash, FaEdit, FaStrikethrough } from 'react-icons/fa';

const List = ({ items,removeEntry, editEntry, crossEntry, darkMode }) => {


useEffect(() => {
  
}, [crossEntry])

    
	return (
		<div className='grocery-list'>
			{items.map((item, index) => {
				let today = new Date();
				let d = today.getDate();
				let m = today.getMonth() + 1;
				let y = today.getFullYear();
				return (
					<article key={item.id} value={index} className={darkMode?"grocery-item dark-mode": "grocery-item"}>
                        <div className="entry">
                            <p className={item.checked && "crossed"} >{index + 1}. {item.title}</p>
							<h5>{d}/{m}/{y}</h5>
						</div>
						<div className='btn-container'>
                            <button type='button' className='edit-btn'
                            onClick={()=>crossEntry(item.id)}>
								<FaStrikethrough></FaStrikethrough>
							</button>
                            <button type='button' className='edit-btn'
                            onClick={()=> editEntry(item.id)}>
								<FaEdit />
							</button>
							<button
								type='button'
								className='delete-btn'
								onClick={()=> removeEntry(item.id)}>
								<FaTrash />
							</button>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default List;
