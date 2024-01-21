import React, { useState } from "react";
import './textOutput.css';

const textOutput = ({ status }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>                
                <div className='response'>
                    {status ? status : "Your output will appear here."}
                </div>
            </div>
        </div>
    );
}

export default textOutput;
