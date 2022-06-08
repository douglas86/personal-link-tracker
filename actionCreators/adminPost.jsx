import { useContext } from 'react';

import { useRouter } from 'next/router';

import { AdminContext } from '../Context/AdminContext';
import { AlertContext } from '../Context/AlertContext';

const actionCreators = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { alert, setAlert, setIsTab } = useContext(AdminContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { alerts, setAlerts } = useContext(AlertContext);
    const { show, color, message } = alerts;

    const postCreators = (props) => {
        const { status, message } = props;
        const color = status === 200 ? 'success' : 'danger';
        setAlerts({ show: true, color, message });
        setIsTab('all');
    };

    const putCreators = (props) => {
        const { status, message } = props;
        setAlerts({
            ...alert,
            showAlert: true,
            alertColor: status !== 200 ? 'danger' : 'success',
            alertMessage: message,
        });
        router.reload(window.location.pathname);
    };

    const deleteCreators = (result) => {
        const { status, message } = result;
        console.log('result', result);
        const color = status === 200 ? 'success' : 'danger';
        setAlerts({ show: true, color, message });
    };

    return { postCreators, putCreators, deleteCreators };
};

export default actionCreators;
