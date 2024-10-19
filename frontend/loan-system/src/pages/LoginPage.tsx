import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, CardContent, Card } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post<{ token: string }>('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
                        navigate('/loans');//response.data.naivgate
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Iniciar Sesión
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom>
                        Ingrese sus credenciales para acceder
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            sx={{ mt: 2 }}
                        >
                            Ingresar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>

    );
};

export default LoginPage;
