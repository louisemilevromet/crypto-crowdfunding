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
    <section className="w-full py-16 px-4 lg:px-6">
      <div className="max-w-[1082px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-black">
          How Crypto Crowdfunding Works
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Don't read this, it's just for adding some text & content to the page
          😆
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#f7f6f6] border rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="bg-[#2B2BFF]/10 p-4 rounded-xl mb-6">
                <step.icon className="h-12 w-12 text-[#2B2BFF]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
