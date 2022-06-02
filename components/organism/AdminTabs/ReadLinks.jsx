import { useState } from 'react';
import { Container } from 'react-bootstrap';

import { RadioButtonmap } from '../../molecule/radioButtonmap';
import AllLinks from './AllLinks';
import MyLinks from './MyLinks';

const ReadLinks = () => {
    const [radioButton, setRadioButton] = useState(<AllLinks />);
    const radioButtons = ['All Links', 'My Links'];

    const handleChange = (index) => {
        switch (index) {
            case 'My Links':
                setRadioButton(<MyLinks />);
                break;
            default:
                setRadioButton(<AllLinks />);
                break;
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Container>
                <RadioButtonmap
                    array={radioButtons}
                    handleChange={handleChange}
                />
                {radioButton}
            </Container>
        </div>
    );
};

export default ReadLinks;
