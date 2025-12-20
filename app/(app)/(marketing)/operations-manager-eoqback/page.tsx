import { Card, CardContent } from '@/components/ui/card';

export default function OperationsManagerEOQBACKPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: EOQBACK
            </h1>
            <p className="text-gray-700">
              Economic Order Quantity with Backorders
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                EOQ with Backorders (EOQBACK)
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Backorders are common in inventories held for resale to
                customers. The EOQ model can be modified to handle backorders
                by including one more cost, the cost per unit backordered.
                This cost is extremely difficult to assess. In theory, the
                backorder cost should include any special cost of handling the
                backorder, such as the use of premium transportation, and any
                cost associated with loss of customer goodwill. As a surrogate
                for the true backorder cost, most companies use the profit per
                unit.
              </p>
              <p className="leading-relaxed text-gray-700">
                The backorder model works well for companies who where
                financing the inventory is expensive. It is much less
                expensive to incur backorders and fill them when the EOQ
                arrives than it is to hold inventory. Of course, this is a
                risky policy and the backorder model must be used with
                caution. The model assumes that customers are willing to wait
                on backorders and are not lost to the competition. If
                customers are lost, then the model is inappropriate.
              </p>
            </div>

            {/* Awards Banner */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
