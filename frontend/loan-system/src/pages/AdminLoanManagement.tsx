import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';
import HeaderPage from './Headerpage';

interface Loan {
    userEmail: string;
    amount: number;
    status: 'pendiente' | 'aprobado' | 'rechazado';
}

const AdminLoanManagement: React.FC = () => {
    const [loans, setLoans] = useState<Loan[]>([
        { userEmail: 'usuario@test.com', amount: 1000, status: 'pendiente' },
        { userEmail: 'usuario@test.com', amount: 2000, status: 'aprobado' }
    ]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleApprove = (index: number) => {
        const updatedLoans = [...loans];
        updatedLoans[index].status = 'aprobado';
        setLoans(updatedLoans);
    };

    const handleReject = (index: number) => {
        const updatedLoans = [...loans];
        updatedLoans[index].status = 'rechazado';
        setLoans(updatedLoans);
    };

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('/api/loans/get',         
                   { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            throw error; // Lanza el error para que pueda ser manejado donde se llame
        }
    };

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const result = await fetchData();
    //             setLoans(result);
    //         } catch (err) {
    //             setError('Error al cargar los datos');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     getData();
    // }, []);

    // if (loading) return <div>Cargando...</div>;
    // if (error) return <div>{error}</div>;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <HeaderPage></HeaderPage>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Gestionar Solicitudes de Préstamos
                    </Typography>

                    {loans.map((loan, index) => (
                        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                            <Typography>
                                Usuario: {loan.userEmail} - Monto: ${loan.amount} - Estado: {loan.status}
                            </Typography>

                            {loan.status === 'pendiente' && (
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleApprove(index)}
                                        sx={{ mr: 2 }}
                                    >
                                        Aprobar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleReject(index)}
                                    >
                                        Rechazar
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </Container>
    );
};

export default AdminLoanManagement;
