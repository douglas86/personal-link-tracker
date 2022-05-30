import { useContext } from 'react';
import Resizer from 'react-image-file-resizer';

import { AdminContext } from '../../Context/AdminContext';

const OnSubmit = () => {
    const context = useContext(AdminContext);
    const { isTab, isForm, setIsForm, setImageUploadButtonName, content } =
        context;
    const { title, image } = isForm;

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = { title, image, content };
        if (isTab === 'create') {
            console.log('body', body);
            setIsForm({ ...isForm, buttonText: 'Creating' });
        }
    };

    const handleImage = (event) => {
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        setImageUploadButtonName(event.target.files[0].name);
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    event.target.files[0],
                    300,
                    300,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        setIsForm({
                            ...isForm,
                            image: uri,
                        });
                    },
                    'base64',
                    200,
                    200
                );
            } catch (err) {
                console.log('err', err);
            }
        }
    };

    return {
        handleSubmit,
        handleImage,
    };
};

export default OnSubmit;
