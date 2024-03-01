import React from 'react';
import './NewDrink.css'

export default function NewDrink({newDrink, handleName, focusName, handleDescription, focusDescription, handlePrice, focusPrice}){

// const {drinkName, description, price } = newDrink
  return (
    <>
      <label>Name of Drink
      <input
          className={newDrink.needsName ? 'missing' : '' }
          id='drinkName'
          type="text"
          value={newDrink.needsName ? 'Scott is a completist' : newDrink.drinkName}
          onChange={handleName}
          onFocus={focusName}
      />
      </label>
      <label>Drink Description (from menu)
      <input
          className={newDrink.needsDescription ? 'missing' : '' }
          id='description'
          type="text"
          value={newDrink.needsDescription ? 'Scott is a completist' : newDrink.description}
          onChange={handleDescription}
          onFocus={focusDescription}
      />
      </label>
      <label>Price $
      <input
          className={newDrink.needsPrice ? 'missing' : '' }
          id='price'
          type='number'
          value={newDrink.price}
          onChange={handlePrice}
          onFocus={focusPrice}
      />
      </label>
    </> 
)
}