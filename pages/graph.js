import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Paper, Typography, TextField, Button } from '@mui/material';

const InfiniteSeriesGraph = ({ a, r }) => {
  const chartRef = useRef(null);
  const chartId = useRef(null);

  useEffect(() => {
    const initializeChart = () => {
      const labels = [];
      const dataPoints = [];
      let term = a * Math.pow(r, 0); 
      
      for (let i = 1; term >= 0.000000000001; i++) {
        labels.push(`Person ${i}`);
        dataPoints.push(term);
        term = a * Math.pow(r, i);
      }

      const chartConfig = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: dataPoints,
              label: 'Infinite Geometric Series',
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'nth Customer',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Amount paid',
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => {
                  const dataIndex = context.dataIndex;
                  const value = context.dataset.data[dataIndex];
                  return `${dataIndex + 1}: ${value}`;
                },
              },
            },
          },
        } }

      const ctx = chartRef.current.getContext('2d');
      const previousChart = chartRef.current.chart;
      if (previousChart) {
        previousChart.destroy();
      }
      chartRef.current.chart = new Chart(ctx, chartConfig);
    };

    initializeChart();
  }, [a, r]);

  useEffect(() => {
    // Generate a unique ID for the chart
    chartId.current = Math.floor(Math.random() * 1000000);
  }, []);

  return (
    <div>
      <Paper elevation={3} sx={{ width: 400, height: 300 }}>
        <canvas
          id={`infinite-series-chart-${chartId.current}`}
          ref={chartRef}
          width="800"
          height="600"
        />
      </Paper>
    </div>
  );
};

const GraphPage = () => {
  const [a, setA] = useState(null);
  const [r, setR] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const inputS = parseFloat(formData.get('s'));
    const inputR = parseFloat(formData.get('r'));
  
    if (inputS <= 0.000000000000000001) {
      alert('Amount must be a number greater than 0.000000000000000001');
      return;
    }
  
    if (inputR < 0.5 || inputR > 0.99) {
      alert('Multiplier must be a number between 0.5 and 0.99');
      return;
    }
  
    const inputA = inputS * (1 - inputR);
    setA(inputA);
    setR(inputR);
  
    form.reset();
  };
  
  return (
    <div>
      <Typography variant="h1">
        Graph
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <div>
          <TextField
            type="number"
            name="s"
            label="Amount"
            inputProps={{ step: 'any' }}
            sx={{marginBottom: '10px'}}
          />
        </div>
        <div>
          <TextField
            type="number"
            name="r"
            label="Multiplier"
            inputProps={{ step: 'any' }}
            sx={{marginBottom: '10px'}}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary" sx={{marginBottom: '10px'}}>
            Plot Graph
          </Button>
        </div>
      </form>
      {a !== null && r !== null && <InfiniteSeriesGraph a={a} r={r} />}
    </div>
  );
};

export default GraphPage;