'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const team = [
  {
    name: 'Armenta',
    role: 'Project Leader',
    contribution: 'Led the project development, coordinated team tasks, and handled feature integration.',
    image: '/images/armenta.jpg',
  },
  {
    name: 'Endaya',
    role: 'Frontend Developer',
    contribution: 'Built responsive UI components using Tailwind CSS and integrated API data.',
    image: '/images/endaya.jpg',
  },
  {
    name: 'Gaupo',
    role: 'Backend Developer',
    contribution: 'Worked on data fetching, authentication logic, and API interaction.',
    image: '/images/gaupo.jpg',
  },
  {
    name: 'Gubat',
    role: 'UI/UX Designer',
    contribution: 'Designed user interfaces and created the visual style of the application.',
    image: '/images/gubat.jpg',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function AboutUsPage() {
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
          MEET OUR TEAM
        </motion.h1>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-8 sm:gap-12 lg:gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-[#EE7879] to-[#2b1010] text-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 text-center transition-transform duration-300 hover:shadow-[#EE7879]/50"
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 relative"
              >
                <Image
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-[#f7d3d3] shadow-lg hover:shadow-[#EE7879]/70 transition-shadow duration-300"
                />
              </motion.div>

              {/* Name */}
              <h3 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white via-[#f8c1c1] to-white bg-clip-text text-transparent tracking-wide mb-2">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-lg sm:text-xl italic text-[#FFD6D5] font-medium mb-4">
                {member.role}
              </p>

              {/* Contribution */}
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed tracking-wide px-2">
                {member.contribution}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
