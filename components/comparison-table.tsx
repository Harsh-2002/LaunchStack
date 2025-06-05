import { Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ComparisonTable() {
  const features = [
    {
      name: "Starting Price",
      launchstack: "$2/month",
      zapier: "$29.99/month",
      make: "$9/month",
      highlight: true
    },
    {
      name: "Workflow/Task Limits",
      launchstack: "Unlimited workflows",
      zapier: "Limited by plan (5-50k tasks/mo)",
      make: "Operations-based limits",
      highlight: true
    },
    {
      name: "Data Privacy",
      launchstack: "Full data control",
      zapier: "Processed in Zapier cloud",
      make: "Processed in Make cloud",
      highlight: true
    },
    {
      name: "Infrastructure Management",
      launchstack: "Fully managed",
      zapier: "Cloud only",
      make: "Cloud only",
      highlight: true
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Platform Comparison</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            See how LaunchStack compares to other automation platforms
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[200px] font-heading">Feature</TableHead>
                <TableHead className="text-center font-heading">LaunchStack (n8n)</TableHead>
                <TableHead className="text-center font-heading">Zapier</TableHead>
                <TableHead className="text-center font-heading">Make (Integromat)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-body">
              {features.map((feature, index) => (
                <TableRow key={index} className={feature.highlight ? "bg-gray-50" : ""}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-center">
                    {typeof feature.launchstack === 'boolean' ? (
                      feature.launchstack ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className={feature.highlight ? "font-semibold" : ""}>
                        {feature.launchstack}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.zapier === 'boolean' ? (
                      feature.zapier ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      feature.zapier
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.make === 'boolean' ? (
                      feature.make ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      feature.make
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground font-body">
            LaunchStack provides all the power of n8n without the technical complexity of self-hosting, 
            at a fraction of the cost of other automation platforms.
          </p>
        </div>
      </div>
    </section>
  );
}