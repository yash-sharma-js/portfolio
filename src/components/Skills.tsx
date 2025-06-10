
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTerminalMode } from '@/hooks/useTerminalMode';
import { Badge } from '@/components/ui/badge';

const skillsData = [
  {
    category: 'Frontend',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML/CSS', 'TailwindCSS']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'REST APIs']
  },
  {
    category: 'DevOps',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'Linux']
  },
  {
    category: 'Others',
    skills: ['WebGL/Three.js', 'Jest', 'React Testing Library', 'Webpack', 'Agile/Scrum', 'UI/UX Design']
  }
];

const Skills = () => {
  const { isTerminalMode } = useTerminalMode();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  
  useEffect(() => {
    if (inView) {
      // Gradually show skills for terminal mode
      if (isTerminalMode) {
        const allSkills = skillsData.flatMap(category => category.skills);
        const timer = setInterval(() => {
          setVisibleSkills(prev => {
            const nextSkill = allSkills.find(skill => !prev.includes(skill));
            if (nextSkill) {
              return [...prev, nextSkill];
            }
            clearInterval(timer);
            return prev;
          });
        }, 100);
        
        return () => clearInterval(timer);
      } else {
        // Show all skills immediately in normal mode
        const allSkills = skillsData.flatMap(category => category.skills);
        setVisibleSkills(allSkills);
      }
    }
  }, [inView, isTerminalMode]);

  return (
    <section 
      id="skills" 
      ref={ref} 
      className={`section-padding ${isTerminalMode ? 'bg-black' : 'bg-dark-100'}`}
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center ${isTerminalMode ? 'text-neon-green' : 'text-gradient'} ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            {isTerminalMode ? '> skills.map()' : 'Skills & Technologies'}
          </h2>
          
          {isTerminalMode ? (
            <div className={`font-mono text-neon-green border border-neon-green p-6 ${inView ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
              <pre className="whitespace-pre-wrap overflow-x-auto">
                {`const skills = {`}
                {skillsData.map((category, idx) => (
                  <div key={category.category}>
                    {`  ${category.category}: [`}
                    {category.skills.map((skill, skillIdx) => (
                      <span key={skill} className={`ml-4 ${visibleSkills.includes(skill) ? '' : 'opacity-0'}`}>
                        {`"${skill}"${skillIdx < category.skills.length - 1 ? ',' : ''}`}
                        <br />
                      </span>
                    ))}
                    {`  ]${idx < skillsData.length - 1 ? ',' : ''}`}
                  </div>
                ))}
                {`};`}
              </pre>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {skillsData.map((category, idx) => (
                <div 
                  key={category.category} 
                  className={`bg-dark-200 rounded-lg p-6 ${inView ? `animate-fade-in delay-${idx * 100 + 300}` : 'opacity-0'}`}
                >
                  <h3 className="text-xl font-bold mb-4 text-neon-purple">
                    {category.category}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <Badge 
                        key={skill}
                        variant="outline"
                        className={`bg-dark-300 hover:bg-neon-blue/20 text-gray-300 hover:text-white border-neon-blue/30 hover-card ${inView ? 'animate-fade-in' : 'opacity-0'}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
