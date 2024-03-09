import React, {useState, useContext} from 'react';
import EditIcon from './EditIcon';
import EditBox from './EditBox';
import { UserContext } from './UserContext.js';


export default function Comment ({index, commentID, text, userName, date, userID}) {
    const [user, setUser] = useContext(UserContext);
    const [ beingEditted, setBeingEditted ] = useState(false)
 
    function handleToggle() {
        setBeingEditted(beingEditted => !beingEditted); 
    }

    function handleEdit(e){
        e.preventDefault();
        handleToggle(); 
    };
return (
        <li key={index} id={commentID}>
            {beingEditted ? <EditBox text={text}/> : text }
             &nbsp;
            {beingEditted ? '' : <> ({userName} &mdash; {date})</>}
            {user.userID === userID ? <EditIcon beingEditted={beingEditted} handleToggle={handleToggle} handleEdit={handleEdit}/> : '' }
            {/* {beingEditted ? '' : <> ({userName} &mdash; {date})</>}
            {user.userID === userID ? <EditIcon beingEditted={beingEditted} handleEdit={handleEdit}/> : '' } */}
        </li>
)
};
