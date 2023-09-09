import React from 'react';
import DashboardChild from './Components/DashboardChild';

const Dashboard = () => {
  return (
    <div>
      <React.Fragment>
        <div className='lg:px-4 md:px-3 px-1' >
          <DashboardChild />
        </div>
      </React.Fragment>
    </div>
  );
}

export default Dashboard;
