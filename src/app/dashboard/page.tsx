'use client';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import { motion } from 'framer-motion';

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

  if (!users || !posts || !comments) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-600 text-lg font-medium">
        Loading...
      </div>
    );
  }

  const total = users.length + posts.length + comments.length;

  const chartData: { series: number[]; options: ApexOptions } = {
    series: [users.length, posts.length, comments.length],
    options: {
      labels: ['Users', 'Posts', 'Comments'],
      chart: {
        type: 'donut',
        background: 'transparent',
        toolbar: { show: false },
        dropShadow: {
          enabled: true,
          top: 3,
          left: 3,
          blur: 5,
          opacity: 0.1,
        },
      },
      colors: ['#FDE2E4', '#F8A7B4', '#F36F8A'],
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts) => {
          const raw = opts.w.config.series[opts.seriesIndex];
          const percentage = ((raw / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#ffffff'], // Light label text
        },
        offsetX: 0,
        offsetY: 10,
      },
      tooltip: {
        theme: 'light', // Light tooltip for dark background
        y: {
          formatter: (value: number) => {
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: 'bottom',
        fontSize: '18px', // Increase text size
        labels: {
          colors: '#ffffff',
          useSeriesColors: false,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 10
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
          },
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

        {/* Single Large Card */}
        <motion.div
          key="dashboard-card"
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] text-white rounded-3xl shadow-2xl p-12 text-center mx-auto transition-transform duration-300 hover:shadow-[#EE7879]/50 max-w-4xl w-full"
        >
          {/* Chart */}
          <div className="w-full max-w-full sm:max-w-[600px] md:max-w-[800px] mx-auto mb-8">
            <Chart options={chartData.options} series={chartData.series} type="donut" width="100%" />
          </div>

          {/* Title */}
          <h3 className="text-3xl sm:text-4xl italic font-extrabold bg-gradient-to-r from-white via-[#f8c1c1] to-white bg-clip-text text-transparent tracking-wide mb-4">
            Overview of User & Content Distribution
          </h3>
          {/* Additional Info */}
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed tracking-wide px-2">
            This chart shows the distribution of users, posts, and comments across the platform. 
          </p>
        </motion.div>
      </div>
    </main>
  );
}
