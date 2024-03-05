import React, {useState} from 'react';
import Edit from './Edit';
import EditBox from './EditBox';


export default function Comment ({index, commentID, text, userName, date}) {
    const [showEdit, setShowEdit] = useState(false);
    
    function handleEdit(e){
        e.preventDefault();
        setShowEdit(showEdit => !showEdit); 
    };
    
return (
        <li key={index} id={commentID}>
            {showEdit ? <EditBox text={text}/> : text }
             &nbsp;
            ({userName} &mdash;&nbsp;
            {date})
            <Edit handleEdit={handleEdit}/>
        </li>
)
};
