'use client';

import * as React from 'react';
import Link from 'next/link';

export function CompleteViewSection(): React.JSX.Element {
  return (
    <section className="bg-white py-6 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="space-y-6 lg:w-1/3">
            <h2 className="text-2xl font-bold text-[#003d5c] md:text-3xl lg:text-4xl">
              MRPeasy helps manufacturers stay organized
            </h2>
            <div>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-md bg-[#003d5c] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#002d44] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start now
              </Link>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-2/3">
            <div className="rounded-lg bg-slate-50 p-8">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#003d5c] md:text-2xl">
                    A complete view of your business
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    No more spreadsheets! Ensure seamless communication between
                    sales, production, warehousing, procurement, administration,
                    and finance.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300 250"
                    className="h-auto w-full max-w-md"
                  >
                    <defs>
                      <linearGradient
                        id="buildingGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: '#3B5BDB', stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: '#1E40AF', stopOpacity: 1 }}
                        />
                      </linearGradient>
                      <linearGradient
                        id="boxGradient1"
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
                      <linearGradient
                        id="windowGlow"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: '#60A5FA', stopOpacity: 0.8 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: '#3B82F6', stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>

                    {/* Main Building */}
                    <g transform="translate(100, 80)">
                      {/* Building top */}
                      <polygon
                        points="0,40 50,20 100,40 50,60"
                        fill="url(#boxGradient1)"
                      />
                      {/* Building left side */}
                      <polygon
                        points="0,40 0,120 50,140 50,60"
                        fill="#2563EB"
                        opacity="0.9"
                      />
                      {/* Building right side */}
                      <polygon
                        points="50,60 50,140 100,120 100,40"
                        fill="#1E40AF"
                        opacity="0.8"
                      />

                      {/* Windows - Left side */}
                      <rect
                        x="12"
                        y="70"
                        width="12"
                        height="10"
                        fill="url(#windowGlow)"
                        rx="1"
                      />
                      <rect
                        x="28"
                        y="78"
                        width="12"
                        height="10"
                        fill="url(#windowGlow)"
                        rx="1"
                      />
                      <rect
                        x="12"
                        y="90"
                        width="12"
                        height="10"
                        fill="url(#windowGlow)"
                        rx="1"
                      />
                      <rect
                        x="28"
                        y="98"
                        width="12"
                        height="10"
                        fill="url(#windowGlow)"
                        rx="1"
                      />
                      <rect
                        x="12"
                        y="110"
                        width="12"
                        height="10"
                        fill="url(#windowGlow)"
                        rx="1"
                      />

                      {/* Windows - Right side */}
                      <polygon
                        points="62,75 74,70 74,78 62,83"
                        fill="#60A5FA"
                        opacity="0.7"
                      />
                      <polygon
                        points="78,72 90,67 90,75 78,80"
                        fill="#60A5FA"
                        opacity="0.7"
                      />
                      <polygon
                        points="62,90 74,85 74,93 62,98"
                        fill="#60A5FA"
                        opacity="0.7"
                      />
                      <polygon
                        points="78,87 90,82 90,90 78,95"
                        fill="#60A5FA"
                        opacity="0.7"
                      />
                      <polygon
                        points="62,105 74,100 74,108 62,113"
                        fill="#60A5FA"
                        opacity="0.7"
                      />
                    </g>

                    {/* Top Left Boxes */}
                    <g transform="translate(40, 40)">
                      <polygon
                        points="0,10 20,0 40,10 20,20"
                        fill="url(#boxGradient1)"
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

                    {/* Top Right Boxes */}
                    <g transform="translate(220, 20)">
                      <polygon
                        points="0,10 20,0 40,10 20,20"
                        fill="url(#boxGradient1)"
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

                    {/* Signal/Antenna from building */}
                    <g transform="translate(150, 60)">
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-40"
                        stroke="#84CC16"
                        strokeWidth="2"
                      />
                      {/* Signal waves */}
                      <path
                        d="M -15,-25 Q -10,-20 -15,-15"
                        stroke="#84CC16"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.7"
                      />
                      <path
                        d="M -25,-30 Q -15,-22 -25,-14"
                        stroke="#84CC16"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                      />
                      <path
                        d="M 15,-25 Q 10,-20 15,-15"
                        stroke="#84CC16"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.7"
                      />
                      <path
                        d="M 25,-30 Q 15,-22 25,-14"
                        stroke="#84CC16"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
