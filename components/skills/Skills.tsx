import React from "react";

const Skills:React.FC = () => {
  return (
    <section id="skills" className="w-full bg-[#22252C] py-10">
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
      </div>

      <div className="skills_content w-[80%] mx-auto bg-[#313741] p-6 rounded-lg">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Frontend Section */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-4">Frontend</h2>
            <ul className="text-white list-inside space-y-2">
              <li>HTML, CSS (SCSS, SASS)</li>
              <li>Bootstrap, TailwindCSS</li>
              <li>JavaScript(TypeScript)</li>
              <li>ReactJS (Hooks, Router, Redux, Redux Toolkit)</li>
              <li>Next.js(NextAuth,next-i18)</li>
              <li>Git, GitHub</li>
            </ul>
          </div>

          {/* Backend Section */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-4">Backend</h2>
            <ul className="text-white list-inside space-y-2">
              <li>C#</li>
              <li>Asp.net core mvc</li>
              <li>Asp.net core web api</li>
              <li>MS SQL</li>
              <li>ORM (Entity Framework)</li>
              <li>OOP</li>
              <li>Solid principles</li>
              <li>N-Layer architecture</li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
