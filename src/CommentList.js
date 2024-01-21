import React from 'react';
import Comment from './Comment.js';

export default function CommentList ({drinkID, comments}){
    const uniqueDrinks = new Set ();
return (
    <ul>
        {comments.map(({drinkID}, index) => {
            if (!uniqueDrinks.has(drinkID)) {
                uniqueDrinks.add(drinkID);
                const commentsOnDrink = comments.filter(comment => comment.drinkID === drinkID);
                return (
                    <li key={index}>
                    <Comment drinkID={drinkID} commentsOnDrink={commentsOnDrink}/>
                    </li>
                      );
                              }
                            })}
                          </ul>
                        );
                      }
                      

  

/* Needs: 
useState and useEffect from Read, the comments will be in the database
Who said it - Google token
the date
the comment
not in the UI, but be attached to correct drink

*/