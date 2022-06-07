import actionTypes, { Fetcher } from '../actionTypes/apiCalls.jsx';
import Alert from '../components/organism/Alert';

export const pagination = async (endpoint) => {
    return await fetch(endpoint).then((res) => res.json());
};

export const GetRoute = (endpoint) => {
    return Fetcher(endpoint);
};

// const Api = () => {
//     const { showAlert } = Alert();

//     const DeleteRoute = (endpoint, id) =>
//         fetch(endpoint, {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(id),
//         }).then(async (items) => {
//             let result = await items.json();
//             console.log('result', result);
//             console.log('showAlert', showAlert);
//         });
//     return {
//         DeleteRoute,
//     };
// };

// export default Api;

// export const DeleteRoute = (endpoint, id) =>
//     fetch(endpoint, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(id),
//     }).then(async (items) => {
//         const { showAlert } = Alert();
//         let result = await items.json();
//         console.log('result', result);
//         console.log('showAlert', showAlert);
//     });

const AdminApis = () => {
    const { postActions, putActions, deleteActions } = actionTypes();

    // create
    const Posting = (endpoint, body) => {
        postActions(endpoint, body);
    };

    // update
    const Putting = (endpoint, body) => {
        putActions(endpoint, body);
    };

    // delete
    const Deleting = (endpoint, body) => {
        deleteActions(endpoint, body);
    };

    return { Posting, Putting, Deleting };
};

export default AdminApis;
