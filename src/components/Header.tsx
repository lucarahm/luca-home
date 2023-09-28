"use client"

import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ChecklistIcon from "@mui/icons-material/Checklist";
import {Avatar, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useRouter} from 'next/navigation'


const pages = [
    {text: 'Home', href: '/', icon: HomeIcon},
    {text: 'Strava', href: '/starred', icon: StarIcon},
    {text: 'Plants', href: '/plants', icon: ChecklistIcon},
];

const settings = ['Account', 'Logout'];


export default function Header() {
    const router = useRouter();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{backgroundColor: 'background.paper'}}>
                {/* Menu for Desktop view */}
                <Link href="/" style={{textDecoration: "none", color: "inherit"}}>
                    <CoffeeIcon
                        sx={{
                            mr: 2,
                            width: 30,
                            height: 60,
                            display: {xs: 'none', md: 'flex'},
                        }}
                    />
                </Link>
                <Link href="/" style={{textDecoration: "none", color: "inherit"}}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            textDecoration: 'none',
                        }}
                    >
                        LucaHome
                    </Typography>
                </Link>

                {/*Menu for mobile view*/}
                {/*1. Hamburger menu on the left*/}
                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page.text}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Link href="/" style={{textDecoration: "none", color: "inherit"}}>
                    <CoffeeIcon
                        sx={{
                            mr: 1,
                            display: {xs: 'flex', md: 'none'},
                        }}
                    />
                </Link>
                <Link href="/" style={{textDecoration: "none", color: "inherit"}}>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 8,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontWeight: 500,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LucaHome
                    </Typography>
                </Link>


                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {pages.map((page) => (
                        <Button
                            key={page.text}
                            onClick={() => router.push(page.href)}
                            sx={{ml: 4, color: 'inherit', display: 'block'}}
                        >
                            {page.text}
                        </Button>
                    ))}
                </Box>


                <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="Luca Rahm" src="/static/images/avatar/2.jpg"/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

            </Toolbar>
        </AppBar>
    );
}
