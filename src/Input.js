import React from "react";

export default function Input ({inputName, type, value, handleChange, checked}) {
    return (
        <label>
                <input
                    type={type}
                    name={inputName}
                    value={value}
                    onChange={handleChange}
                    checked={checked === value}
                    />
                    {value}
                </label>
    )
}