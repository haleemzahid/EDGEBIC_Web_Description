import React from 'react';

export default function JSLJobSchedulerLiteInDepthPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">EDGEBIC : In Depth</h1>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Overview */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Overview</h2>
            <p className="text-gray-700">
              Welcome to EDGEBIC. Designed as an entry level production scheduling offering that allows users to quickly create a series of routing steps then schedule according to capacity limitations, direction (Forward or Reverse), and Priorities. It also offers a quick method to load data either directly or importing from an Excel sheet. If you have more complex routings (non linear, or non batch, etc.) then consider Resource Manager-DB (RMDB) as it can model scheduling most any manufacturing flow.
            </p>
          </div>
          <img
            src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight-1.png"
            alt="Production scheduling software interface"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Features</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Simple, familiar interface</h3>
              <p className="text-gray-700">One step menus, on-screen buttons, or sheet tabs make navigation a snap.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Easy to configure and run</h3>
              <p className="text-gray-700">Quick, intuitive layout and prompts allows you to focus on your business, instead of learning another software product.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Finite capacity planning and forward scheduling</h3>
              <p className="text-gray-700">Global and/or detailed workcenter configuration can be made and applied instantly.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/rit.png" alt="Daily work hours tracking" className="rounded-lg shadow-md" />
            <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/le.png" alt="Data import interface" className="rounded-lg shadow-md" />
          </div>
        </div>

        {/* Modules */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Modules</h2>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
            {['Import Data', 'Daily Hours', 'Holidays', 'Configure', 'Resources', 'Orders', 'FG / RL', 'Reports', 'Schedule', 'InSight', 'Export Data', 'Exit'].map((module) => (
              <div key={module} className="rounded bg-blue-50 p-2 text-center text-sm font-medium">
                {module}
              </div>
            ))}
          </div>
        </div>

        {/* Import Data */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Import Data</h2>
            <p className="text-gray-700">
              We recommend you review JSL with currently loaded demo data then consider using Import Data to load your application specific data. Just edit the importsback.xlsx to represent your data.
            </p>
          </div>
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/import.png" alt="Data import window" className="rounded-lg shadow-md" />
        </div>

        {/* Daily Hours */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/dailyhours.png" alt="Daily Hours interface" className="rounded-lg shadow-md md:order-1" />
          <div className="md:order-2">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Daily Hours</h2>
            <p className="text-gray-700">
              Daily Hours is normal operating hours for your business. You might consider entering net hours (subtract breaks, lunch, efficiencies). Simply click on a day and enter start and end times.
            </p>
          </div>
        </div>

        {/* Holidays */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Holidays</h2>
            <p className="text-gray-700">
              Holidays can be a partial shutdown event for company, repeating holiday (like Christmas), or varies each year according to calendar (for example Thanksgiving).
            </p>
          </div>
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/holidays.png" alt="Holiday management interface" className="rounded-lg shadow-md" />
        </div>

        {/* Resources */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/resoursces.png" alt="Resource management interface" className="rounded-lg shadow-md md:order-1" />
          <div className="md:order-2">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Resources</h2>
            <p className="text-gray-700">
              To add a new resource simply clear input table, enter in Name, description, and number of resources. Then Save. The Num of Res is how many of that workcenter/resource you have. It is multiplied by daily hours to calculate gross hours available.
            </p>
          </div>
        </div>

        {/* Finish Goods */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Finish Goods</h2>
            <p className="text-gray-700">
              Finished Goods/Routing List (FG/RL) is what will be scheduled. You can enter a new name, then list the workcenters and timing in the order they are worked, then save. JSL schedules in a linear mode, meaning all parts are completed at one workcenter before moving on to next.
            </p>
          </div>
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/FG.png" alt="Inventory management interface" className="rounded-lg shadow-md" />
        </div>

        {/* Orders */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/orders-1024x459.png" alt="Order management system" className="rounded-lg shadow-md md:order-1" />
          <div className="md:order-2">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-700">
              Orders is what will be scheduled. You can enter a new name, then list the workcenters and timing in the order they are worked, then save. If you have routings that don't fit this simple model, please call and we can discuss other options.
            </p>
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Schedule</h2>
            <p className="text-gray-700">See call out details below.</p>
          </div>
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/schdle.png" alt="Job scheduling interface" className="rounded-lg shadow-md" />
        </div>

        {/* InSights */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/insight.png" alt="Scheduling software with calendar" className="rounded-lg shadow-md md:order-1" />
          <div className="md:order-2">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">InSights</h2>
            <p className="text-gray-700">
              Insight is the most comprehensive and feature rich module in JSL. Check out the schedule calendar Legend to see at a glance how selected month is scheduled. The time scale can be 15 minutes to a week. Right click on Workcenter ID to display color coded efficiency.
            </p>
          </div>
        </div>

        {/* Export Data */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Export Data</h2>
            <p className="text-gray-700">
              Export data however you wish. Sometimes its quicker to export out data to Excel, make big changes as needed, then just import in.
            </p>
          </div>
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/exdata.png" alt="Data export interface" className="rounded-lg shadow-md" />
        </div>

        {/* Theme Configuration */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/th-conf.png" alt="Theme configuration interface" className="rounded-lg shadow-md md:order-1" />
          <div className="md:order-2">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Theme Configuration</h2>
            <p className="text-gray-700">
              Configure allows you to try different themes, back up and restore database, and also register the JSL for customer use.
            </p>
          </div>
        </div>

        {/* Reports */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Reports</h2>
            <p className="text-gray-700">There are a variety of reports available.</p>
          </div>
          <img src="https://www.usersolutions.com/wp-content/uploads/2022/10/Reports.png" alt="Schedule report interface" className="rounded-lg shadow-md" />
        </div>

        {/* Awards Banner */}
        <div className="rounded-lg bg-blue-50 p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-gray-900">CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!</h3>
          <img
            src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
            alt="Awards logos"
            className="mx-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
