import { useContext } from 'react';

import { useRouter } from 'next/router';

import { AdminContext } from '../Context/AdminContext';

const actionCreators = () => {
    const { alert, setAlert } = useContext(AdminContext);
    const router = useRouter();

    const postCreators = (props) => {
        const { status, message } = props;
        setAlert({
            ...alert,
            showAlert: true,
            alertColor: status !== 200 ? 'danger' : 'success',
            alertMessage: message,
        });
        router.reload(window.location.pathname);
    };

    const putCreators = (props) => {
        const { status, message } = props;
        setAlert({
            ...alert,
            showAlert: true,
            alertColor: status !== 200 ? 'danger' : 'success',
            alertMessage: message,
        });
        router.reload(window.location.pathname);
    };

    const deleteCreators = (props) => {
        const { status, message } = props;
        setAlert({
            ...alert,
            showAlert: true,
            alertColor: status !== 200 ? 'danger' : 'success',
            alertMessage: message,
        });
        router.reload(window.location.pathname);
    };

    return { postCreators, putCreators, deleteCreators };
};

export default actionCreators;
