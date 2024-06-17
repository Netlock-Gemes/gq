import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ScoreChart = ({ score, totalQuestions }) => {
    const data = {
        labels: ['Correct', 'Incorrect'],
        datasets: [
            {
                label: 'Score',
                data: [score, totalQuestions - score],
                backgroundColor: ['#4CAF50', '#F44336'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#ffffff'
                },
            },
            title: {
                display: true,
                text: 'Score Chart',
                color: '#ffffff',
            },
            tooltip: {
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff',
                },
                grid: {
                    color: '#444444',
                },
            },
            y: {
                ticks: {
                    color: '#ffffff',
                },
                grid: {
                    color: '#444444',
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ScoreChart;
