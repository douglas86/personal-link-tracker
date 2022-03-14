import withAdmin from '../withAdmin';

const Admin = () => {
  return <h1>This is the Admin Dashboard</h1>;
};

export default withAdmin(Admin);
