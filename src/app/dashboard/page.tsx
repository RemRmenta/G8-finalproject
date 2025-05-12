'use client';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json(),
  });

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json(),
  });

  const { data: comments } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/comments')).json(),
  });

  const [chartType, setChartType] = useState<'donut' | 'bar' | 'pie'>('donut');

  if (!users || !posts || !comments) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-600 text-lg font-medium">
        Loading...
      </div>
    );
  }

  // Chart Data for Users, Posts, and Comments
  const donutChartData: { series: number[]; options: ApexOptions } = {
    series: [users.length, posts.length, comments.length],
    options: {
      labels: ['Users', 'Posts', 'Comments'],
      chart: {
        type: 'donut',
        background: 'transparent',
      },
      colors: ['#FDE2E4', '#F8A7B4', '#F36F8A'], // Pink color shades
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts) => {
          const raw = opts.w.config.series[opts.seriesIndex];
          const percentage = ((raw / (users.length + posts.length + comments.length)) * 100).toFixed(1);
          return `${percentage}%`;
        },
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#ffffff'],
        },
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: (value: number) => {
            const percentage = ((value / (users.length + posts.length + comments.length)) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: 'bottom',
        fontSize: '18px',
        labels: {
          colors: '#ffffff',
          useSeriesColors: false,
        },
      },
    },
  };

  const barChartData: { series: any[]; options: ApexOptions } = {
    series: [
      {
        name: 'Users',
        data: [users.length],
      },
      {
        name: 'Posts',
        data: [posts.length],
      },
      {
        name: 'Comments',
        data: [comments.length],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        background: 'transparent',
      },
      colors: ['#FF4081', '#F8A7B4', '#F36F8A'], // Pink shades
      xaxis: {
        categories: ['Total'],
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          colors: ['#ffffff'],
        },
      },
      tooltip: {
        theme: 'light',
      },
      legend: {
        position: 'bottom',
        fontSize: '18px',
        labels: {
          colors: '#ffffff',
          useSeriesColors: false,
        },
      },
    },
  };

  const pieChartData: { series: number[]; options: ApexOptions } = {
    series: [users.length, posts.length, comments.length],
    options: {
      labels: ['Users', 'Posts', 'Comments'],
      chart: {
        type: 'pie',
        background: 'transparent',
      },
      colors: ['#FF4081', '#F8A7B4', '#F36F8A'], // Pink shades
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts) => {
          const raw = opts.w.config.series[opts.seriesIndex];
          const percentage = ((raw / (users.length + posts.length + comments.length)) * 100).toFixed(1);
          return `${percentage}%`;
        },
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#ffffff'],
        },
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: (value: number) => {
            const percentage = ((value / (users.length + posts.length + comments.length)) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: 'bottom',
        fontSize: '18px',
        labels: {
          colors: '#ffffff',
          useSeriesColors: false,
        },
      },
    },
  };

  return (
    <main className="min-h-screen bg-gray-900 px-8 py-20 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#EE7879] via-[#f7d3d3] to-[#EE7879] bg-clip-text text-transparent drop-shadow-lg tracking-wide font-sans"
        >
          DASHBOARD
        </motion.h1>

        {/* Overview Card */}
        <motion.div
          key="overview-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gradient-to-br from-[#2b1010] to-[#4a1c1c] text-white rounded-3xl shadow-2xl p-10 text-center mx-auto mb-12 max-w-4xl w-full"
        >
          <h3 className="text-3xl sm:text-4xl italic font-extrabold bg-gradient-to-r from-white via-[#f8c1c1] to-white bg-clip-text text-transparent tracking-wide mb-4">
            Overview of Users, Posts & Comments
          </h3>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed tracking-wide px-2">
            This chart represents the distribution of users, posts, and comments across the platform.
          </p>
        </motion.div>

        {/* Chart Display */}
        <motion.div
          key={`${chartType}-chart`}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] text-white rounded-3xl shadow-2xl p-12 text-center mx-auto transition-transform duration-300 hover:shadow-[#EE7879]/50 max-w-4xl w-full mb-12"
        >
          {chartType === 'donut' && <Chart options={donutChartData.options} series={donutChartData.series} type="donut" width="100%" />}
          {chartType === 'pie' && <Chart options={pieChartData.options} series={pieChartData.series} type="pie" width="100%" />}
          {chartType === 'bar' && <Chart options={barChartData.options} series={barChartData.series} type="bar" width="100%" />}
        </motion.div>

        {/* Chart Toggle Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setChartType('donut')}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Donut Chart
          </button>
          <button
            onClick={() => setChartType('pie')}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Pie Chart
          </button>
          <button
            onClick={() => setChartType('bar')}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Bar Chart
          </button>
        </div> 
      </div>
    </main>
  );
}
