import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

function Dashboard() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCards(response.data);
      } catch (error) {
        alert('User not logged in.');
        navigate('/login');
      }
    };
    fetchDashboardData();
  }, [navigate]);

  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card onClick={() => navigate(`/map/${card.id}`)}>
              <CardContent>
                <Typography variant="h6">{card.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;