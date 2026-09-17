import { motion } from "framer-motion";
import { Dot } from "lucide-react";
import { useState } from "react";

const indexColors = [
  "bg-(--graph-col-1)",
  "bg-(--graph-col-2)",
  "bg-(--graph-col-3)",
];
export default function MetricsBar({ treatments }: { treatments: any[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.5 }}
      className="flex gap-1 pt-1 h-full"
    >
      {treatments.map((item: any, i) => {
        return (
          <motion.div
            key={i}
            initial={{ width: "0%" }}
            animate={{
              width:
                hovered === i ? `80%` : hovered ? "10%" : `${item.percentage}%`,
            }}
            transition={{ duration: 0.4 }}
            className={`border-l border-dashed border-(--border) flex flex-col pt-2`}
          >
            <motion.div className="flex-1 flex flex-col justify-center">
              <span className="text-xl font-semibold pl-1">{item.value}</span>
            </motion.div>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`h-10 ${indexColors[i]} rounded-md ${hovered === i && "hover:scale-103"} transition-all duration-300`}
            ></motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
