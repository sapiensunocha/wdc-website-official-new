import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import AnimateIn from "./AnimateIn";

function AnimatedNumber({ target, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const STATS = [
  { label: "Our rosters worldwide", value: 34, suffix: "" },
  { label: "Partners worldwide", value: 28, suffix: "" },
  { label: "Staff", value: 46000, suffix: "" },
  { label: "Budget", value: 100000, prefix: "$", suffix: "" },
];

function StatsComponents() {
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateIn variant="fadeUp">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {STATS.map((stat, i) => (
                <div key={i} className="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    <AnimatedNumber
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix || ""}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}

export default StatsComponents;
