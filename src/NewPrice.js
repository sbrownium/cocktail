import React, { useState } from 'react';

export default function NewPrice () {
    const [price, setPrice] = useState('');
    return (
        <>
            <label for='price'>Price $</label>
            <input
              id='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}$
            />
        </>
    )
}