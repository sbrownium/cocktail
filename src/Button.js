import React from 'react';

export default function Button({handleClick, value}) {
    return (
        <button
            onClick={handleClick}
            onKeyDown={(e) =>
              e.key === 'Enter' ? handleClick(e) : ''
            }
        >{value}</button>
    )
};