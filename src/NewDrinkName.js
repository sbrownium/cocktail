import React, { useState } from 'react';

export default function NewDrinkName () {
    const [drinkName, setDrinkName] = useState('');
    return (
        <>
        <label for='drinkName'>Name of Drink</label>
            <input
              id='drinkName'
              type="text"
              value={drinkName}
              onChange={(e) => setDrinkName(e.target.value)}
            />
        </> 
    )
}