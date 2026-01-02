'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Target, Database, Settings, Wrench, RefreshCw } from 'lucide-react';
import { NTClipboardToolBox } from './ntclipboard-toolbox';

export function ManufacturingFeatureSection(): React.JSX.Element {
  const [strategicExpanded, setStrategicExpanded] = useState(false);
  const [dataArchitectureExpanded, setDataArchitectureExpanded] = useState(false);
  const [ruleConfigExpanded, setRuleConfigExpanded] = useState(false);
  const [tacticalExpanded, setTacticalExpanded] = useState(false);
  const [maintenanceExpanded, setMaintenanceExpanded] = useState(false);

  return (
    <section className="bg-white pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Section */}
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-bold text-[#003d5c]">
              Edge simplifies production planning and scheduling
            </h2>
            <h3 className="text-xl font-bold text-[#003d5c]">
              RMDB/EDGE Core Capabilities
            </h3>
            <p className="text-base text-slate-600">
              Our system is engineered to generate accurate, dynamic customer lead times and ensure you meet them consistently.
            </p>
          </div>

          {/* Right Section */}
          <div className="text-left">
            <h3 className="text-lg font-bold text-[#003d5c]">
              Implementation & Optimization Process
            </h3>
            <p className="text-md text-slate-600">
              We guide you through a structured five-step path to move from raw data to an Optimal Schedule that reflects shop-floor reality.
            </p>
            <div className="flex gap-4">
              {/* Expandable Cards Column */}
              <div className="w-1/2">
            {/* Strategic Alignment Expandable Card */}
            <div className="mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)]">
              <button
                type="button"
                onClick={() => setStrategicExpanded(!strategicExpanded)}
                className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-100">
                    <Target className="size-6 text-blue-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-900">Strategic Alignment</h3>
                </div>
                {strategicExpanded ? (
                  <ChevronUp className="size-5 text-[#1e3a5f]" />
                ) : (
                  <ChevronDown className="size-5 text-[#1e3a5f]" />
                )}
              </button>
              <AnimatePresence>
                {strategicExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden px-5 pb-5"
                  >
                    <p className="text-md text-gray-600">
                      We begin by agreeing on the specific production challenges to address and the strategic benefits you wish to pursue.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Data Architecture Expandable Card */}
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)]">
              <button
                type="button"
                onClick={() => setDataArchitectureExpanded(!dataArchitectureExpanded)}
                className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-purple-100">
                    <Database className="size-6 text-purple-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-900">Data Architecture</h3>
                </div>
                {dataArchitectureExpanded ? (
                  <ChevronUp className="size-5 text-[#1e3a5f]" />
                ) : (
                  <ChevronDown className="size-5 text-[#1e3a5f]" />
                )}
              </button>
              <AnimatePresence>
                {dataArchitectureExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden px-5 pb-5"
                  >
                    <p className="text-md text-gray-600">
                      We determine the necessary existing data—such as setup times, cycle times, and shop calendars—while identifying and incorporating any missing data necessary for a complete model.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Rule Configuration Expandable Card */}
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)]">
              <button
                type="button"
                onClick={() => setRuleConfigExpanded(!ruleConfigExpanded)}
                className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-orange-100">
                    <Settings className="size-6 text-orange-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-900">Rule Configuration</h3>
                </div>
                {ruleConfigExpanded ? (
                  <ChevronUp className="size-5 text-[#1e3a5f]" />
                ) : (
                  <ChevronDown className="size-5 text-[#1e3a5f]" />
                )}
              </button>
              <AnimatePresence>
                {ruleConfigExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden px-5 pb-5"
                  >
                    <p className="text-md text-gray-600">
                      All data is imported and configured with known scheduling and business intelligence rules to create a &quot;first pass,&quot; mostly reasonable schedule.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tactical Refinement Expandable Card */}
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)]">
              <button
                type="button"
                onClick={() => setTacticalExpanded(!tacticalExpanded)}
                className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-teal-100">
                    <Wrench className="size-6 text-teal-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-900">Tactical Refinement</h3>
                </div>
                {tacticalExpanded ? (
                  <ChevronUp className="size-5 text-[#1e3a5f]" />
                ) : (
                  <ChevronDown className="size-5 text-[#1e3a5f]" />
                )}
              </button>
              <AnimatePresence>
                {tacticalExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden px-5 pb-5"
                  >
                    <p className="text-md text-gray-600">
                      Because automated rules are never exact enough for the real world, we provide an easy, intuitive method for manual overrides. This allows you to adjust the schedule based on the random events and disruptions that occur in reality.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Automated Maintenance & Rebalancing Expandable Card */}
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(30,58,95,0.15)]">
              <button
                type="button"
                onClick={() => setMaintenanceExpanded(!maintenanceExpanded)}
                className="flex w-full items-center justify-between p-2 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-green-100">
                    <RefreshCw className="size-6 text-green-600" />
                  </div>
                  <h3 className="text-md font-semibold text-gray-900">Automated Maintenance</h3>
                </div>
                {maintenanceExpanded ? (
                  <ChevronUp className="size-5 text-[#1e3a5f]" />
                ) : (
                  <ChevronDown className="size-5 text-[#1e3a5f]" />
                )}
              </button>
              <AnimatePresence>
                {maintenanceExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden px-5 pb-5"
                  >
                    <p className="text-md text-gray-600">
                      Once the optimal schedule is created by blending system rules with manual adjustments, maintenance is effortless. The system intelligently rebalances based on your updates; for instance, if you report starting the 6th step of a process, RMDB/EDGE automatically assumes previous steps are complete and reschedules all subsequent steps.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
              </div>
              {/* Scheduling Process Image */}
              <div className="w-1/2 flex items-center justify-center">
                <Image
                  src="/images/Edgebic/Gemini_Generated_Image_obe2ceobe2ceobe2.png"
                  alt="Scheduling step process diagram showing optimal scheduling workflow"
                  width={400}
                  height={500}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
          <div className="mt-6 space-y-4 lg:mt-0">
            <h3 className="text-xl font-bold text-[#003d5c] md:text-2xl">
              RMDB Integrate MRP and capacity planning
            </h3>
            <p className="text-base leading-relaxed text-slate-700">
              Manage material requirements, prevent bottlenecks with finite
              capacity scheduling, and optimize workcenter loading with visual
              heat maps and what-if analysis capabilities.
            </p>
            <div className="mt-6">
              <Link
                href="/resource-manager-db-2"
                className="inline-flex items-center justify-center rounded-md border-2 border-[#003d5c] bg-transparent px-5 py-2 text-sm font-medium text-[#003d5c] transition-all duration-200 hover:bg-[#003d5c] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#003d5c] focus:ring-offset-2]"
              >
                View Details
              </Link>
            </div>
          </div>
          <div className="relative flex h-[300px] items-center justify-center lg:col-start-2">
            <Image
              src="/images/Edgebic/2022-07/rmdb11.png"
              alt="Integrated MRP and capacity planning dashboard"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Swing Control Software */}
        <div className="mt-6 lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
          <div className="relative flex h-[300px] items-center justify-center lg:col-start-2">
            <Image
              src="/images/Edgebic/2022-10/RMDB-Data-Import.png"
              alt="Data import features for production scheduling"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain"
              loading="lazy"
            />
          </div>

          <div className="mt-6 space-y-4 lg:mt-0">
            <h3 className="text-xl font-bold text-[#003d5c] md:text-2xl">
              Feature
            </h3>
            <ul className="space-y-2 text-base leading-relaxed text-slate-700">
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                <span>Finite Planning & Scheduling</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                <span>MRP and Inventory Management</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                <span>Routings and Priority Scheduling</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                <span>Easy "what-if" analysis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                <span>Purchasing and Receiving</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1 text-[#2FB8DE]">◉</span>
                <span>Forecasting</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/resource-manager-db-in-depth"
                className="inline-flex items-center justify-center rounded-md border-2 border-[#003d5c] bg-transparent px-5 py-2 text-sm font-medium text-[#003d5c] transition-all duration-200 hover:bg-[#003d5c] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#003d5c] focus:ring-offset-2]"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Real-time inventory overview */}
        <div className="mt-6 lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
          <div className="mt-6 space-y-4 lg:mt-0">
            <h3 className="text-xl font-bold text-[#003d5c] md:text-2xl">
              Real-time inventory overview
            </h3>
            <p className="text-base leading-relaxed text-slate-700">
              Prevent stock-outs, lower inventory levels, automate inventory
              transactions, view purchase requirements, track lots, and more.
            </p>
            <div className="mt-6">
              <Link
                href="/production-scheduling-products"
                className="inline-flex items-center justify-center rounded-md border-2 border-[#003d5c] bg-transparent px-5 py-2 text-sm font-medium text-[#003d5c] transition-all duration-200 hover:bg-[#003d5c] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#003d5c] focus:ring-offset-2]"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="relative flex h-[300px] items-center justify-center lg:col-start-2">
            <Image
              src="/images/Edgebic/2022-09/SQC-Pareto.png"
              alt="Real-time inventory overview"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Integrated Manufacturing Software for Business Growth */}
        <div className="mt-6">
          <h2 className="text-center text-3xl font-bold text-[#003d5c] md:text-4xl">
            Integrated Manufacturing Software for Business Growth
          </h2>

          <div className="mt-6 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Production Planning */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="size-16"
                >
                  <rect
                    x="12"
                    y="8"
                    width="40"
                    height="48"
                    rx="4"
                    fill="#5C77F1"
                  />
                  <rect
                    x="16"
                    y="16"
                    width="12"
                    height="8"
                    rx="1"
                    fill="#2FB8DE"
                  />
                  <rect
                    x="16"
                    y="28"
                    width="12"
                    height="8"
                    rx="1"
                    fill="#2FB8DE"
                  />
                  <rect
                    x="16"
                    y="40"
                    width="12"
                    height="8"
                    rx="1"
                    fill="#2FB8DE"
                  />
                  <rect
                    x="32"
                    y="16"
                    width="16"
                    height="4"
                    rx="1"
                    fill="#8CE6FF"
                  />
                  <rect
                    x="32"
                    y="24"
                    width="16"
                    height="4"
                    rx="1"
                    fill="#8CE6FF"
                  />
                  <rect
                    x="32"
                    y="32"
                    width="16"
                    height="4"
                    rx="1"
                    fill="#8CE6FF"
                  />
                  <rect
                    x="32"
                    y="40"
                    width="16"
                    height="4"
                    rx="1"
                    fill="#8CE6FF"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                Production Planning
              </h3>
              <p className="text-base text-slate-700">
                Generate reliable, detailed production plans. Balance materials
                and capacity with actual demand. Effortlessly reschedule
                production orders.
              </p>
            </div>

            {/* Inventory */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="size-16"
                >
                  <rect
                    x="20"
                    y="12"
                    width="24"
                    height="16"
                    rx="2"
                    fill="#5C77F1"
                  />
                  <rect
                    x="20"
                    y="32"
                    width="24"
                    height="16"
                    rx="2"
                    fill="#2FB8DE"
                  />
                  <rect
                    x="16"
                    y="28"
                    width="32"
                    height="4"
                    fill="#003557"
                  />
                  <rect
                    x="16"
                    y="48"
                    width="32"
                    height="4"
                    fill="#003557"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                Inventory
              </h3>
              <p className="text-base text-slate-700">
                Always know what you have in stock. Easily avoid inventory
                shortages and excess. Track inventory by lot or batch, use
                serial numbers and barcodes.
              </p>
            </div>

            {/* Sales Management */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="size-16"
                >
                  <rect
                    x="12"
                    y="16"
                    width="40"
                    height="6"
                    rx="1"
                    fill="#5C77F1"
                  />
                  <rect
                    x="12"
                    y="26"
                    width="40"
                    height="6"
                    rx="1"
                    fill="#2FB8DE"
                  />
                  <rect
                    x="12"
                    y="36"
                    width="40"
                    height="6"
                    rx="1"
                    fill="#8CE6FF"
                  />
                  <circle
                    cx="8"
                    cy="19"
                    r="2"
                    fill="#003557"
                  />
                  <circle
                    cx="8"
                    cy="29"
                    r="2"
                    fill="#003557"
                  />
                  <circle
                    cx="8"
                    cy="39"
                    r="2"
                    fill="#003557"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                Sales Management
              </h3>
              <p className="text-base text-slate-700">
                Calculate order costs and lead times in just a few clicks. Send
                confirmed orders straight to production. Easily manage invoices,
                shipping, and returns.
              </p>
            </div>

            {/* Workforce */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="size-16"
                >
                  <circle
                    cx="32"
                    cy="20"
                    r="8"
                    fill="#5C77F1"
                  />
                  <path
                    d="M32 32 L20 44 L44 44 Z"
                    fill="#2FB8DE"
                  />
                  <circle
                    cx="18"
                    cy="24"
                    r="6"
                    fill="#5C77F1"
                    opacity="0.7"
                  />
                  <circle
                    cx="46"
                    cy="24"
                    r="6"
                    fill="#5C77F1"
                    opacity="0.7"
                  />
                  <path
                    d="M18 34 L10 44 L26 44 Z"
                    fill="#2FB8DE"
                    opacity="0.7"
                  />
                  <path
                    d="M46 34 L38 44 L54 44 Z"
                    fill="#2FB8DE"
                    opacity="0.7"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                Workforce
              </h3>
              <p className="text-base text-slate-700">
                Stay informed on your labor requirements and utilization.
                Provide shop floor workers with a simple interface for reporting
                orders and material use.
              </p>
            </div>

            {/* Procurement */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="size-16"
                >
                  <rect
                    x="16"
                    y="16"
                    width="32"
                    height="32"
                    rx="2"
                    fill="#5C77F1"
                  />
                  <path
                    d="M24 28 L32 20 L40 28"
                    stroke="#2FB8DE"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="32"
                    y1="22"
                    x2="32"
                    y2="40"
                    stroke="#2FB8DE"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                Procurement
              </h3>
              <p className="text-base text-slate-700">
                Easily forecast your procurement requirements. Create pre-filled
                purchase orders in one click. Manage supplier relationships.
                Compare terms and reliability.
              </p>
            </div>

            {/* Finances */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-20 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="size-16"
                >
                  <rect
                    x="12"
                    y="12"
                    width="40"
                    height="40"
                    rx="2"
                    fill="#5C77F1"
                  />
                  <path
                    d="M20 32 L28 24 L36 36 L44 20"
                    stroke="#2FB8DE"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="20"
                    cy="32"
                    r="2"
                    fill="#8CE6FF"
                  />
                  <circle
                    cx="28"
                    cy="24"
                    r="2"
                    fill="#8CE6FF"
                  />
                  <circle
                    cx="36"
                    cy="36"
                    r="2"
                    fill="#8CE6FF"
                  />
                  <circle
                    cx="44"
                    cy="20"
                    r="2"
                    fill="#8CE6FF"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#003d5c]">
                Finances
              </h3>
              <p className="text-base text-slate-700">
                Manage transactions, track income and expenses, and create
                accurate reports. Streamline accounting tasks and make better
                financial decisions.
              </p>
            </div>
          </div>

        </div>

        <NTClipboardToolBox />

        {/* Testimonials Section */}
        <div className="mt-6">
          {/* Star Rating - Commented out */}
          {/* <div className="mb-6 flex justify-center">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="size-6 fill-[#2FB8DE]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div> */}

          <h2 className="text-center text-3xl font-bold text-[#003d5c] md:text-4xl">
            Trusted by Manufacturers Worldwide for Over 25 Years
          </h2>

          {/* Testimonial Cards */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                    <span className="text-xl font-bold text-[#003d5c]">JK</span>
                  </div>
                  <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-[#2FB8DE]">
                    <svg
                      className="size-4 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="mb-1 font-bold text-[#003d5c]">
                    Joel K.
                  </h3>
                  <p className="text-sm text-slate-600">
                    Lean Facilitator
                  </p>
                  <p className="text-xs text-slate-500">
                    Furniture
                  </p>
                </div>
              </div>

              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="size-5 fill-[#FFC107]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <h4 className="mb-3 text-left text-lg font-semibold text-[#003d5c]">
                "Flexible MRP with great ongoing support"
              </h4>

              <p className="mb-4 line-clamp-3 flex-1 text-left text-sm leading-relaxed text-slate-700">
                A unique scheduling system with the flexibility we need for
                custom jobs that have many variables, at the right price point.
                User Solutions has great ongoing support needed for our
                continuous improvement objectives after initial implementation.
              </p>

              <div className="mt-auto pt-4">
                <a
                  href="https://www.capterra.com/p/9402/Resource-Manager-DB/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-[#2FB8DE] transition-colors hover:text-[#1da8ce] hover:underline"
                >
                  Read More
                  <svg
                    className="ml-1 size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                    <span className="text-xl font-bold text-[#003d5c]">RK</span>
                  </div>
                  <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-[#2FB8DE]">
                    <svg
                      className="size-4 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="mb-1 font-bold text-[#003d5c]">
                    Robert K.
                  </h3>
                  <p className="text-sm text-slate-600">
                    Epicor ERP Consultant
                  </p>
                  <p className="text-xs text-slate-500">
                    Management Consulting
                  </p>
                </div>
              </div>

              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="size-5 fill-[#FFC107]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <h4 className="mb-3 text-left text-lg font-semibold text-[#003d5c]">
                "Resource Manager DB Review"
              </h4>

              <div className="mb-2 text-left">
                <span className="inline-flex items-center text-xs font-medium text-green-700">
                  <svg
                    className="mr-1 size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Pros
                </span>
              </div>

              <p className="mb-4 line-clamp-3 flex-1 text-left text-sm leading-relaxed text-slate-700">
                Being a seasoned Epicor Software ERP implementation consultant
                and also a customer for Resource Manager DB (RMDB) in a previous
                role working for Instruments For Research And Industry (IFRAI),
                I can personally state that RMDB is easier to implement than the
                larger ERP packages and requires minimal training, a short
                implementation cycle, minimal network infrastructure, data
                friendly import/export capability.
              </p>

              <div className="mt-auto pt-4">
                <a
                  href="https://www.capterra.com/p/9402/Resource-Manager-DB/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-[#2FB8DE] transition-colors hover:text-[#1da8ce] hover:underline"
                >
                  Read More
                  <svg
                    className="ml-1 size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                    <span className="text-xl font-bold text-[#003d5c]">MW</span>
                  </div>
                  <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-[#2FB8DE]">
                    <svg
                      className="size-4 fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="mb-1 font-bold text-[#003d5c]">
                    Mike W.
                  </h3>
                  <p className="text-sm text-slate-600">
                    Regional Manager
                  </p>
                  <p className="text-xs text-slate-500">
                    Management Consulting
                  </p>
                </div>
              </div>

              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="size-5 fill-[#FFC107]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <h4 className="mb-3 text-left text-lg font-semibold text-[#003d5c]">
                "Resource Manager Capabilities"
              </h4>

              <div className="mb-2 text-left">
                <span className="inline-flex items-center text-xs font-medium text-green-700">
                  <svg
                    className="mr-1 size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Pros
                </span>
              </div>

              <p className="mb-4 line-clamp-3 flex-1 text-left text-sm leading-relaxed text-slate-700">
                The software has many desirable capabilities, including the
                ability to engage in capacity planning by resource. However, the
                most powerful feature is the ability to engage in "what if"
                scenario analysis before firming a schedule, and the ability to
                do both forward and backward scheduling. Can answer the
                questions..... "if we start the order today, when will it be
                complete?" and "if the customer wants it by XX date, when do we
                need to start the order?"
              </p>

              <div className="mt-auto pt-4">
                <a
                  href="https://www.capterra.com/p/9402/Resource-Manager-DB/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-[#2FB8DE] transition-colors hover:text-[#1da8ce] hover:underline"
                >
                  Read More
                  <svg
                    className="ml-1 size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Customer Logos - Commented out */}
          {/* <div className="mt-6">
            <h3 className="mb-6 text-center text-2xl font-bold text-[#003d5c]">
              Some of our customers
            </h3>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <a
                href="https://lifecore.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Lifecore website"
                className="relative flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-slate-900 p-6 shadow-sm transition-all hover:shadow-md"
              >
                <Image
                  src="/images/Edgebic/partners/lifecore-logo.png"
                  alt="Lifecore"
                  width={150}
                  height={50}
                  className="object-contain"
                  loading="lazy"
                />
              </a>
              <a
                href="https://www.viking-forge.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Viking Forge website"
                className="relative flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <Image
                  src="/images/Edgebic/partners/vklogo.jpg"
                  alt="Viking Forge"
                  width={150}
                  height={50}
                  className="object-contain"
                  loading="lazy"
                />
              </a>
              <a
                href="https://mtmmanufacturing.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <span className="text-center text-lg font-bold text-[#003d5c]">
                  MTM Manufacturing
                </span>
              </a>
              <a
                href="https://www.dawloom.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Dawloom website"
                className="relative flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <Image
                  src="/images/Edgebic/partners/dawloom-logo.svg"
                  alt="Dawloom"
                  width={150}
                  height={50}
                  className="object-contain"
                  loading="lazy"
                />
              </a>
            </div>
          </div> */}

        </div>
      </div>
    </section>
  );
}
