import React, {useState} from 'react';
import NewComment from './NewComment';
import Edit from './Edit';
import EditBox from './EditBox';


export default function Comment ({comments, commentDrinkID}) {
    const [showEdit, setShowEdit] = useState(false);
    const commentsArray = Object.values(comments);
    const filteredComments = commentsArray.filter(comment => comment.drinkID === commentDrinkID);

    function handleEdit(e){
        e.preventDefault();
        setShowEdit(showEdit => !showEdit);  
    };
return (
    <ul>
        {filteredComments.map(({userName, timeStamp, text}, index) => {
        const date = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          }).format(timeStamp);
        return (
        <li key={index}>
            {/* {text} */}
            {showEdit ? <EditBox text={text}/> : text }
             &nbsp;
            ({userName} &mdash;&nbsp;
            {date})
            <Edit handleEdit={handleEdit}/>
        </li>
        )}
        )}
        <NewComment commentDrinkID={commentDrinkID}/>
    </ul>
)
};
