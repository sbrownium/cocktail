import React, {useState} from "react";

export default function NewBar () {
    const [newBarName, setNewBarName] = useState('');
    return (
        <>
            <label for='newBar'>New Bar Name</label>
            <input
              id='newBar'
              type="text"
              value={newBarName}
              onChange={e => setNewBarName(e.target.value)}
            />
        </>
    )
}