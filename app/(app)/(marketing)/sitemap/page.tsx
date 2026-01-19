'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  FileText,
  Home,
  Info,
  Mail,
  Newspaper,
  Settings,
  ShoppingCart,
  Users,
  Video,
  Wrench,
  Zap
} from 'lucide-react';

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900">Site Map</h1>
            <p className="text-lg text-slate-600">
              Navigate through all pages of our website
            </p>
          </div>

          {/* Sitemap Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Main Pages */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Home className="size-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Main Pages
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-blue-600 hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aboutus"
                    className="text-blue-600 hover:underline"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-blue-600 hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-blue-600 hover:underline"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions"
                    className="text-blue-600 hover:underline"
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-blue-600 hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Information */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Info className="size-5 text-green-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Company
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/company-history"
                    className="text-blue-600 hover:underline"
                  >
                    Company History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mission"
                    className="text-blue-600 hover:underline"
                  >
                    Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mission-statement"
                    className="text-blue-600 hover:underline"
                  >
                    Mission Statement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/values"
                    className="text-blue-600 hover:underline"
                  >
                    Our Values
                  </Link>
                </li>
                <li>
                  <Link
                    href="/story"
                    className="text-blue-600 hover:underline"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/why-user-solutions"
                    className="text-blue-600 hover:underline"
                  >
                    Why User Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    className="text-blue-600 hover:underline"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products - Production Scheduling */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Wrench className="size-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Production Scheduling
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/production-planning-scheduling-solutions"
                    className="text-blue-600 hover:underline"
                  >
                    Production Planning & Scheduling Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/production-scheduling-products"
                    className="text-blue-600 hover:underline"
                  >
                    Production Scheduling Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resource-manager-db-2"
                    className="text-blue-600 hover:underline"
                  >
                    Resource Manager DB
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resource-manager-db-in-depth"
                    className="text-blue-600 hover:underline"
                  >
                    Resource Manager DB In-Depth
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rmdb-quick-start"
                    className="text-blue-600 hover:underline"
                  >
                    RMDB Quick Start
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resource-manager-for-excel-2"
                    className="text-blue-600 hover:underline"
                  >
                    Resource Manager For Excel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resource-manager-for-excel-in-depth"
                    className="text-blue-600 hover:underline"
                  >
                    Resource Manager For Excel In-Depth
                  </Link>
                </li>
                <li>
                  <Link
                    href="/edgebi"
                    className="text-blue-600 hover:underline"
                  >
                    EDGEBI Suite
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compare-products"
                    className="text-blue-600 hover:underline"
                  >
                    Compare Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Excel Applications */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="size-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Excel Applications
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/excel-applications"
                    className="text-blue-600 hover:underline"
                  >
                    Excel Applications Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/excel-templates"
                    className="text-blue-600 hover:underline"
                  >
                    Excel Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jsl-job-scheduler-lite"
                    className="text-blue-600 hover:underline"
                  >
                    Job Scheduler Lite (JSL)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/spreadsheet-scheduler"
                    className="text-blue-600 hover:underline"
                  >
                    Spreadsheet Scheduler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/spreadsheet-qc"
                    className="text-blue-600 hover:underline"
                  >
                    Spreadsheet QC
                  </Link>
                </li>
                <li>
                  <Link
                    href="/workcell-planner"
                    className="text-blue-600 hover:underline"
                  >
                    Workcell Planner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/workcenter-schedulerxl"
                    className="text-blue-600 hover:underline"
                  >
                    Workcenter Scheduler XL
                  </Link>
                </li>
                <li>
                  <Link
                    href="/workcenter-scheduler-xl-in-depth"
                    className="text-blue-600 hover:underline"
                  >
                    Workcenter Scheduler XL In-Depth
                  </Link>
                </li>
                <li>
                  <Link
                    href="/operations-manager"
                    className="text-blue-600 hover:underline"
                  >
                    Operations Manager
                  </Link>
                </li>
              </ul>
            </div>

            {/* Operations Manager Tools */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Settings className="size-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Operations Manager
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/operations-manager-learn"
                    className="text-blue-600 hover:underline"
                  >
                    Operations Manager Learn
                  </Link>
                </li>
                <li>
                  <Link
                    href="/operations-manager-mrp1"
                    className="text-blue-600 hover:underline"
                  >
                    MRP Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/operations-manager-eoq"
                    className="text-blue-600 hover:underline"
                  >
                    EOQ Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/operations-manager-sked1aa"
                    className="text-blue-600 hover:underline"
                  >
                    Scheduling Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/operations-manager-p-chart"
                    className="text-blue-600 hover:underline"
                  >
                    P-Chart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/operations-manager-cu-chart"
                    className="text-blue-600 hover:underline"
                  >
                    CU-Chart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/operations-manager-i-chart"
                    className="text-blue-600 hover:underline"
                  >
                    I-Chart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/operations-manager-mr-chart"
                    className="text-blue-600 hover:underline"
                  >
                    MR-Chart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Simulation Products */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="size-5 text-yellow-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Simulation Products
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/promodel"
                    className="text-blue-600 hover:underline"
                  >
                    ProModel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/promodel-autocad-edition"
                    className="text-blue-600 hover:underline"
                  >
                    ProModel AutoCAD Edition
                  </Link>
                </li>
                <li>
                  <Link
                    href="/process-simulator"
                    className="text-blue-600 hover:underline"
                  >
                    Process Simulator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/medmodel"
                    className="text-blue-600 hover:underline"
                  >
                    MedModel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicemodel"
                    className="text-blue-600 hover:underline"
                  >
                    ServiceModel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/3d-animator"
                    className="text-blue-600 hover:underline"
                  >
                    3D Animator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/simrunner"
                    className="text-blue-600 hover:underline"
                  >
                    SimRunner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stat-fit"
                    className="text-blue-600 hover:underline"
                  >
                    Stat::Fit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio-simulator"
                    className="text-blue-600 hover:underline"
                  >
                    Portfolio Simulator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Success Stories */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Award className="size-5 text-yellow-500" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Success Stories
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/success-stories"
                    className="text-blue-600 hover:underline"
                  >
                    All Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sleepmaster-ltd"
                    className="text-blue-600 hover:underline"
                  >
                    Sleepmaster Ltd
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cook-compression"
                    className="text-blue-600 hover:underline"
                  >
                    Cook Compression
                  </Link>
                </li>
                <li>
                  <Link
                    href="/incon-incorporated"
                    className="text-blue-600 hover:underline"
                  >
                    Incon Incorporated
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources & Learning */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="size-5 text-teal-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Resources
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blogs"
                    className="text-blue-600 hover:underline"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/videos"
                    className="text-blue-600 hover:underline"
                  >
                    Videos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/training"
                    className="text-blue-600 hover:underline"
                  >
                    Training
                  </Link>
                </li>
                <li>
                  <Link
                    href="/consulting"
                    className="text-blue-600 hover:underline"
                  >
                    Consulting Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/product-downloads"
                    className="text-blue-600 hover:underline"
                  >
                    Product Downloads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/students"
                    className="text-blue-600 hover:underline"
                  >
                    For Students
                  </Link>
                </li>
                <li>
                  <Link
                    href="/students-free-trial"
                    className="text-blue-600 hover:underline"
                  >
                    Students Free Trial
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blog Articles */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Newspaper className="size-5 text-red-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Blog Articles
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/resource-management-blog"
                    className="text-blue-600 hover:underline"
                  >
                    Resource Management Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lean-manufacturing-solutions"
                    className="text-blue-600 hover:underline"
                  >
                    Lean Manufacturing Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/erp-solutions-for-production-planning"
                    className="text-blue-600 hover:underline"
                  >
                    ERP Solutions for Production Planning
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enhancing-supply-chain-visibility-through-advanced-scheduling-solutions"
                    className="text-blue-600 hover:underline"
                  >
                    Supply Chain Visibility
                  </Link>
                </li>
                <li>
                  <Link
                    href="/li-ion-battery-production-scheduling-software"
                    className="text-blue-600 hover:underline"
                  >
                    Li-ion Battery Production Scheduling
                  </Link>
                </li>
                <li>
                  <Link
                    href="/top-10-manufacturing-kpis-in-2024"
                    className="text-blue-600 hover:underline"
                  >
                    Top 10 Manufacturing KPIs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lets-make-manufacturing-great-again"
                    className="text-blue-600 hover:underline"
                  >
                    Make Manufacturing Great Again
                  </Link>
                </li>
              </ul>
            </div>

            {/* Press Releases */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Newspaper className="size-5 text-pink-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Press Releases
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/press_release"
                    className="text-blue-600 hover:underline"
                  >
                    All Press Releases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press_release/rmdb-v6-innovates-production-scheduling"
                    className="text-blue-600 hover:underline"
                  >
                    RMDB v6 Innovates Production Scheduling
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press_release/scheduling-system-narrows-skills-gap"
                    className="text-blue-600 hover:underline"
                  >
                    Scheduling System Narrows Skills Gap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press_release/lets-make-manufacturing-great-national-manufacturing-day-2020"
                    className="text-blue-600 hover:underline"
                  >
                    Manufacturing Day 2020
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press_release/user-solutions-joins-fight-against-covid-free-production-scheduling-software"
                    className="text-blue-600 hover:underline"
                  >
                    Free Production Scheduling for COVID-19
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user-solutions-inc-named-as-one-of-top-erp-solutions-transforming-business-2016-by-cio-applications-as-they-celebrate-25-years-in-business"
                    className="text-blue-600 hover:underline"
                  >
                    Top ERP Solutions 2016
                  </Link>
                </li>
              </ul>
            </div>

            {/* Purchase & Downloads */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <ShoppingCart className="size-5 text-cyan-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Purchase & Downloads
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/buy-now"
                    className="text-blue-600 hover:underline"
                  >
                    Buy Now
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buy-now-resource-manager"
                    className="text-blue-600 hover:underline"
                  >
                    Buy Resource Manager
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buy-now-operations-manager"
                    className="text-blue-600 hover:underline"
                  >
                    Buy Operations Manager
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buy-now-spreadsheet-scheduler"
                    className="text-blue-600 hover:underline"
                  >
                    Buy Spreadsheet Scheduler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buy-now-spreadsheet-qc"
                    className="text-blue-600 hover:underline"
                  >
                    Buy Spreadsheet QC
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buy-now-workcell-planner"
                    className="text-blue-600 hover:underline"
                  >
                    Buy Workcell Planner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jsl-job-scheduler-lite-download"
                    className="text-blue-600 hover:underline"
                  >
                    Download JSL
                  </Link>
                </li>
                <li>
                  <Link
                    href="/thankyou-for-downloading-resource-manager-for-excel"
                    className="text-blue-600 hover:underline"
                  >
                    Download RME
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Policies */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="size-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Legal & Policies
                </h2>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-use"
                    className="text-blue-600 hover:underline"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security-guide"
                    className="text-blue-600 hover:underline"
                  >
                    Security Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-bold">
              Can&apos;t Find What You&apos;re Looking For?
            </h3>
            <p className="mb-6 text-blue-100">
              Contact us and we&apos;ll help you find the right solution for
              your needs
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-blue-600 transition-transform hover:scale-105"
            >
              <Mail className="size-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
