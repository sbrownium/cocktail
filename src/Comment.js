import React from 'react';

export default function Comment({drinkID, commentsOnDrink}){
    // const uniqueDrinks = new Set ();
        console.log('Comment', {drinkID}, {commentsOnDrink})
        return (
            9
        )}
        // <ul>
      {/* {commentsOnDrink.map(({ userName, timeStamp, text }, index) => (
        if (uniqueDrinks.has(drinkID)) {
            uniqueDrinks.add(drinkID);
            const uniqueDrinkComments = comments.filter(comment => comment.drinkID === drinkID);
            return (
          <li key={index}>
            {userName} &mdash;&nbsp;
            {timeStamp} &mdash;&nbsp;
            {text}
            </li>
      );}
             ))}
           </ul>  */}
      
        


// export default function CommentList ({comments}){
//     const uniqueDrinks = new Set ();
// return (
//     <ul>
//         {comments.map(({ drinkID }, index) => {
//             if (!uniqueDrinks.has(drinkID)) {
//                 uniqueDrinks.add(drinkID);
//                 const commentsOnDrink = comments.filter(comment => comment.drinkID === drinkID);
//                 return (
//                     <li key={index}>
//                     <Comment commentsOnDrink={commentsOnDrink}/>
//                     </li>
//                       );
//                               }
//                             })}
//                           </ul>
//                         );
//                       }
                      

// return (
//     <ul>
//   {drinksAtBar.map(({drinkName, description, price}, index) => (
//       <li key={index}>
//         {drinkName} &mdash;&nbsp;
//         {description} &mdash;
//         ${price.toFixed(2)}
//         <CommentList comments={comments}/>
//       </li>
//          ))}
//        </ul> 
//   )

// userName": "Jessica",
//         "userToken": "kdahofienfakd2930547usklfnd",
//         "drinkId": "345e52c4-edb8-443e-888a-fed00574f7b9",
//         "timeStamp": 1705790249166,
//         "text": 

// export default function Drink({drinksAtBar},{comments}){
//     return (
//         <ul>
//       {drinksAtBar.map(({name, description, price}, index) => (
//           <li key={index}>
//             {name} &mdash;&nbsp;
//             {description} &mdash;
//             ${price.toFixed(2)}
//             <CommentList comments={comments}/>
//           </li>
//              ))}
//            </ul> 
//       )
// }