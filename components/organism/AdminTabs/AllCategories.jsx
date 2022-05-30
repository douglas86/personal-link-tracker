import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { GetRoute } from '../../../API/index2';
import { AdminContext } from '../../../Context/AdminContext';

import { alert } from '../../atom/alert';
import { spinner } from '../../atom/spinner';
import { Cards } from '../Cards';

const AllCategories = () => {
    const fetcher = GetRoute('/api/category').data;

    const context = useContext(AdminContext);
    const { showAlert } = context;

    return (
        <Container>
            {showAlert ? alert('primary', 'This is a message') : null}
            {fetcher !== undefined
                ? Object.entries(fetcher).map(([key, value]) => (
                      <div key={key}>
                          <div style={{ width: '20rem', height: '12rem', padding:'2%' }}>
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
