import { AnimatePresence, motion } from 'framer-motion'

const PageTransformMotion = ({children}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransformMotion