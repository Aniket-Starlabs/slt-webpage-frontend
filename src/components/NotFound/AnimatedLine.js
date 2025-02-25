import React from "react";
import { motion } from "framer-motion";

const AnimatedLineSVG = () => {
  // Define animation variants for the paths
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2,
          ease: "linear",
        },
        opacity: {
          duration: 0.1,
        },
      },
    },
  };

  // Define animation variants for the snake-like movement
  const snakeMovement = {
    animate: {
      x: [0, 20, 0], // Move back and forth
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div variants={snakeMovement} animate="animate">
      <svg
        width="307"
        height="135"
        viewBox="0 0 307 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M82.2317 32.7262C82.5525 32.6523 82.3131 33.133 82.3131 33.133C81.526 33.5021 67.667 38.2111 67.7043 44.1632C67.7175 46.2727 67.7428 47.5954 69.6469 49.1876C73.0929 52.0694 79.189 51.3589 86.1218 51.8285C93.9771 52.3605 99.6456 50.6196 107.376 51.3104C113.485 51.8563 118.589 51.5177 121.675 54.0981C124.047 56.0816 125.327 57.6902 123.832 60.4342C121.835 64.0989 117.198 66.1954 110.786 68.5042C105.983 70.234 102.011 71.0691 96.816 71.9563C70.0741 76.5235 61.3654 60.6372 34.8485 66.4606C24.2169 68.7955 16.1536 69.7129 9.09806 75.1868C3.15507 79.7976 2.19527 82.8249 3.4914 87.3664C4.89028 92.268 11.441 93.1844 17.7165 96.3078C25.6444 100.254 34.0275 100.243 40.742 104.797C44.6107 107.421 47.6597 108.807 48.4874 112.416C49.0594 114.91 48.4169 116.521 47.1852 119.226C44.4857 125.155 31.1932 134.877 31.1932 134.877L29.5781 133.788C29.5781 133.788 42.252 125.281 45.0074 119.444C46.2031 116.911 46.911 115.391 46.3936 113.053C45.6047 109.489 42.1673 108.276 38.263 105.73C31.4471 101.285 23.4168 101.13 15.6648 97.1552C9.27241 93.8779 2.69192 92.8305 1.31486 87.7506C0.0574386 83.1121 1.60659 79.4513 7.62939 74.7485C14.6664 69.2538 23.9548 67.7105 35.4927 65.24C62.0468 59.5544 70.7661 75.7259 97.4602 70.7357C102.487 69.796 105.604 69.4973 110.191 67.7501C115.744 65.6349 119.979 63.8738 121.654 60.6519C122.84 58.3715 122.251 57.0052 120.571 55.2439C117.793 52.3308 112.522 52.3753 106.101 51.7582C99.0842 51.084 93.8989 52.7461 86.6384 52.3895C79.1589 52.0221 72.5455 52.8846 68.839 49.8307C66.7468 48.1069 66.7826 46.6413 66.8499 44.3342C67.0252 38.326 79.8298 33.6302 82.2317 32.7262Z"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          stroke="#DDDDDD"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Add the second motion path here */}
      </svg>
    </motion.div>
  );
};

export default AnimatedLineSVG;
