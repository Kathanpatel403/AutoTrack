import { useState } from "react";
import { Image, BarChart, Activity, Database } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  {
    id: 1,
    title: "Number Plate Detection",
    icon: <BarChart className="w-5 h-5" />,
    text: "Our Number Plate Detection model achieves high accuracy in identifying objects in real-time scenarios.",
    precision: "97.8%",
    recall: "97.8%",
    map: "98.9%",
    images: [
      "src/assets/images/numberplate_map.png",
      "src/assets/images/numberplate_training.png",
    ],
    dataset: {
      images: "12,762",
      classes: "1"
    },
  },
  {
    id: 2,
    title: "Character Detection",
    icon: <Image className="w-5 h-5" />,
    text: "Our Number Plate Character Detection model achieves high accuracy in identifying characters in real-time scenarios.",
    precision: "90.8%",
    recall: "81.6%",
    map: "90.2%",
    images: [
      "src/assets/images/charcter_map.png",
      "src/assets/images/charcter_training.png",
    ],
    dataset: {
      images: "17,701",
      classes: "36",
    },
  },
  {
    id: 3,
    title: "Emergency Vehicle Detection",
    icon: <Activity className="w-5 h-5" />,
    text: "AI-driven Emergency Vehicle Detection for faster response, reduced congestion, and improved road safety.",
    precision: "89.9%",
    recall: "87.2%",
    map: "88.5%",
    images: [
      "src/assets/images/Emergency_Train.png",
      "src/assets/images/Emergency_Training_Graphs.jpg",
    ],
    dataset: {
      images: "1,609",
      classes: "5"
    },
  },
];

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState(1);
  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center   p-6">
      {/* Tabs */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-6xl">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {tabs.map(({ id, title, icon }) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2 text-sm md:text-base font-medium rounded-md transition-all 
                ${activeTab === id 
                  ? "bg-[#3B82F6]  text-white shadow-lg scale-105" 
                  : "bg-blue-100 text-black hover:bg-blue-400 hover:text-white"}`}
              whileHover={{ scale: 1.05 }} // Hover effect
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon} {title}
            </motion.button>
          ))}
        </div>

        {/* Description */}
        <motion.p
          className="text-center text-lg text-gray-800 font-medium mb-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {active.text}
        </motion.p>

        {/* Images */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {active.images.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Result ${i + 1}`}
              className="w-full h-72 object-cover rounded-xl shadow-md border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 * i, duration: 0.5 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Performance + Dataset */}
      <div className="mt-10 w-full max-w-4xl grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Model Performance */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-5 text-center"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Model Performance
          </h3>
          <div className="flex justify-around gap-4">
            <Metric label="Precision" value={active.precision} />
            <Metric label="Recall" value={active.recall} />
            <Metric label="mAP" value={active.map} />
          </div>
        </motion.div>

        {/* Dataset */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-5 text-center"
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
            <Database className="w-5 h-5 text-gray-600" /> Dataset Details
          </h3>
          <div className="flex justify-around gap-4">
            <Metric label="Total Images" value={active.dataset.images}  />
            <Metric label="Total Classes" value={active.dataset.classes}  />
            {active.dataset.annotations && (
              <Metric label="Annotations" value={active.dataset.annotations}  />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Metric component with animation
function Metric({ label, value, color = "blue" }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-xl font-bold text-${color}-600`}>{value}</span>
    </motion.div>
  );
}
