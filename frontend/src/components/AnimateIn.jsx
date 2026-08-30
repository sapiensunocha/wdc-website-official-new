import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const variants = {
  fadeUp:    { hidden: { opacity: 0, y: 40 },        visible: { opacity: 1, y: 0 } },
  fadeIn:    { hidden: { opacity: 0 },               visible: { opacity: 1 } },
  fadeLeft:  { hidden: { opacity: 0, x: -50 },       visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 50 },        visible: { opacity: 1, x: 0 } },
  zoomIn:    { hidden: { opacity: 0, scale: 0.85 },  visible: { opacity: 1, scale: 1 } },
};

export default function AnimateIn({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AnimateStagger({ children, className = "", staggerDelay = 0.1, baseDelay = 0 }) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <AnimateIn key={i} variant="fadeUp" delay={baseDelay + i * staggerDelay}>
              {child}
            </AnimateIn>
          ))
        : <AnimateIn variant="fadeUp" delay={baseDelay}>{children}</AnimateIn>
      }
    </div>
  );
}
