import useStore from '../Hooks/store';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const store = useStore();

    return(
        store.authenticated ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;
