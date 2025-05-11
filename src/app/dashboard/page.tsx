'use client';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions, ApexAxisChartSeries } from 'apexcharts';
import { motion } from 'framer-motion';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Types for API responses
interface User {
  id: number;
  name: string;
  email: string;
  // add more if needed
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function DashboardPage() {
  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json(),
  });

  const { data: posts } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json(),
  });

  const { data: comments } = useQuery<Comment[]>({
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

  // Donut Chart Data
  const donutChartData: { series: number[]; options: ApexOptions } = {
    series: [users.length, posts.length, comments.length],
    options: {
      labels: ['Users', 'Posts', 'Comments'],
      chart: {
        type: 'donut',
        background: 'transparent',
      },
      colors: ['#FDE2E4', '#F8A7B4', '#F36F8A'],
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
        },
      },
    },
  };

  // Bar Chart Data
  const barChartData: { series: ApexAxisChartSeries; options: ApexOptions } = {
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
      colors: ['#00E396', '#FF4560', '#F8A7B4'],
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
        },
      },
    },
  };

  // Pie Chart Data
  const pieChartData: { series: number[]; options: ApexOptions } = {
    series: [users.length, posts.length, comments.length],
    options: {
      labels: ['Users', 'Posts', 'Comments'],
      chart: {
        type: 'pie',
        background: 'transparent',
      },
      colors: ['#00E396', '#FF4560', '#F8A7B4'],
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
        },
      },
    },
  };

  return (
    <main className="min-h-screen bg-gray-900 px-8 py-20 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mb-16 bg-gradient-to-r from-[#EE7879] via-[#f7d3d3] to-[#EE7879] bg-clip-text text-transparent drop-shadow-lg tracking-wide font-sans"
        >
          DASHBOARD
        </motion.h1>

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
            Explore the overall breakdown of user-related activities within the platform through visual insights below.
          </p>
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          key="donut-chart"
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] text-white rounded-3xl shadow-2xl p-12 text-center mx-auto transition-transform duration-300 hover:shadow-[#EE7879]/50 max-w-4xl w-full mb-12"
        >
          <Chart options={donutChartData.options} series={donutChartData.series} type="donut" width="100%" />
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed tracking-wide px-2">
            This donut chart shows the distribution of users, posts, and comments across the platform.
          </p>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          key="pie-chart"
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#FDE2E4] to-[#2b1010] text-white rounded-3xl shadow-2xl p-12 text-center mx-auto transition-transform duration-300 hover:shadow-[#FDE2E4]/50 max-w-4xl w-full mb-12"
        >
          <Chart options={pieChartData.options} series={pieChartData.series} type="pie" width="100%" />
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed tracking-wide px-2">
            This pie chart represents the distribution of users, posts, and comments across the platform.
          </p>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          key="bar-chart"
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#00E396] to-[#2b1010] text-white rounded-3xl shadow-2xl p-12 text-center mx-auto transition-transform duration-300 hover:shadow-[#00E396]/50 max-w-4xl w-full mb-12"
        >
          <Chart options={barChartData.options} series={barChartData.series} type="bar" width="100%" />
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed tracking-wide px-2">
            This bar chart visualizes the total number of users, posts, and comments.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
