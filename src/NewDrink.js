// import React, { useState, useContext } from 'react';
// import { ref, child, push, update } from "firebase/database";
// import { db } from "./firebase.js";
// import { UserContext } from './UserContext.js';



// export default function NewDrink ({selectedBar}){
  
   
   
//     // function barPicker(e) {
//     //   setSelectedBar(e.target.value);
//     // };
//     // const barIDToObject = barsArray.find(({barID}) => barID === selectedBar);
//     let barIDToBarName = ''
//     // const barIDToObject = barsArray.find(({barID}) => barID === selectedBar)

    
//     // function getReadableName (e) {
//     //   setSelectedBar(e.target.value);
//     //   if (e.target.value === 'new')
//     //   {
//     //     // addNewBar();
//     //     setSelectedBar(crypto.randomUUID()); //useID
//     //     // barIDToBarName = newBarName;
//     //     console.log(barIDToBarName);
//     //   }
//     //         //  const barIDToObject = (barID, newBarName)
//     //          // barID = crypto.randomUUID();
//     //           // barIDToBarName = newBarName
//     //           // barIDToBarName = barName
//     //     if (barIDToObject) {
//     //           console.log('true that')
//     //       }};
//   function handleClick(e){
//     e.preventDefault();
//       if (!user) { 
//           return (
//             alert('Please login to add a drink')
//           )
//       }
//       else {
//           const newDrinkKey = push(child(ref(db), '/drinks/')).key;
//           const updates = {};
          
//           // const barIDToObject = barsArray.find(({barID}) => barID === selectedBar)
//           // const barIDToBarName = barIDToObject.barName
        

//           // const barIDToObject = barsArray.find(({barID}) => barID === selectedBar)
//           // const barIDToBarName = barIDToObject.barName
//           const newDrink = {
//             barID: selectedBar,
//             barName: barIDToBarName,
//             drinkID: newDrinkKey,
//             drinkName: drinkName,
//             description: description,
//             price: Number(price),
//             userID: userID,
//             timeStamp: performance.timeOrigin
//           };
//       setDrinkName('');
//       setDescription('');
//       setPrice('');
//       // setSelectedBar('');
//       // setNewBarName('');
//       updates['/drinks/' + newDrinkKey] = newDrink;
//       return (
//           update(ref(db), updates).then(() => {
//               console.log('Data saved successfully!')
//         })
//         .catch((error) => {
//           console.log('problem writing')
//         })
//       )}}
//       return (
//         <>
//             <NewContainer selectedBar={selectedBar}/>
//             <form>
            
            
            
//             <input
//               type="submit"
//               value="add"
//               onClick={handleClick}
//               onKeyDown={(e) =>
//                 e.key === 'Enter' ? handleClick(e) : ''
//               }
//             />
//           </form>
//         </>
//       )}