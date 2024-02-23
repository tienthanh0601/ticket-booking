import Booking from '../pages/Booking'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Home from './pages/Home'

export const routes = [
    {
        path: '/',
        page: <Home/>,
        isShowHeader: true
    },
    {
        path: '/search',
        page: <Booking/>,
        isShowHeader: true
    },
    {
        path: '/login',
        page: <Login/>,
        isShowHeader: true
    },
    {
        path: '/about',
        page: <Home/>,
        isShowHeader: true
    },
    {
        path: '/contact',
        page: <Home/>,
        isShowHeader: true
    },
    {
        path: '/register',
        page: <Register/>,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: <Profile/>,
        isShowHeader: true
    },
    {
        path: '/contact',
        page: <Home/>,
        isShowHeader: true
    },
]