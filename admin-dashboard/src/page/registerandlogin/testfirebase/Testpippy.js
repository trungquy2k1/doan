import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Button from '../../../component/Button/Button';

const Tippy = () => {
    const [showContainer, setShowContainer] = useState(false);

    const handleClick = () => {
        setShowContainer(!showContainer);
    };

    return (
        <div>
            <Tooltip title="" position="top" trigger="click">
                <button onClick={handleClick}>Click me</button>
            </Tooltip>

            {showContainer && (
                <div>
                    {/* <button>Button 1</button> */}
                    <Button title="Button1" />
                    <Button title="Button2" />
                </div>
            )}
        </div>
    );
};

export default Tippy;
