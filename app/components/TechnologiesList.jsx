export default function TechnologiesList() {
  const technologies = ["Three.js", "React", "Next.js", "R3F", "Drei", "GSAP"];

  return (
    <div className="min-h-1/2  flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-white font-bold mb-2 p-2">Использую технологии</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {technologies.map((tech) => (
            <button
              key={tech}
              className="btn btn-primary btn-outline h-10 text-lg font-medium hover:btn-primary hover:scale-130 transition-transform text-white rounded-lg"
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
