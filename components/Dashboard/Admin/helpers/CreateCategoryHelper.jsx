import { useContext } from 'react';
import { ContextAdmin } from '../Context';
import { useForm } from 'react-hook-form';
import { resolve } from 'bluebird';

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

    const { reset } = useForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.name && inputs.description && inputs.image) {
            fetch('/api/AWS/s3', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(inputs),
            }).then(async (res) => {
                let result = await res.json();
                console.log('result', result);
                setState({
                    ...state,
                    success: result.success,
                    showAlert: true,
                    alertColor: 'success',
                });
                // setMessage(result.message);
                // setShowAlert(true);
                // setVariant('success');
            });
        } else {
            setMessage('All fields are required');
            setShowAlert(true);
            setVariant('danger');
        }
    };

    const handleSubmission = (data) => {
        console.log('data', data);
    };

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

    const handleFileUpload = async (data) => {
        const file = data[0];
        const base64 = await convertToBase64(file);
        setState({ ...state, file: base64 });
    };

    return {
        handleSubmission,
        handleFileUpload,
    };
};

export default Handler;
