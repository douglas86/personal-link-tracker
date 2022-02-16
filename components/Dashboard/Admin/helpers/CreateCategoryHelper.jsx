import { useContext } from 'react';
import { ContextAdmin } from '../Context';

const Handler = () => {
    const context = useContext(ContextAdmin);
    const {
        setMessage,
        setShowAlert,
        setVariant,
        inputs,
        setInputs,
        state,
        setState,
    } = context;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.name && inputs.description && inputs.image) {
            fetch('/api/AWS/s3', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(inputs),
            }).then(async (res) => {
                try {
                    let result = await res.json();
                    setState({ ...state, success: result.success });
                    // setMessage(result.message);
                    // setShowAlert(true);
                    // setVariant('success');
                } catch (error) {
                    // let error = err.json();
                    console.log('err', JSON.stringify(error));
                    // setState({ ...state, error: err.error });
                    // context.setMessage(error.error);
                    // context.setShowAlert(true);
                    // context.setVariant('danger');
                }
            });
        } else {
            setMessage('All fields are required');
            setShowAlert(true);
            setVariant('danger');
        }
    };

    console.log('state', state);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setInputs({ ...inputs, image: base64 });
    };

    return {
        handleSubmit,
        handleFileUpload,
    };
};

export default Handler;
