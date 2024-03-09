import React, {useState, useContext} from 'react';
import EditIcon from './EditIcon';
import EditBox from './EditBox';
import { UserContext } from './UserContext.js';


export default function Comment ({index, commentID, text, userName, date, userID}) {
    const [user, setUser] = useContext(UserContext);
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
            {user.userID === userID ? <EditIcon handleEdit={handleEdit}/> : '' }
        </li>
)
};
