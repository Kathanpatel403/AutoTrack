import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const PieChart = ({ data = [], labels = [] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // Default data if none is provided
  const defaultData = [
    { id: "Red Signal", label: "Red Signal", value: 45, color: "hsl(10, 70%, 50%)" },
    { id: "Speed", label: "Speed", value: 30, color: "hsl(220, 70%, 50%)" },
    { id: "No Helmet", label: "No Helmet", value: 15, color: "hsl(100, 70%, 50%)" },
    { id: "Wrong Side Driving", label: "Wrong Side Driving", value: 10, color: "hsl(280, 70%, 50%)" },
  ];

  // If data and labels are provided, transform them into the format expected by ResponsivePie
  const chartData = data.length > 0 && labels.length > 0 
    ? labels.map((label, index) => ({
        id: label,
        label: label.charAt(0).toUpperCase() + label.slice(1), // Capitalize first letter
        value: data[index],
        color: `hsl(${(index * 70) % 360}, 70%, 50%)` // Generate a different color for each segment
      }))
    : defaultData;

  return (
    <ResponsivePie
      data={chartData}
      colors={{ datum: "data.color" }}
      theme={{
        axis: {
          domain: { line: { stroke: colors.gray[100] } },
          legend: { text: { fill: colors.gray[100] } },
          ticks: {
            line: { stroke: colors.gray[100], strokeWidth: 1 },
            text: { fill: colors.gray[100] },
          },
        },
        legends: { text: { fill: colors.gray[100] } },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.gray[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={true}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateX: 0,
          translateY: 56,
          itemsSpacing: 10,
          itemWidth: 120,
          itemHeight: 18,
          itemTextColor: colors.gray[100],
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",  
              style: { itemTextColor: "#fff" },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;