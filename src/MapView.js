import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

function MapView() {
  const mapRef = useRef(null);
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get('/api/map', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMap