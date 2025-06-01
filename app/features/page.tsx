import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Code2, 
  Workflow, 
  Bot, 
  Webhook, 
  Server, 
  Database,
  FileJson,
  Cog,
  Boxes,
  History,
  FolderTree,
  Bug
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: "Workflow Automation",
    description: "Build powerful automation workflows with n8n's visual editor. Connect multiple services and automate repetitive tasks with ease.",
    icon: Workflow
  },
  {
    title: "400+ Built-in Nodes",
    description: "Access a vast library of pre-built integrations including popular services, databases, and APIs.",
    icon: Boxes
  },
  {
    title: "Custom Code Support",
    description: "Add JavaScript or Python code nodes to extend functionality and handle complex business logic.",
    icon: Code2
  },
  {
    title: "Advanced AI Integration",
    description: "Leverage AI capabilities through LangChain integration for intelligent automation workflows.",
    icon: Bot
  },
  {
    title: "Webhook Support",
    description: "Create and manage webhooks to trigger workflows based on external events.",
    icon: Webhook
  },
  {
    title: "REST API Access",
    description: "Programmatically control your n8n instance through a comprehensive REST API.",
    icon: Server
  },
  {
    title: "Data Storage Options",
    description: "Store and manage workflow data with support for multiple database types.",
    icon: Database
  },
  {
    title: "JSON Support",
    description: "Process and transform JSON data with powerful built-in functions.",
    icon: FileJson
  }
];

const additionalFeatures = [
  {
    title: "Workflow Organization",
    description: "Organize workflows into folders for better management (with registration)",
    icon: FolderTree
  },
  {
    title: "Debug Mode",
    description: "Debug workflows in the editor with execution data pinning (with registration)",
    icon: Bug
  },
  {
    title: "24-Hour History",
    description: "Access 24 hours of workflow history for troubleshooting (with registration)",
    icon: History
  },
  {
    title: "Custom Execution Data",
    description: "Save and annotate execution metadata (with registration)",
    icon: Cog
  }
];

export default function Features() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Workflow Automation Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              LaunchStack provides all the powerful features of n8n's community edition, 
              hosted and managed for you at an affordable price.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>

          <div className="bg-black text-white rounded-2xl p-8 md:p-12 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Features with Registration</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Register your n8n instance to unlock these powerful features at no extra cost
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="p-6 bg-white/5 rounded-lg border border-white/10">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Launch your n8n instance today and focus on building workflows while we handle the infrastructure.
            </p>
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}