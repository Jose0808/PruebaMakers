import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const HeaderPage = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    const handleSingOut = async () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Bienvenido, {user}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSingOut}
                sx={{ ml: 2, mb: 1 }}
            >
                Cerrar Sesión
            </Button>
        </Box >
    );
};

export default HeaderPage;
