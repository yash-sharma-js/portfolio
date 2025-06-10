
import { useInView } from 'react-intersection-observer';
import { useTerminalMode } from '@/hooks/useTerminalMode';
import { Briefcase, Calendar } from 'lucide-react';

const experienceData = [
  {
    company: 'Jio Platforms Limited (JPL).',
    position: 'SDE Inturn',
    duration: 'May 2024 - July 2024',
    description: 'Built REST APIs in Go with PostgreSQL using microservices for a scalable Resource Management System.\n Structured master data for consistency and performed thorough API testing for reliability. \nCreated detailed API documentation on Spotlight to support implementation and future development.',
  }
];

const Experience = () => {
  const { isTerminalMode } = useTerminalMode();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="experience" 
      ref={ref} 
      className={`section-padding ${isTerminalMode ? 'bg-black' : 'bg-dark-100'}`}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center ${isTerminalMode ? 'text-neon-green' : 'text-gradient'} ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          {isTerminalMode ? '> career.history()' : 'Experience'}
        </h2>
        
        {isTerminalMode ? (
          <div className="space-y-4">
            {experienceData.map((job, index) => (
              <div 
                key={job.company}
                className={`border border-neon-green p-4 font-mono ${inView ? `animate-fade-in delay-${index * 150 + 300}` : 'opacity-0'}`}
              >
                <pre className="text-neon-green whitespace-pre-wrap text-sm">
{`// ${job.company}
const position = "${job.position}";
const timeline = "${job.duration}";

function responsibilities() {
  return \`${job.description}\`;
}`}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative border-l-2 border-neon-blue/40 pl-8 ml-4 md:ml-8 space-y-12">
            {experienceData.map((job, index) => (
              <div 
                key={job.company}
                className={`relative ${inView ? `animate-fade-in delay-${index * 150 + 300}` : 'opacity-0'}`}
              >
                <div className="absolute -left-[41px] bg-dark-100 p-1 rounded-full border-4 border-dark-100">
                  <div className="w-6 h-6 bg-neon-blue rounded-full flex items-center justify-center">
                    <Briefcase className="w-3 h-3 text-dark-100" />
                  </div>
                </div>
                
                <div className="bg-dark-200 rounded-lg p-6 hover-card border border-neon-blue/10">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-white">{job.position}</h3>
                    <div className="flex items-center text-neon-blue text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {job.duration}
                    </div>
                  </div>
                  <h4 className="text-neon-purple mb-3">{job.company}</h4>
                  <p className="text-gray-400">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
