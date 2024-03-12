import React, { useState, useContext } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';
import Submit from './Submit.js';


export default function NewRating({emojiLookUp, ratingDrinkID}) {

//     const [rating, setRating] = useState('');
//     const [user, setUser] = useContext(UserContext);
//     const { userName, userID } = user 

//     function handleClick(e) {
//       e.preventDefault();
//       if (!user) { 
//         return (
//           alert('Please login to add a comment')
//         )}
//         else {
//       const newCommentKey = push(child(ref(db), '/comments/')).key;
//       const newVersionKey = push(child(ref(db), '/commentVersions/')).key;
//       const updates = {};
//       const newComment = {
//         commentID: newCommentKey,
//         userName: userName,
//         userID: userID,
//         drinkID: commentDrinkID,
//         timeStamp: performance.timeOrigin,
//         text: comment,
//       };
//       const newVersion = {
//         commentID: newCommentKey,
//         versionID: newVersionKey,
//         timeStamp: performance.timeOrigin,
//         text: comment
//       }
//     setComment('');
//     updates['/comments/' + newCommentKey] = newComment;
//     updates['/commentVersions/' + newVersionKey] = newVersion;
   
//     return (
//         update(ref(db), updates).then(() => {
//             console.log('Data saved successfully!')
//       })
//       .catch((error) => {
//         console.log('problem writing')
//       })
//     ) }
// }
// 

    return (
        
      <>
        <form>
          <label>Rating
          <select name='ratingSelect'>
            <option>Please Select a Rating:</option>
            {Object.entries(emojiLookUp).map(([key, value], index) => (
    <option key={index} value={value}>{key}</option>
))}

          </select>
          </label>
          {/* <Submit handleClick={handleClick} value='add'/> */}
        </form>
      </>
    );
  }


//   <option value='Please choose a bar'>Please choose a bar</option> 
//             {barsArray.map(({ barName, barID }, index) => {
//               if (!uniqueBars.has(barID)) {
//                 uniqueBars.add(barID);
//                 return (
//                   <option key={index} value={barID}>{barName}</option>
//                 )
//               }})}
//             <option isNew={true} className='new' value='new'>New</option>