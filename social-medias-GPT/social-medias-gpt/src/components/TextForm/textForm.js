import React from 'react';
import './textForm.css';

const TextForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div> 
            <p className='f5'>
                {'JRJ Enterprises take an article and output social media posts. Give it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-90 center' type='text' onChange={onInputChange} />
                    <button 
                        className='w-20 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}
                    >Submit</button>
                </div>
            </div>
        </div>
    );
}

export default TextForm;