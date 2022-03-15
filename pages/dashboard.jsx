const Dashboard = () => {
    const Role = (role) => {
        switch (role) {
            case 'admin':
                return <Admin />;
            default:
                return <Subscriber />;
        }
    };

    return <h1>This is the Dashboard</h1>;
};

export default Dashboard;
