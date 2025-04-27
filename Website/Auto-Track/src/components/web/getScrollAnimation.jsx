// export default function getScrollAnimation() {
// 	return ({
//     offscreen: {
//       y: 150,
//       opacity: 0,
//     },
//     onscreen: ({duration = 2} = {}) =>  ({
//       y: 0,
//       opacity: 1,
//       transition: {
//       type: "spring",
//       duration,
//       }
//     })
//   })
// }


const getScrollAnimation = () => {
  return {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8,
      },
    },
  };
};

export default getScrollAnimation;
