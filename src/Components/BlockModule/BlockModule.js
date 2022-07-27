import React from 'react';
import './BlockModule.css'
import classNames from "classnames";


const BlockModule = ({children, fullWidth = false}) => {
    return (
        <div className={classNames('block-module__wrap', {'block-module__wrap_w-100': fullWidth})}>
            {children}
        </div>
    );
};

export {BlockModule};
