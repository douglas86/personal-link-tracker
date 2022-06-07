import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { GetRoute } from '../../../API/index2';
import { AlertContext } from '../../../Context/AlertContext';

import { spinner } from '../../atom/spinner';
import { card } from '../../molecule/card';
import styles from './AllCategories.module.css';
import { alert } from '../../atom/alert';
import Api from '../../../API';

const AllCategories = () => {
    const alertContext = useContext(AlertContext);

    const fetcher = GetRoute('/api/category').data;
    const { deleteRoute } = Api();

    const handleUpdate = (id, title, image) =>
        console.log('update was clicked', id, title, image);

    const handleDelete = (id) => deleteRoute('/api/category', id);

    return (
        <Container>
            {alertContext.alerts.show
                ? alert(alertContext.alerts.color, alertContext.alerts.message)
                : null}
            {fetcher !== undefined
                ? Object.entries(fetcher).map(([key, value]) => (
                      <div key={key} className={styles.flex}>
                          <div
                              style={{
                                  width: '20rem',
                                  height: '12rem',
                                  padding: '2%',
                              }}
                          >
                              {card(value, handleDelete, handleUpdate)}
                          </div>
                      </div>
                  ))
                : spinner()}
        </Container>
    );
};

export default AllCategories;
