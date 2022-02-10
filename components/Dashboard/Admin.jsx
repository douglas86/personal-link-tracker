import CreateCategory from './Admin/CreateCategory';

const Admin = () => {
    return (
        <div>
            <h1>This is the admin page</h1>
            <button onClick={() => CreateCategory}>Create Category</button>
        </div>
    );
};

export default Admin;
