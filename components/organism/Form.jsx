import 'quill/dist/quill.snow.css';
import { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useQuill } from 'react-quilljs';

import OnSubmit from './OnSubmit';
import { AdminContext } from '../../Context/AdminContext';
import { inputForm } from '../molecule/inputForm';

const Form = () => {
    const context = useContext(AdminContext);
    const { handleSubmit, handleImage } = OnSubmit();
    const { isForm, setIsForm, content, setContent, imageUploadButtonName } =
        context;

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                setContent(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill, quillRef, setContent]);

    console.log('isForm', isForm);

    return (
        <Container>
            <form>
                {inputForm(
                    'Name',
                    'Category title goes here ...',
                    isForm,
                    setIsForm
                )}
                <div className="form-group">
                    <div
                        style={{
                            width: '100%',
                            height: 100,
                            marginTop: '20px',
                            marginBottom: '50px',
                        }}
                    >
                        <div ref={quillRef} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="btn btn-outline-secondary">
                        {imageUploadButtonName}
                        <input
                            onChange={handleImage}
                            type="file"
                            accept="image/*"
                            className="form-control"
                            hidden
                        />
                    </label>
                </div>
                <div className="form-group">
                    <button
                        style={{ margin: '0.5%' }}
                        className="btn btn-outline-warning"
                        onClick={handleSubmit}
                    >
                        {isForm.buttonText}
                    </button>
                </div>
            </form>
        </Container>
    );
};

export default Form;
