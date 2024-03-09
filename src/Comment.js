import React, {useState, useContext} from 'react';
import EditIcon from './EditIcon';
import EditBox from './EditBox';
import { UserContext } from './UserContext.js';


export default function Comment ({index, commentID, text, userName, date, userID}) {
    const [user, setUser] = useContext(UserContext);
    const [showEdit, setShowEdit] = useState(false);
    const [ beingEditted, setBeingEditted ] = useState(false)
 
    function handleEdit(e){
        e.preventDefault();
        setShowEdit(showEdit => !showEdit);
        setBeingEditted(beingEditted => !beingEditted); 
    };
return (
        <li key={index} id={commentID}>
            {showEdit ? <EditBox text={text}/> : text }
             &nbsp;
            {beingEditted ? '' : <> ({userName} &mdash; {date})</>}
            {user.userID === userID ? <EditIcon beingEditted={beingEditted} handleEdit={handleEdit}/> : '' }
        </li>
)
};
