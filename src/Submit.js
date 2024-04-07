import React from 'react';
import './Submit.css'

export default function Submit({handleClick, value}) {
    return (
        <input
            type="submit"
            value={value}
            onClick={handleClick}
            onKeyDown={(e) =>
              e.key === 'Enter' ? handleClick(e) : ''
            }
        />
    )
};