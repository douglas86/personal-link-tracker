import { useState } from 'react';
import { RadioButtonmap } from '../../molecule/radioButtonmap';

const ReadLinks = () => {
    const radioButtons = ['All Links', 'My Links'];

    const handleChange = (index) => {
        console.log('iu', index);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <RadioButtonmap array={radioButtons} handleChange={handleChange} />
        </div>
    );
};

export default ReadLinks;
