import { radio } from '../atom/radio';
import { label } from '../atom/label';

export const radioButtons = (arrayOfNames) => (
    <>
        {arrayOfNames.map((items, index) => (
            <div
                key={index}
                style={{
                    display: 'flex',
                    marginRight: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <radio
                    handleClick={handleclick}
                    key={index}
                    index={index}
                    checked={buttons[index]}
                />{' '}
                {label(items)}
            </div>
        ))}
    </>
);
