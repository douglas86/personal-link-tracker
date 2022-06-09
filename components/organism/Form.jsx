import 'quill/dist/quill.snow.css';
import { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useQuill } from 'react-quilljs';

import OnSubmit from './OnSubmit';
import { AdminContext } from '../../Context/AdminContext';
import { inputForm } from '../molecule/inputForm';
import { submitButton } from '../atom/button';

const Form = () => {
    const context = useContext(AdminContext);
    const { handleSubmit, handleImage } = OnSubmit();
    const {
        isTab,
        setisTab,
        isForm,
        setIsForm,
        content,
        setContent,
        imageUploadButtonName,
    } = context;

    const { quill, quillRef } = useQuill();

    useEffect(() => {
        if (quill) {
            if (content !== '') {
                quill.clipboard.dangerouslyPasteHTML(`${content}`);
            }
            quill.on('text-change', (delta, oldDelta, source) => {
                setContent(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill, quillRef, content, isTab, setContent]);

    console.log('isForm', isForm);
    console.log('content', content);

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
                {submitButton(
                    handleSubmit,
                    isForm.buttonText,
                    'btn btn-outline-warning'
                )}
            </form>
        </Container>
    );
};

export default Form;
