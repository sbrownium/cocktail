import React from 'react';
import './NewDrink.css'

export default function NewDrink({newDrink, handleName, handleDescription, handlePrice}){

// const {drinkName, description, price } = newDrink
  return (
    <>
      <label>Name of Drink
      <input
          className={newDrink.needsName ? 'missing' : '' }
          id='drinkName'
          type="text"
          value={newDrink.drinkName}
          onChange={handleName}
      />
      </label>
      <label>Drink Description (from menu)
      <input
          id='description'
          type="text"
          value={newDrink.description}
          onChange={handleDescription}
      />
      </label>
      <label>Price $
      <input
          id='price'
          type='number'
          value={newDrink.price}
          onChange={handlePrice}
      />
      </label>
    </> 
)
}