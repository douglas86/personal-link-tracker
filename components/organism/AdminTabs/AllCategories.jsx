import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { GetRoute } from '../../../API/index2';
import { AdminContext } from '../../../Context/AdminContext';

import { displayAlert } from '../../atom/displayAlert';
import { spinner } from '../../atom/spinner';
import { Cards } from '../Cards';
import styles from './AllCategories.module.css';

const AllCategories = () => {
    const fetcher = GetRoute('/api/category').data;

    const context = useContext(AdminContext);
    const { alert } = context;
    const { showAlert, alertColor, alertMessage } = alert;

    return (
        <Container>
            {showAlert ? displayAlert(alertColor, alertMessage) : null}
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
                              {Cards(
                                  `/links/${value.title}`,
                                  `data:image/jpeg;base64,${value.image}`,
                                  250,
                                  180,
                                  value.title
                              )}
                          </div>
                      </div>
                  ))
                : spinner()}
        </Container>
    );
};

export default AllCategories;
