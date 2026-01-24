import {Navigate,Outlet} from 'react-router-dom';
import { useAppSelector } from '../store/store';

const PrivateRoute = () => {
     const {user} = useAppSelector(state => state.auth);
  return (
    user ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoute