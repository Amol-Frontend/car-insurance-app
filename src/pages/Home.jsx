import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Home() {

    //const navigate = use();
    const navigate = useNavigate();


    const navItems = [
        { name: 'Car', path: "/car-quote", image: "" },
        { name: 'Bike', path: "", image: "" },
        { name: 'Health', path: "", image: "" },
        { name: 'Commercial', path: "", image: "" },
        { name: 'Home', path: "", image: "" },
        { name: 'Travel', path: "", image: "" },
        { name: 'Renewals', path: "", image: "" },
    ]

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>


                <AppBar position="static" color="default" sx={{ marginTop: '10px' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, py: 1, cursor: 'pointer' }}>
                        {
                            navItems.map((item, index) => (
                                <Typography variant='body1' sx={{ marginTop: '10px', gap: '6', marginLeft: '10px', fontWeight: 600 }}> <Link onClick={() => navigate(item.path)}>{item.name}</Link>
                                </Typography>
                            ))
                        }
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}

export default Home