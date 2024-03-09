import React from 'react';

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