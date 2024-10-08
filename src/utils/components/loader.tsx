import { motion } from "framer-motion"
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <i className="fas fa-spinner fa-3x text-black"></i>
    </motion.div>
  </div>
)
export default LoadingSpinner
