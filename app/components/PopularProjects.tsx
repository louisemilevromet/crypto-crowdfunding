import Image from "next/image";

const projects = [
  {
    name: "DeFi Lending Platform",
    description: "Decentralized lending and borrowing for everyone",
    progress: 75,
  },
  {
    name: "Cross-Chain DEX",
    description: "Seamless trading across multiple blockchains",
    progress: 60,
  },
  {
    name: "DAO Governance Tool",
    description: "Empower community-driven decision making",
    progress: 40,
  },
];

export default function PopularProjects() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trending Crypto Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <Image
                src={`/placeholder.svg?height=200&width=400`}
                alt={project.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#2B2BFF] h-2.5 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {project.progress}% funded
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
