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
            },
            title: {
                display: true,
                text: 'Quiz Results',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ScoreChart;
