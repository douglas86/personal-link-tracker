import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import helpers from './helpers';
import { AdminContext } from '../../../Context/Dashboard/Admin/AdminContext';
import All_links from './All_links';
import My_links from './My_links';

const ReadLinks = () => {
  const context = useContext(AdminContext);

  const { radio } = helpers();
  const { linksTab } = context;

  return (
    <div>
      <Container>
        {radio()}
        {linksTab.title === 'All Links' ? <All_links /> : <My_links />}
      </Container>
    </div>
  );
};

export default ReadLinks;
