import React, {useContext, useState} from "react";
import { UserContext } from "./UserContext.js";
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import Drink from './Drink.js'
import ChangeBar from './ChangeBar.js';
import Edit from "./Edit.js";


export default function Bar({bars, drinks, comments, ratings}) {
  const [ user, setUser] = useContext(UserContext);
  const [beingEditted, setBeingEditted] = useState(false);
  const [selectedBar, setSelectedBar] = useState('');
  const barsArray = Object.values(bars);
  const filteredBars = barsArray.filter(bar => bar.barID === selectedBar);

  function handleToggle () {
    setBeingEditted(beingEditted => !beingEditted);
    }

  function handleSelect (e) {
    e.preventDefault();
    setSelectedBar(e.target.value);
    };  
    
//     function handleClick(e) {
//       e.preventDefault();
//       if (!user) { 
//         return (
//           alert('Please login to rate a drink')
//         )
//     } 
//     if (filterRatings.length != 0) {
//       const updates = {};
//       const updatedRating = {
//         ratingID: filterRatings[0].ratingID,
//         userID: filterRatings[0].userID,
//         drinkID: filterRatings[0].drinkID,
//         originalTimeStamp: filterRatings[0].originalTimeStamp,
//         lastTimeStamp: performance.timeOrigin,
//         rating: rating.rating
//       };
//     setRating('');
//     handleToggle();
//     updates['/ratings/' + filterRatings[0].ratingID] = updatedRating;
   
//     return (
//         update(ref(db), updates).then(() => {
//             console.log('Data saved successfully!')
//       })
//       .catch((error) => {
//         console.log('problem writing')
//       })
//     ) 
//   }
// if (filterRatings.length === 0)  
//    {
//       const newRatingKey = push(child(ref(db), '/ratings/')).key;
//       const updates = {};
//       const newRating = {
//         ratingID: newRatingKey,
//         userID: userID,
//         drinkID: ratingDrinkID,
//         originalTimeStamp: performance.timeOrigin,
//         lastTimeStamp: performance.timeOrigin,
//         rating: rating.rating
//       };
//     setRating('');
//     updates['/ratings/' + newRatingKey] = newRating;
   
//     return (
//         update(ref(db), updates).then(() => {
//             console.log('Data saved successfully!')
//       })
//       .catch((error) => {
//         console.log('problem writing')
//       })
//     )
//   }
// }
    
    return (
      <>
      <ul>
        {filteredBars.map(({ barName, barID }, index) => {
            return (
              <li key={index}>
                 <h1>{barName}</h1>
                <Drink
                  barID={barID}
                  barsArray={barsArray}
                  drinks={drinks}
                  comments={comments}
                  ratings={ratings}
                  handleToggle={handleToggle}
                  beingEditted={beingEditted}
                  // handleClick={handleClick}
                />
              </li>
            );
          })}
      </ul>
      <ChangeBar
        bars={bars}
        handleSelect={handleSelect}
      /> 
      <Edit
        handleToggle={handleToggle} 
        beingEditted={beingEditted}
        // handleClick={handleClick}
        selectedBar={selectedBar}
      />
      </>
    );
  }
  