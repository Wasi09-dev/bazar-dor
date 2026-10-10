import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
const Marquee = async () => {
  "use cache";
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
const data = await res.json()
console.log(data)
const unitBn = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
const toBn = (n) => Number(n).toLocaleString("bn-BD");
   return (
  <div className="border-b border-gray-200 bg-white py-2">
    <MarqueeText direction="right" duration={10} pauseOnHover>
      {data.map((item) => {
        const isUp = item.change.dir === "up";
        return (
          <span
            key={item.id}
            className="mx-6 inline-flex items-center gap-2 text-sm text-gray-700"
          >
            <span>{item.categoryIcon}</span>
            <span>{item.nameBn}</span>
            <span className="font-medium">
              {toBn(item.today)} টাকা/{unitBn[item.unit] ?? item.unit}
            </span>
            <span
              className={`font-semibold ${
                isUp ? "text-red-600" : "text-green-600"
              }`}
            >
              {isUp ? "▲" : "▼"} {toBn(item.change.pct)}%
            </span>
          </span>
        );
      })}
    </MarqueeText>
  </div>
);
};

export default Marquee;