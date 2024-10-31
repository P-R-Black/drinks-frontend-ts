import React, { useState } from 'react'
import './tooltip.css'
import { ToolTipProps } from '../../types';


export const ToolTip: React.FC<ToolTipProps> = ({ text, children }) => {
    const [isVisible, setisVisible] = useState(false)

    return (
        <div className='tooltip_container'
            onMouseEnter={() => setisVisible(true)}
            onMouseLeave={() => setisVisible(false)}
        >{children}

            {isVisible && <div className="tooltip">{text}</div>}

        </div>
    )
};

export const ToolTipTwo: React.FC<ToolTipProps> = ({ text, children }) => {
    const [isVisible, setisVisible] = useState(false)

    return (
        <div className='tooltip_container_two'
            onMouseEnter={() => setisVisible(true)}
            onMouseLeave={() => setisVisible(false)}
        >{children}

            {isVisible && <div className="tooltip_two">{text}</div>}

        </div>
    )
};
