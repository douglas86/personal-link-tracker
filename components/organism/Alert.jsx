import { useState } from 'react';
import { alert } from '../atom/alert';

const Alert = () => {
    const [color, setColor] = useState();
    const [message, setMessage] = useState('');

    return <>{alert(color, message)}</>;
};

export default Alert;
