import { useContext } from 'react';
import { ContextAdmin } from '../Context';

const Helpers = (inputs) => {
    const context = useContext(ContextAdmin);

    const posting = () => {
        try {
            fetch('/api/AWS/s3', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(inputs),
            }).then(async (res) => {
                let result = await res.json();
                context.setMessage(result.message);
                context.setShowAlert(true);
                context.setVariant('success');
            });
        } catch (err) {
            console.log(err);
        }
    };

    return posting();
};

export default Helpers;
