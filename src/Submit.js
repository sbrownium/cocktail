import React from 'react';

export default function Submit({handleClick}) {
    return (
        <input
            type="submit"
            value="add"
            onClick={handleClick}
            onKeyDown={(e) =>
              e.key === 'Enter' ? handleClick(e) : ''
            }
        />
    )
};