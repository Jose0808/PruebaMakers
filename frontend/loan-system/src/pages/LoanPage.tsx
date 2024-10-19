import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText, CardContent, Card } from '@mui/material';
import HeaderPage from './Headerpage';

interface Loan {
    amount: number;
    status: string;
}

const LoanPage = () => {
    const [amount, setAmount] = useState<number>(0);
    const [loans, setLoans] = useState<Loan[]>([]);

    const handleRequestLoan = async () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        try {
            const response = await axios.post<Loan>(
                '/api/loans/request',
                { user, amount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLoans([...loans, response.data]);
        } catch (error) {
            console.error('Failed to request loan', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <HeaderPage></HeaderPage>
            <Container maxWidth="sm" sx={{ mt: 4 }}>

                <Card sx={{
                    backgroundColor: '#e2e2e2'
                }}>
                    <CardContent>
                        <Button
                            variant="outlined"
                            disableElevation
                            sx={{
                                backgroundColor: '#ffffff'
                            }}
                        >
                            Préstamos
                        </Button>
                    </CardContent >
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" align="center" gutterBottom>
                            Solicitar Préstamo
                        </Typography>
                        <Typography variant="h5" align="center" gutterBottom>
                            Ingrese el monto que desea Solicitar
                        </Typography>
                        <Box component="form" noValidate autoComplete="off">
                            <TextField
                                fullWidth
                                label="Monto"
                                type="number"
                                variant="outlined"
                                margin="normal"
                                value={amount}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleRequestLoan}
                                sx={{ mt: 2 }}
                            >
                                Solicitar
                            </Button>
                        </Box>

                    </CardContent >
                </Card>
                <Card variant="outlined" sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                            Mis Prestamos
                        </Typography>
                        <List>
                            {loans.map((loan, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`Monto: ${loan.amount}`}
                                        secondary={`Estado: ${loan.status}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent >
                </Card>
            </Container>
        </Container>
    );
};

export default LoanPage;
