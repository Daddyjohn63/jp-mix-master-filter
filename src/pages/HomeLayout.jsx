import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
//import { displayValue } from '@tanstack/react-query-devtools/build/lib/utils';
//by using Outlet, all elements around it will be published in all pages
const HomeLayout = () => {
  const navigation = useNavigation();
  //console.log(navigation);
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
      <Navbar />
      <section className="page">
        {isPageLoading ? <div className="loading" /> : <Outlet />}
      </section>
    </>
  );
};
export default HomeLayout;
