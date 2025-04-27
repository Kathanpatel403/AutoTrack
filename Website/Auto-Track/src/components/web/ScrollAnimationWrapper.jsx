// import {motion} from "framer-motion";

// export default function ScrollAnimationWrapper({children, className, ...props}) {
//   return (
//     <motion.div
//       initial="offscreen"
//       whileInView="onscreen"
//       viewport={{ once: true, amount: 0.8 }}
//       className={className}
//       {...props}
//     >
//       {children}
//     </motion.div>
//   )
// }


import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollAnimationWrapper = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="offscreen"
      animate={inView ? "onscreen" : "offscreen"}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
