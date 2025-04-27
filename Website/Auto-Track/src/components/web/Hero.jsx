// // import React, { useMemo } from "react";

// // import { motion } from "framer-motion";
// // import getScrollAnimation from "./getScrollAnimation";
// // import ScrollAnimationWrapper from "./ScrollAnimationWrapper";



// // const Hero = ({
// //   listUser = [
// //     {
// //       name: "E-Challan Generated",
// //       number: "500",
// //       icon:"src/assets/images/E-challan_Icon.png",
// //     },
// //     {
// //       name: "E-Challan Paid",
// //       number: "200",
// //       icon: "src/assets/images/invoice.png",
// //     },
// //     {
// //       name: "Issue Resolved",
// //       number: "100",
// //       icon: "src/assets/images/issue_resolved.png",
// //     },
// //   ],
// // }) => {
// //   const scrollAnimation = useMemo(() => getScrollAnimation(), []);

// //   return (
// //     <div className="max-w-screen-xl -mt-20 mb-10 px-8 xl:px-16 mx-auto" id="about">

// //       {/* Key Metrics Section */}
// //       <div className="py-16  rounded-lg  mt-16">
// //         <h2 className="text-3xl text-center font-semibold text-black-600 mb-8">
// //           Our Key Metrics
// //         </h2>
// //         <ScrollAnimationWrapper className="grid grid-cols-1 sm:grid-cols-3 gap-12 px-6">
// //           {listUser.map((listUsers, index) => (
// //             <motion.div
// //               className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
// //               key={index}
// //               custom={{ duration: 2 + index }}
// //               variants={scrollAnimation}
// //             >
// //               <div className="mb-6 flex justify-center items-center">
// //                 <div className="bg-orange-200 p-5 rounded-full">
// //                   <img src={listUsers.icon} className="h-12 w-12" />
// //                 </div>
// //               </div>
// //               <p className="text-5xl font-extrabold text-black-700">
// //                 {listUsers.number}+
// //               </p>
// //               <p className="text-xl text-black-500">{listUsers.name}</p>
// //             </motion.div>
// //           ))}
// //         </ScrollAnimationWrapper>
// //       </div>

// //     </div>
// //   );
// // };

// // export default Hero;



// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import getScrollAnimation from "./getScrollAnimation";
// import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

// const Hero = () => {
//   const [stats, setStats] = useState({
//     totalGenerated: 0,
//     totalPaid: 0,
//     totalResolved: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollAnimation = useMemo(() => getScrollAnimation(), []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);

//         // API Endpoints
//         const generatedAPI = "http://127.0.0.1:8000/users/dashboard/total-echallan-count/";
//         const paidAPI = "http://127.0.0.1:8000/users/dashboard/total-paid-echallan-count/";
//         const resolvedAPI = "http://127.0.0.1:8000/users/dashboard/total-issue-solved-count/";

//         // Fetch all data simultaneously
//         const [generatedRes, paidRes, resolvedRes] = await Promise.all([
//           fetch(generatedAPI),
//           fetch(paidAPI),
//           fetch(resolvedAPI),
//         ]);

//         // Check if any API call failed
//         if (!generatedRes.ok || !paidRes.ok || !resolvedRes.ok) {
//           throw new Error("Failed to fetch one or more datasets");
//         }

//         // Convert responses to JSON
//         const generatedData = await generatedRes.json();
//         const paidData = await paidRes.json();
//         const resolvedData = await resolvedRes.json();
//         console.log(generatedData, paidData, resolvedData);
//         // Update state
//         setStats({
//           totalGenerated: generatedData.total_echallan_count || 0,
//           totalPaid: paidData.paid_echallan_count || 0,
//           totalResolved: resolvedData.total_issued_solved_echallan_count || 0,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const listUser = [
//     {
//       name: "E-Challan Generated",
//       number: stats.totalGenerated,
//       icon: "src/assets/images/E-challan_Icon.png",
//     },
//     {
//       name: "E-Challan Paid",
//       number: stats.totalPaid,
//       icon: "src/assets/images/invoice.png",
//     },
//     {
//       name: "Issue Resolved",
//       number: stats.totalResolved,
//       icon: "src/assets/images/issue_resolved.png",
//     },
//   ];

//   return (
//     <div className="max-w-screen-xl -mt-20 mb-10 px-8 xl:px-16 mx-auto" id="about">
//       <div className="py-16 rounded-lg mt-16">
//         <h2 className="text-3xl text-center font-semibold text-black-600 mb-8">
//           Our Key Metrics
//         </h2>

//         {loading ? (
//           <p className="text-center text-lg font-semibold">Loading data...</p>
//         ) : error ? (
//           <p className="text-center text-lg text-red-500">Error: {error}</p>
//         ) : (
//           <ScrollAnimationWrapper className="grid grid-cols-1 sm:grid-cols-3 gap-12 px-6">
//             {listUser.map((item, index) => (
//               <motion.div
//                 className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//                 key={index}
//                 custom={{ duration: 2 + index }}
//                 variants={scrollAnimation}
//               >
//                 <div className="mb-6 flex justify-center items-center">
//                   <div className="bg-orange-200 p-5 rounded-full">
//                     <img src={item.icon} className="h-12 w-12" />
//                   </div>
//                 </div>
//                 <p className="text-5xl font-extrabold text-black-700">{item.number}+</p>
//                 <p className="text-xl text-black-500">{item.name}</p>
//               </motion.div>
//             ))}
//           </ScrollAnimationWrapper>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Hero;



// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import getScrollAnimation from "./getScrollAnimation";
// import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

// const Hero = () => {
//   const [stats, setStats] = useState({
//     totalGenerated: 0,
//     totalPaid: 0,
//     totalResolved: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollAnimation = useMemo(() => getScrollAnimation(), []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);

//         // API Endpoints
//         const generatedAPI = "http://127.0.0.1:8000/users/dashboard/total-echallan-count/";
//         const paidAPI = "http://127.0.0.1:8000/users/dashboard/total-paid-echallan-count/";
//         const resolvedAPI = "http://127.0.0.1:8000/users/dashboard/total-issue-solved-count/";

//         // Fetch all data simultaneously
//         const [generatedRes, paidRes, resolvedRes] = await Promise.all([
//           fetch(generatedAPI),
//           fetch(paidAPI),
//           fetch(resolvedAPI),
//         ]);

//         // Check if any API call failed
//         if (!generatedRes.ok || !paidRes.ok || !resolvedRes.ok) {
//           throw new Error("Failed to fetch one or more datasets");
//         }

//         // Convert responses to JSON
//         const generatedData = await generatedRes.json();
//         const paidData = await paidRes.json();
//         const resolvedData = await resolvedRes.json();

//         // Update state
//         setStats({
//           totalGenerated: generatedData.total_echallan_count || 0,
//           totalPaid: paidData.paid_echallan_count || 0,
//           totalResolved: resolvedData.total_issued_solved_echallan_count || 0,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const listUser = [
//     {
//       name: "E-Challan Generated",
//       key: "totalGenerated",
//       icon: "src/assets/images/E-challan_Icon.png",
//     },
//     {
//       name: "E-Challan Paid",
//       key: "totalPaid",
//       icon: "src/assets/images/invoice.png",
//     },
//     {
//       name: "Issue Resolved",
//       key: "totalResolved",
//       icon: "src/assets/images/issue_resolved.png",
//     },
//   ];

//   const numberVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.5 } },
//   };

//   return (
//     <div className="max-w-screen-xl -mt-20 mb-10 px-8 xl:px-16 mx-auto" id="about">
//       <div className="py-16 rounded-lg mt-16">
//         <h2 className="text-3xl text-center font-semibold text-black-600 mb-8">
//           Our Key Metrics
//         </h2>

//         {loading ? (
//           <p className="text-center text-lg font-semibold">Loading data...</p>
//         ) : error ? (
//           <p className="text-center text-lg text-red-500">Error: {error}</p>
//         ) : (
//           <ScrollAnimationWrapper className="grid grid-cols-1 sm:grid-cols-3 gap-12 px-6">
//             {listUser.map((item, index) => (
//               <motion.div
//                 className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all hover:scale-105 hover:shadow-xl"
//                 key={index}
//                 custom={{ duration: 2 + index }}
//                 variants={scrollAnimation}
//               >
//                 <div className="mb-6 flex justify-center items-center">
//                   <div className="bg-orange-200 p-5 rounded-full">
//                     <img src={item.icon} className="h-12 w-12" />
//                   </div>
//                 </div>
                
//                 {/* Animated Counter */}
//                 <motion.span
//                   className="text-5xl font-extrabold text-black-700"
//                   variants={numberVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   <AnimatedCounter value={stats[item.key]} />
//                 </motion.span>
//                 +
                
//                 <p className="text-xl text-black-500">{item.name}</p>
//               </motion.div>
//             ))}
//           </ScrollAnimationWrapper>
//         )}
//       </div>
//     </div>
//   );
// };

// // Animated Counter Component
// const AnimatedCounter = ({ value }) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = value;
//     if (start === end) return;

//     let incrementTime = 50; // Time in ms
//     let step = Math.ceil(end / 50); // Control speed

//     let timer = setInterval(() => {
//       start += step;
//       if (start >= end) {
//         start = end;
//         clearInterval(timer);
//       }
//       setCount(start);
//     }, incrementTime);

//     return () => clearInterval(timer);
//   }, [value]);

//   return <>{count}</>;
// };

// export default Hero;



import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "./getScrollAnimation";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const Hero = () => {
  const [stats, setStats] = useState({
    totalGenerated: 0,
    totalPaid: 0,
    totalResolved: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const generatedAPI = "http://127.0.0.1:8000/users/dashboard/total-echallan-count/";
        const paidAPI = "http://127.0.0.1:8000/users/dashboard/total-paid-echallan-count/";
        const resolvedAPI = "http://127.0.0.1:8000/users/dashboard/total-issue-solved-count/";

        const [generatedRes, paidRes, resolvedRes] = await Promise.all([
          fetch(generatedAPI),
          fetch(paidAPI),
          fetch(resolvedAPI),
        ]);

        if (!generatedRes.ok || !paidRes.ok || !resolvedRes.ok) {
          throw new Error("Failed to fetch one or more datasets");
        }

        const generatedData = await generatedRes.json();
        const paidData = await paidRes.json();
        const resolvedData = await resolvedRes.json();

        setStats({
          totalGenerated: generatedData.total_echallan_count || 0,
          totalPaid: paidData.paid_echallan_count || 0,
          totalResolved: resolvedData.total_issued_solved_echallan_count || 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const listUser = [
    {
      name: "E-Challan Generated",
      key: "totalGenerated",
      icon: "src/assets/images/E-challan_Icon.png",
    },
    {
      name: "E-Challan Paid",
      key: "totalPaid",
      icon: "src/assets/images/invoice.png",
    },
    {
      name: "Issue Resolved",
      key: "totalResolved",
      icon: "src/assets/images/issue_resolved.png",
    },
  ];

  const numberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="max-w-screen-xl -mt-20 mb-10 px-6 xl:px-16 mx-auto" id="about">
      <div className="py-14 rounded-lg mt-16">
        <motion.h2
          className="text-2xl sm:text-3xl text-center font-bold text-gray-800 mb-10"
          variants={scrollAnimation}
        >
          Our Key Metrics
        </motion.h2>

        {loading ? (
          <p className="text-center text-base sm:text-lg font-medium text-gray-600">
            Loading data...
          </p>
        ) : error ? (
          <p className="text-center text-base sm:text-lg text-red-500">
            Error: {error}
          </p>
        ) : (
          <ScrollAnimationWrapper className="grid grid-cols-1 sm:grid-cols-3 gap-10 px-4 sm:px-6">
            {listUser.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md text-center transform transition-all hover:scale-105 hover:shadow-2xl hover:-rotate-1 duration-300"
                custom={{ duration: 1.5 + index }}
                variants={scrollAnimation}
                whileHover={{ y: -5, rotate: 1 }}
              >
                <div className="mb-4 flex justify-center items-center">
                  <div className="bg-orange-100 p-4 sm:p-5 rounded-full shadow-inner">
                    <img src={item.icon} alt="" className="h-10 w-10 sm:h-12 sm:w-12" />
                  </div>
                </div>

                <motion.span
                  className="text-3xl sm:text-4xl font-extrabold text-gray-800"
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatedCounter value={stats[item.key]} />
                </motion.span>
                <span className="text-lg sm:text-xl font-medium text-gray-500 block mt-2">{item.name}</span>
              </motion.div>
            ))}
          </ScrollAnimationWrapper>
        )}
      </div>
    </div>
  );
};

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let incrementTime = 50;
    let step = Math.ceil(end / 50);

    let timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
};

export default Hero;
