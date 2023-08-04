import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';

export const mainNavBarItems = [
    {
        id: 0,
        icon: <TravelExploreIcon />,
        label: "Search",
        route: '/'
    },
    {
        id: 1,
        icon: <RocketLaunchIcon />,
        label: "Picture of the Day",
        route: '/potd'
    },
    {
        id: 2,
        icon: <InfoIcon />,
        label: "About",
        route: '/about'
    },
    {
        id: 3,
        icon: <EmailIcon />,
        label: "Sign up",
        route: '/subscribe'
    }
]