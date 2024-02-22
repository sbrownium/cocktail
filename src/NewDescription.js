import React, { useState } from 'react';

export default function NewDescription (){
    const [description, setDescription] = useState('');
    return (
        <>
            <label for='description'>Drink Description (from menu)</label>
            <input
              id='description'
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
        </>
    )
}