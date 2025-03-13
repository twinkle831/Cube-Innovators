// import { Avatar, Button, MenuItem, Toolbar, TextField } from '@mui/material';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { FaMoon, FaSun } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../../redux/theme/themeSlice';
// import { signoutSuccess } from '../../redux/user/userSlice';
// import { useEffect, useState } from 'react';

// export default function Header() {
//   const path = useLocation().pathname;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);
//   const { theme } = useSelector((state) => state.theme);
// //   const [searchTerm, setSearchTerm] = useState('');

// //   useEffect(() => {
// //     const urlParams = new URLSearchParams(location.search);
// //     const searchTermFromUrl = urlParams.get('searchTerm');
// //     if (searchTermFromUrl) {
// //       setSearchTerm(searchTermFromUrl);
// //     }
// //   }, [location.search]);

//   const handleSignout = async () => {
//     try {
//       const res = await fetch('/api/user/signout', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signoutSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const urlParams = new URLSearchParams(location.search);
// //     urlParams.set('searchTerm', searchTerm);
// //     const searchQuery = urlParams.toString();
// //     navigate(`/search?${searchQuery}`);
// //   };

//   return (
//     <Toolbar className='border-b-2'>
//       <Link
//         to='/'
//         className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
//       >
//         <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
//           Kushal
//         </span>
//         ABCD
//       </Link>
    
//       <Button className='w-12 h-10 lg:hidden' color='gray' pill>
//         <AiOutlineSearch />
//       </Button>
//       <div className='flex gap-2 md:order-2'>
//         <Button
//           className='w-12 h-10 hidden sm:inline'
//           color='gray'
//           pill
//           onClick={() => dispatch(toggleTheme())}
//         >
//           {theme === 'light' ? <FaSun /> : <FaMoon />}
//         </Button>
//         {currentUser ? (
//           <MenuItem
//             arrowIcon={false}
//             inline
//             label={
//               <Avatar alt='user' img={currentUser.profilePicture} rounded />
//             }
//           >
//             <MenuItem.Header>
//               <span className='block text-sm'>@{currentUser.username}</span>
//               <span className='block text-sm font-medium truncate'>
//                 {currentUser.email}
//               </span>
//             </MenuItem.Header>
//             <Link to={'/dashboard?tab=profile'}>
//               <MenuItem.Item>Profile</MenuItem.Item>
//             </Link>
//             <MenuItem.Divider />
//             <MenuItem.Item onClick={handleSignout}>Sign out</MenuItem.Item>
//           </MenuItem>
//         ) : (
//           <Link to='/sign-in'>
//             <Button gradientDuoTone='purpleToBlue' outline>
//               Sign In
//             </Button>
//           </Link>
//         )}
//         <Toolbar.Toggle />
//       </div>
//       <Toolbar.Collapse>
//         <Toolbar.Link active={path === '/'} as={'div'}>
//           <Link to='/'>Home</Link>
//         </Toolbar.Link>
//         <Toolbar.Link active={path === '/about'} as={'div'}>
//           <Link to='/about'>About</Link>
//         </Toolbar.Link>
//         <Toolbar.Link active={path === '/dashboard'} as={'div'}>
//           <Link to='/dashboard'>Dashboard</Link>
//         </Toolbar.Link>
//       </Toolbar.Collapse>
//     </Toolbar>
//   );
// }

import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button, Menu, MenuItem, Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { signoutSuccess } from '../../redux/user/userSlice';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position='static' sx={{ background: 'linear-gradient(135deg, #3A1C71, #D76D77, #FFAF7B)', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Box component={Link} to='/' sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>Career Advisor</Typography>
        </Box>

        {/* Search Button (Mobile) */}
        {/* <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}>
          <AiOutlineSearch />
        </IconButton> */}

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Theme Toggle */}
          <IconButton sx={{ color: 'white' }} onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </IconButton>

          {/* User Menu */}
          {currentUser ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar alt='user' src={currentUser.profilePicture} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>{currentUser.username}</MenuItem>
                <MenuItem onClick={handleSignout}>Sign out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={Link} to='/sign-in' sx={{ color: 'white', borderColor: 'white' }} variant='outlined'>
              Sign In
            </Button>
          )}
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {['Home', 'About', 'Sign-Up', 'Resume-Builder', 'Profile-Form', 'Career-Assessment'].map((item, index) => (
            <Button key={index} component={Link} to={`/${item.toLowerCase()}`}
              sx={{
                color: 'white',
                fontWeight: path === `/${item.toLowerCase()}` ? 'bold' : 'normal',
                borderBottom: path === `/${item.toLowerCase()}` ? '2px solid #FFAF7B' : 'none',
                '&:hover': { color: '#FFAF7B' },
              }}>
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
