import React, { useState, useContext } from 'react';
import { ref, child, push, update } from "firebase/database";
import { db } from "./firebase.js";
import { UserContext } from './UserContext.js';

export default function NewDrink ({bars}){
    const [drinkName, setDrinkName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [selectedBar, setSelectedBar] = useState('');
    const [user, setUser] = useContext(UserContext);
    const { userID } = user
    const barsArray = Object.values(bars);
  function handleClick(e){
    e.preventDefault();
      if (!user) { 
          return (
            alert('Please login to add a drink')
          )
      }
      else {
          const newDrinkKey = push(child(ref(db), '/drinks/')).key;
          const updates = {};
          const barIDToObject = barsArray.find(({ barID }) => barID === selectedBar);
          const barIDToBarName = barIDToObject.barName
          const newDrink = {
            barID: selectedBar,
            barName: barIDToBarName,
            drinkID: newDrinkKey,
            drinkName: drinkName,
            description: description,
            price: Number(price),
            userID: userID,
            timeStamp: performance.timeOrigin
          };
      setDrinkName('');
      setDescription('');
      setPrice('');
      setSelectedBar('');
      updates['/drinks/' + newDrinkKey] = newDrink;
      return (
          update(ref(db), updates).then(() => {
              console.log('Data saved successfully!')
        })
        .catch((error) => {
          console.log('problem writing')
        })
      )}}
      const uniqueBars = new Set();
      return (
        <>
          <form>
            <label for='barSelect'>Bar</label>
          <select name='barSelect' 
          value={selectedBar} 
          onChange={e => setSelectedBar(e.target.value)}>
            <option value=''>Please choose a bar</option> 
            {barsArray.map(({ barName, barID }, index) => {
              if (!uniqueBars.has(barID)) {
                uniqueBars.add(barID);
                return (
                  <option key={index} dataID={barID} value={barID}>{barName}</option>
                )
              }})}
            <option value='New'>New</option>
            </select>
            <label for='drinkName'>Name of Drink</label>
            <input
              id='drinkName'
              type="text"
              value={drinkName}
              onChange={(e) => setDrinkName(e.target.value)}
            />
            <label for='description'>Drink Description (from menu)</label>
            <input
              id='description'
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label for='price'>Price $</label>
            <input
              id='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}$
            />
            <input
              type="submit"
              value="add"
              onClick={handleClick}
              onKeyDown={(e) =>
                e.key === 'Enter' ? handleClick(e) : ''
              }
            />
          </form>
        </>
      )}
    