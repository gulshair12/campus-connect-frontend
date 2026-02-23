export function AboutContentSection() {
  const sections = [
    {
      title: "What is Campus Connect?",
      content:
        "Campus Connect is a student-focused platform designed to support international students as they navigate life abroad. We provide tools for socializing, discovering events, accessing resources, and finding study buddies.",
    },
    {
      title: "Socializing Between Students",
      content:
        "Connect with peers from around the world. Our chat and community features help you build friendships, share experiences, and feel at home in your new environment.",
    },
    {
      title: "Events",
      content:
        "Stay updated on campus events, workshops, cultural festivals, and career fairs. Never miss an opportunity to get involved and expand your network.",
    },
    {
      title: "Resources",
      content:
        "Access study guides, visa information, housing tips, and academic materials. All curated to help you succeed in your new academic setting.",
    },
    {
      title: "Buddy System",
      content:
        "Get matched with experienced students who can guide you through campus life, answer questions, and help you settle in. A buddy makes the transition easier.",
    },
  ];

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-12">
          {sections.map(({ title, content }) => (
            <div key={title}>
              <h2 className="text-xl font-bold text-[#1e3a5f] md:text-2xl">
                {title}
              </h2>
              <p className="mt-3 text-gray-600 leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
