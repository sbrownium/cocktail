import React from 'react';
import Drink from './Drink.js'

export default function Bar({bars, drinks, comments}) {
  const barsArray = Object.values(bars);
  // const uniqueBars = new Set();
  
    return (
      <ul>
        {barsArray.map(({ barName, barID }, index) => {
          // if (!uniqueBars.has(barID)) {
          //   uniqueBars.add(barID);
          //   const drinksAtBar = drinksArray.filter(drink => drink.barID === barID);
  
            return (
              <li key={index}>
                {barName}
                <Drink barID={barID} barsArray={barsArray} drinks={drinks} comments={comments}/>
              </li>
            );
          })}
      </ul>
    );
  }
  

// export default function Bar({drinks, comments}) {
// const drinksArray = Object.values(drinks);
// const uniqueBars = new Set();

//   return (
//     <ul>
//       {drinksArray.map(({ barName, barID }, index) => {
//         if (!uniqueBars.has(barID)) {
//           uniqueBars.add(barID);
//           const drinksAtBar = drinksArray.filter(drink => drink.barID === barID);

//           return (
//             <li key={index}>
//               {barName}
//               <Drink drinksAtBar={drinksAtBar} comments={comments}/>
//             </li>
//           );
//         }
//       })}
//     </ul>
//   );
// }
