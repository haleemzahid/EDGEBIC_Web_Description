import Image from 'next/image';
import { LazyVideo } from '@/components/ui/lazy-video';

export function EDGEBIContent() {
  return (
    <div className="space-y-16">
      {/* Overview Header with Image Side by Side */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Overview</h2>
          <p className="text-md text-slate-600">
            Welcome to EDGEBI – A graphical overlay for Resource Manager DB. EDGEBI stands for Enhanced Drag-n-drop Graphical Environment with Business Intelligence
          </p>
        </div>
        <div>
          <Image
            src="/images/Edgebic/2022-10/f1.png"
            alt="EDGEBI Screenshot - Resource Manager DB interface"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>

      {/* 2nd Section - Image (left) - Text (right) */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <Image
            src="/images/Edgebic/2022-10/f2.png"
            alt="EDGEBI Schedule Management Interface"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
            loading="lazy"
            quality={80}
          />
        </div>
        <div>
          <p className="mb-4 text-[18px] text-slate-700">
            Finally, you can manage your production scheduling with an intuitive graphical approach that can be easily customized.
          </p>
          <p className="text-[18px] text-slate-700">
            EDGEBI is the ideal interface for managing the schedule produced by Resource Manager DB.
          </p>
        </div>
      </div>

      {/* 3rd Section - Text (left) - Image (right) */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="text-[18px] text-slate-700">
            Check out the color-coded schedule for up to the minute status on any job. Drag and drop any job segment from one workcenter to another workcenter with a simple click of a mouse, resize any segment based on real time issues – taking longer than planned, or shorter, you can even block out capacity for any downtime or maintenance event. Check out capacity utilization graph, finally press update button and reschedule to have schedule reflect reality.
          </p>
        </div>
        <div>
          <Image
            src="/images/Edgebic/2022-10/f3.png"
            alt="Heat Map - Color-coded capacity utilization"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
            loading="lazy"
            quality={80}
          />
        </div>
      </div>

      {/* 4th Section - Image (left) - Text (right) */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <Image
            src="/images/Edgebic/2022-10/f4.png"
            alt="Schedule Key Dates Reports"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
            loading="lazy"
            quality={80}
          />
        </div>
        <div>
          <p className="mb-4 text-[18px] text-slate-700">
            View the Heat Map to see your capacity loading, for entire schedule, at a glance.
          </p>
          <p className="text-[18px] text-slate-700">
            Run the Schedule Key Dates reports, with an export to Excel to view all activity the way you want.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <p className="mb-4 text-[18px] text-slate-700">
          Contact US to discuss your specific application and challenges and let us prove out the solution with a free Proof Of Concept using your data!
        </p>
        <p className="text-[18px] text-slate-700">
          With solutions for any application and budget, from job shops on up, better production scheduling is only a click away.
        </p>
      </div>

      {/* Video and Hero Image Section */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="flex justify-center">
          <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <LazyVideo
              src="https://www.youtube.com/watch?v=6B4A-acolGk"
              poster="/images/rmdb/rmdb-edge-hero.png"
              className="h-full w-full object-cover"
              title="EDGE BI User Solutions demonstration video"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/images/rmdb/rmdb-edge-hero.png"
            alt="Resource Manager-DB with EDGE (Enhanced Drag & drop Graphical Environment)"
            width={1024}
            height={483}
            className="h-auto max-w-full rounded-lg shadow-lg"
            loading="lazy"
            quality={85}
          />
        </div>
      </div>
    </div>
  );
}
