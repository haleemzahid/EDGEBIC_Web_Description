'use client';

import * as React from 'react';

export function IntegratedFeaturesSection(): React.JSX.Element {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-[#003d5c] md:text-4xl lg:text-5xl">
            Integrated Manufacturing Software for Business Growth
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Production Planning */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-32 w-32 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="productionGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#5C77F1', stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#2FB8DE', stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                {/* Document/Clipboard Icon */}
                <rect
                  x="30"
                  y="20"
                  width="60"
                  height="80"
                  rx="4"
                  fill="url(#productionGradient)"
                />
                <rect
                  x="35"
                  y="25"
                  width="50"
                  height="70"
                  rx="2"
                  fill="#FFFFFF"
                  opacity="0.9"
                />
                {/* Chart bars */}
                <rect
                  x="42"
                  y="65"
                  width="8"
                  height="20"
                  rx="1"
                  fill="#5C77F1"
                />
                <rect
                  x="56"
                  y="55"
                  width="8"
                  height="30"
                  rx="1"
                  fill="#2FB8DE"
                />
                <rect
                  x="70"
                  y="60"
                  width="8"
                  height="25"
                  rx="1"
                  fill="#5C77F1"
                />
                {/* Pie chart */}
                <circle
                  cx="60"
                  cy="40"
                  r="10"
                  fill="none"
                  stroke="#FF6B6B"
                  strokeWidth="4"
                  strokeDasharray="20 43"
                />
                <circle
                  cx="60"
                  cy="40"
                  r="10"
                  fill="none"
                  stroke="#5C77F1"
                  strokeWidth="4"
                  strokeDasharray="15 48"
                  strokeDashoffset="-20"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#003d5c]">
              Production Planning
            </h3>
            <p className="text-base leading-relaxed text-slate-700">
              Generate reliable, detailed production plans. Balance materials
              and capacity with actual demand. Effortlessly reschedule
              production orders.
            </p>
          </div>

          {/* Inventory */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-32 w-32 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="inventoryGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#5C77F1', stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#2FB8DE', stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                {/* Stack of boxes */}
                {/* Top box */}
                <g transform="translate(40, 15)">
                  <polygon
                    points="0,10 20,0 40,10 20,20"
                    fill="url(#inventoryGradient)"
                  />
                  <polygon
                    points="0,10 0,25 20,35 20,20"
                    fill="#3B5BDB"
                    opacity="0.8"
                  />
                  <polygon
                    points="20,20 20,35 40,25 40,10"
                    fill="#1E40AF"
                    opacity="0.9"
                  />
                </g>
                {/* Middle box */}
                <g transform="translate(40, 35)">
                  <polygon
                    points="0,10 20,0 40,10 20,20"
                    fill="url(#inventoryGradient)"
                  />
                  <polygon
                    points="0,10 0,25 20,35 20,20"
                    fill="#3B5BDB"
                    opacity="0.8"
                  />
                  <polygon
                    points="20,20 20,35 40,25 40,10"
                    fill="#1E40AF"
                    opacity="0.9"
                  />
                </g>
                {/* Bottom box */}
                <g transform="translate(40, 55)">
                  <polygon
                    points="0,10 20,0 40,10 20,20"
                    fill="url(#inventoryGradient)"
                  />
                  <polygon
                    points="0,10 0,25 20,35 20,20"
                    fill="#3B5BDB"
                    opacity="0.8"
                  />
                  <polygon
                    points="20,20 20,35 40,25 40,10"
                    fill="#1E40AF"
                    opacity="0.9"
                  />
                </g>
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#003d5c]">
              Inventory
            </h3>
            <p className="text-base leading-relaxed text-slate-700">
              Always know what you have in stock. Easily avoid inventory
              shortages and excess. Track inventory by lot or batch, use serial
              numbers and barcodes.
            </p>
          </div>

          {/* Sales Management */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-32 w-32 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#5C77F1', stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#2FB8DE', stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                {/* Document/List Icon */}
                <g>
                  {/* First row */}
                  <rect
                    x="25"
                    y="25"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="url(#salesGradient)"
                  />
                  <rect
                    x="40"
                    y="25"
                    width="55"
                    height="3"
                    rx="1.5"
                    fill="#003d5c"
                    opacity="0.3"
                  />
                  {/* Second row */}
                  <rect
                    x="25"
                    y="35"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="url(#salesGradient)"
                  />
                  <rect
                    x="40"
                    y="35"
                    width="55"
                    height="3"
                    rx="1.5"
                    fill="#003d5c"
                    opacity="0.3"
                  />
                  {/* Third row */}
                  <rect
                    x="25"
                    y="45"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="url(#salesGradient)"
                  />
                  <rect
                    x="40"
                    y="45"
                    width="55"
                    height="3"
                    rx="1.5"
                    fill="#003d5c"
                    opacity="0.3"
                  />
                  {/* Fourth row */}
                  <rect
                    x="25"
                    y="55"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="url(#salesGradient)"
                  />
                  <rect
                    x="40"
                    y="55"
                    width="55"
                    height="3"
                    rx="1.5"
                    fill="#003d5c"
                    opacity="0.3"
                  />
                  {/* Fifth row */}
                  <rect
                    x="25"
                    y="65"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="url(#salesGradient)"
                  />
                  <rect
                    x="40"
                    y="65"
                    width="55"
                    height="3"
                    rx="1.5"
                    fill="#003d5c"
                    opacity="0.3"
                  />
                  {/* Sixth row */}
                  <rect
                    x="25"
                    y="75"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="url(#salesGradient)"
                  />
                  <rect
                    x="40"
                    y="75"
                    width="55"
                    height="3"
                    rx="1.5"
                    fill="#003d5c"
                    opacity="0.3"
                  />
                  {/* Seventh row */}
                  <rect
                    x="25"
                    y="85"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="url(#salesGradient)"
                  />
                  <rect
                    x="40"
                    y="85"
                    width="55"
                    height="3"
                    rx="1.5"
                    fill="#003d5c"
                    opacity="0.3"
                  />
                </g>
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-[#003d5c]">
              Sales Management
            </h3>
            <p className="text-base leading-relaxed text-slate-700">
              Calculate order costs and lead times in just a few clicks. Send
              confirmed orders straight to production. Easily manage invoices,
              shipping, and returns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
