import { Search, Coins, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Discover",
      icon: Search,
      description: "Explore innovative crypto projects seeking funding",
    },
    {
      title: "Contribute",
      icon: Coins,
      description: "Back projects with cryptocurrency investments",
    },
    {
      title: "Grow",
      icon: TrendingUp,
      description: "Watch your investments flourish as projects succeed",
    },
  ];

  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold text-center mb-4">
        How Crypto Crowdfunding Works
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        Don't read this, it's just for adding some text & content to the page 😆
      </p>
      <div className="bg-[#fcfcfc] rounded-2xl shadow-sm p-8 md:p-12 container px-4 md:px-6 mx-auto max-w-5xl py-12 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-4 rounded-xl mb-4">
                <step.icon className="h-8 w-8 text-[#2B2BFF]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
