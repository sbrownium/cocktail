import React from 'react';
import './Button.css'

export default function Button({handleClick, children, className}) {
    return (
        <button
            className={className}
            onClick={handleClick}
            onKeyDown={(e) =>
              e.key === 'Enter' ? handleClick(e) : ''
            }
        >{children}</button>
    )
};