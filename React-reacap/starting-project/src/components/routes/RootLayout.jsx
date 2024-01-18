import { Outlet } from 'react-router-dom';
import MainHeader from '../mainHeader/MainHeader';

function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;
