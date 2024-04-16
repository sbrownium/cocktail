import React from "react";

export default function RadioButton ({radioName, value, handleChange, checked}) {
    return (
        <label>
                <input
                    type="radio"
                    name={radioName}
                    value={value}
                    onChange={handleChange}
                    checked={(checked === value)}
                    />
                    {value}
                </label>
    )
}