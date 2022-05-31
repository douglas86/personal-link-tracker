import { useState } from 'react';
import { label } from '../../atom/label';
import { RadioButton } from '../../atom/radio';
// import { radioButtons } from '../../molecule/radioButtons';

const ReadLinks = () => {
    const radioButtons = ['All Links', 'My Links'];

    const handleChange = (index) => {
        console.log('i', index);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {radioButtons.map((items, index) => (
                <div
                    key={index}
                    style={{ display: 'inline-block', marginRight: '10px' }}
                >
                    <RadioButton
                        value={items}
                        checked={index === 0}
                        onChange={() => handleChange(radioButtons[index])}
                    />{' '}
                    {items}
                </div>
            ))}
        </div>
    );
};

export default ReadLinks;
