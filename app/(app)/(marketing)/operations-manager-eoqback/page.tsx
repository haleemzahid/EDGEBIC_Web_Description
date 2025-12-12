import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OperationsManagerEOQBACKPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
              <Badge
                variant="outline"
                className="h-8 rounded-full border-white/20 bg-white/10 px-3 text-sm font-medium text-white shadow-sm"
              >
                OPERATIONS MANAGER
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Operations Manager: EOQBACK
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Economic Order Quantity with Backorders
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Request Free Product
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* EOQBACK Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  EOQ with Backorders (EOQBACK)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
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
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The backorder model works well for companies who where
                  financing the inventory is expensive. It is much less
                  expensive to incur backorders and fill them when the EOQ
                  arrives than it is to hold inventory. Of course, this is a
                  risky policy and the backorder model must be used with
                  caution. The model assumes that customers are willing to wait
                  on backorders and are not lost to the competition. If
                  customers are lost, then the model is inappropriate. There are
                  other models that account for lost customers but they are
                  rarely used in practice because of the risks involved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <div className="flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    className="h-auto max-w-full rounded-lg shadow-md"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
