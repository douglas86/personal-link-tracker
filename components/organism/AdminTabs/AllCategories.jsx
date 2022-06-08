import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { GetRoute } from '../../../API/index';

import { spinner } from '../../atom/spinner';
import styles from './AllCategories.module.css';
import { alert } from '../../atom/alert';
import Api from '../../../API';

import Handler from '../Handler';
import { updateDeleteCategory } from '../../molecule/updateDeleteCategory';

import { AdminContext } from '../../../Context/AdminContext';
import { AlertContext } from '../../../Context/AlertContext';

const AllCategories = () => {
    const { handleConfirm, handleUpdate } = Handler();

    const alertContext = useContext(AlertContext);
    const fetcher = GetRoute('/api/category').data;

    return (
        <Container>
            {alertContext.alerts.show
                ? alert(alertContext.alerts.color, alertContext.alerts.message)
                : null}
            {fetcher !== undefined
                ? Object.entries(fetcher).map(([key, value]) => (
                      <div key={key} className={styles.flex}>
                          {updateDeleteCategory(
                              value,
                              handleConfirm,
                              handleUpdate
                          )}
                      </div>
                  ))
                : spinner()}
        </Container>
    );
};

export default AllCategories;
