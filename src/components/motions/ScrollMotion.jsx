import { motion, useScroll, useSpring } from "framer-motion";

const ScrollMotion = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div>
      <motion.div
        className="fixed w-full origin-left -mt-4 left-0 h-[5px] bg-indigo-600" 
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      />
    </div>
  )
}

export default ScrollMotion