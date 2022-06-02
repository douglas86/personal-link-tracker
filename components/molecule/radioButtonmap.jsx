import { RadioButton } from '../atom/button';

export const RadioButtonmap = ({ array, handleChange }) => {
    return (
        <>
            {array.map((items, index) => (
                <div
                    key={index}
                    style={{
                        display: 'inline-block',
                        marginRight: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <RadioButton
                        value={items}
                        checked={index === 0}
                        onChange={() => handleChange(array[index])}
                    />{' '}
                    {items}
                </div>
            ))}
        </>
    );
};
