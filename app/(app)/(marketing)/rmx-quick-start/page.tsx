import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resource Manager for Excel - 12 Steps to Success | User Solutions',
  description: 'Complete quick start guide for Resource Manager for Excel - the MS Excel based planning and scheduling software solution for all manufacturing enterprises.',
};

export default function RMXQuickStartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Resource Manager for Excel
          </h1>
          <p className="text-xl md:text-2xl italic">12 Steps to Success</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">1. Introduction & Installation</h2>

          <div className="prose max-w-none">
            <p className="text-lg mb-4">
              Thank you for your interest in <strong>Resource Manager for Excel</strong> --
              the only MS Excel based low-cost, planning and scheduling software solution
              that works for all manufacturing enterprises.
            </p>

            <p className="mb-4">
              Either as standalone to gain valuable training for any ERP system for bigger
              companies or perfect for smaller-medium sized companies who can benefit from
              more efficient production scheduling.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">System Requirements</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Excel 97 or greater installed and working on standalone PC or Network</li>
                <li>Basic working knowledge of your spreadsheet (entering data, file management, printing)</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
              <h3 className="text-xl font-bold text-green-900 mb-3">No Rules – No Limits</h3>
              <p>
                In contrast to other shop control, MRP or manufacturing software offerings,
                Resource Manager does not have a rigid, standard procedure for every application
                to follow. Rather, Resource Manager is designed to adapt to <em>your requirements</em>.
              </p>
              <p className="mt-4">
                You will <strong>NOT</strong> have to change the way you work today to recognize
                significant benefits with Resource Manager.
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">12 Steps to Success - Table of Contents</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <div>
                  <h3 className="font-semibold">Introduction & Installation</h3>
                  <p className="text-sm text-gray-600">System requirements and setup</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <div>
                  <h3 className="font-semibold">Navigation and General Options</h3>
                  <p className="text-sm text-gray-600">Learn the interface</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <div>
                  <h3 className="font-semibold">Initialization: Day Chart</h3>
                  <p className="text-sm text-gray-600">Set working hours and holidays</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                <div>
                  <h3 className="font-semibold">Initialization: Master Product and Operations List</h3>
                  <p className="text-sm text-gray-600">Define your products and operations</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                <div>
                  <h3 className="font-semibold">Initialization: Building BORs</h3>
                  <p className="text-sm text-gray-600">Create Bills of Resource</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">6</span>
                <div>
                  <h3 className="font-semibold">Scheduling: Top Level Order Entry</h3>
                  <p className="text-sm text-gray-600">Enter your orders</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">7</span>
                <div>
                  <h3 className="font-semibold">Scheduling: Initial Master Schedule</h3>
                  <p className="text-sm text-gray-600">Generate your first schedule</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">8</span>
                <div>
                  <h3 className="font-semibold">Reporting: Gantt</h3>
                  <p className="text-sm text-gray-600">Visualize your schedule</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">9</span>
                <div>
                  <h3 className="font-semibold">Production/Resource Calendar</h3>
                  <p className="text-sm text-gray-600">Manage capacity and resources</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">10</span>
                <div>
                  <h3 className="font-semibold">More Reporting</h3>
                  <p className="text-sm text-gray-600">Additional reports and analytics</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">11</span>
                <div>
                  <h3 className="font-semibold">Inventory, Purchasing, Tracking</h3>
                  <p className="text-sm text-gray-600">Manage materials and orders</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">12</span>
                <div>
                  <h3 className="font-semibold">Order from UserSolutions.com</h3>
                  <p className="text-sm text-gray-600">Get started today</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">12 Steps to Success Overview</h2>

          <p className="text-lg mb-6">
            There is a simple three-step process for basic running of Resource Manager for Excel:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-300">
              <div className="text-4xl font-bold text-blue-600 mb-4">1</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Initialize</h3>
              <p className="text-gray-700">Set up your products, operations, and working calendar</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-300">
              <div className="text-4xl font-bold text-green-600 mb-4">2</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Schedule</h3>
              <p className="text-gray-700">Enter orders and generate master production schedule</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-300">
              <div className="text-4xl font-bold text-purple-600 mb-4">3</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Report</h3>
              <p className="text-gray-700">View Gantt charts, calendars, and other analytics</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mt-8">
            <p className="text-lg">
              <strong>Note:</strong> You can exchange data with other systems at any point in the Process.
            </p>
          </div>
        </section>

        {/* Installation */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Installation</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold mb-2">Step 1: Download the File</h3>
              <p>Download the RMX2023D.xlsm file from the demo download section on our website or from email.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold mb-2">Step 2: Unblock the File</h3>
              <p>Right-click on the file, choose Properties, and UNBLOCK if checked at bottom of form.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold mb-2">Step 3: Enable Macros</h3>
              <p>Go to Excel File → Options, add Developer to ribbon, then click on Developer → Macro Security and enable macros.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold mb-2">Step 4: Open the File</h3>
              <p>Start Excel and click on File → Open → RMX2023D.xlsm. If prompted, enable macros.</p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mt-6">
            <h3 className="text-xl font-bold text-red-900 mb-3">Important Notes:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Screens are sized for 600X800 resolution</li>
              <li>Use cursor keys or mouse to navigate (Tab key moves full screen)</li>
              <li>DO NOT space or type over cells with data</li>
              <li>When transferring data, use Edit → Paste Special → Values</li>
              <li>DO NOT use the Print Icon on main Toolbar</li>
            </ul>
          </div>
        </section>

        {/* Support Resources */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Up and Running</h2>

          <p className="text-lg mb-6">
            There are several resources to ensure a successful start:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-3">📞 Call Us for a Walkthrough</h3>
              <p className="mb-4">
                Due to the flexibility of the product, there may be more than one way to address
                your application. Give us a call and let us summarize how to run Resource Manager
                to meet your specific needs.
              </p>
              <p className="text-2xl font-bold text-blue-600">248.486.6365</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-3">📚 Documentation</h3>
              <ul className="space-y-2">
                <li>✓ Follow these 12 Steps to Success with Sample Data</li>
                <li>✓ Printed manual included</li>
                <li>✓ Full manual help link on first page</li>
                <li>✓ Quick Tips throughout the program (red triangle in cells)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Order the complete production version today and experience the power of Resource Manager for Excel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact-us"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg text-center transition-colors"
            >
              Contact Us Today
            </a>
            <a
              href="tel:8003218737"
              className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-8 rounded-lg text-center transition-colors"
            >
              Call 800-321-8737
            </a>
          </div>
        </section>

        {/* Download PDF */}
        <section className="bg-gray-100 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Download the Complete Guide</h3>
          <a
            href="/pdf/RMXQuickStart.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            Download PDF Guide
          </a>
        </section>

      </div>
    </div>
  );
}
