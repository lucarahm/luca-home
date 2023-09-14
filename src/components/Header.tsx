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

export default function Header() {
    const pages = [
        {text: 'Home', href: '/', icon: HomeIcon},
        {text: 'Strava', href: '/starred', icon: StarIcon},
        {text: 'Plants', href: '/plants', icon: ChecklistIcon},
    ];

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{backgroundColor: 'background.paper'}}>
                {/* Menu for Desktop view */}
                <Link href="/" style={{textDecoration: "none", color: "inherit"}}>
                    <CoffeeIcon
                        sx={{
                            mr: 2,
                            width: 30,
                            height: 60,
                            display: {xs: 'flex', md: 'flex'},
                        }}
                    />
                </Link>
                <Link href="/" style={{textDecoration: "none", color: "inherit"}}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            display: {xs: 'flex', md: 'flex'},
                            textDecoration: 'none',
                        }}
                    >
                        LucaHome
                    </Typography>
                </Link>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'flex'}}}>
                    {pages.map((page) => (
                        <Link key={page.text} href={page.href} style={{textDecoration: "none", color: "inherit"}}>
                            <Button
                                key={page.text}
                                sx={{ml: 4, color:'inherit' ,display: 'block'}}
                            >
                                {page.text}
                            </Button>
                        </Link>
                    ))}
                </Box>

            </Toolbar>
        </AppBar>
    );
}

