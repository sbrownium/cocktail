import React, {useState, useContext} from 'react';
import Edit from './Edit';
import EditBox from './EditBox';
import PencilIcon from './PencilIcon.js';
import { UserContext } from './UserContext.js';

//Pencil by Graphik Designz from <a href="https://thenounproject.com/browse/icons/term/pencil/" target="_blank" title="Pencil Icons">Noun Project</a> (CC BY 3.0)
export default function Comment ({index, commentID, text, userName, date}) {
    const [user, setUser] = useContext(UserContext);
    const [showEdit, setShowEdit] = useState(false);
    
    function handleEdit(e){
        e.preventDefault();
        setShowEdit(showEdit => !showEdit); 
    };
return (
        <li key={index} id={commentID}>
            <PencilIcon fillColor='black'/>
            {showEdit ? <EditBox text={text}/> : text }
             &nbsp;
            ({userName} &mdash;&nbsp;
            {date})
            <Edit handleEdit={handleEdit}/>
        </li>
)
};
