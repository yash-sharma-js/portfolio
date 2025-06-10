
import { useInView } from 'react-intersection-observer';
import { useTerminalMode } from '@/hooks/useTerminalMode';
import { Github, ExternalLink, CodeIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const projectsData = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with product management, user authentication, shopping cart, and payment processing.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Real-time Chat App',
    description: 'A chat application with real-time messaging, user presence indicators, and multimedia sharing capabilities.',
    technologies: ['Socket.io', 'React', 'Redux', 'Express', 'PostgreSQL'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: '3D Portfolio Visualizer',
    description: 'Interactive 3D visualization tool for showcasing projects in an immersive environment.',
    technologies: ['Three.js', 'React', 'WebGL', 'GSAP'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'AI Content Generator',
    description: 'Machine learning powered application that generates unique content for blogs, articles and social media.',
    technologies: ['Python', 'TensorFlow', 'React', 'Flask', 'OpenAI API'],
    githubUrl: '#',
    liveUrl: '#',
  },
];

const Projects = () => {
  const { isTerminalMode } = useTerminalMode();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="projects"
      ref={ref}
      className={`section-padding ${isTerminalMode ? 'bg-black' : 'bg-dark'}`}
    >
      <div className="container mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center ${isTerminalMode ? 'text-neon-green' : 'text-gradient'} ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          {isTerminalMode ? '> projects.showcase()' : 'Featured Projects'}
        </h2>

        {isTerminalMode ? (
          <div className="space-y-6">
            {projectsData.map((project, index) => (
              <div 
                key={project.title} 
                className={`font-mono text-neon-green border border-neon-green p-4 ${inView ? `animate-fade-in delay-${index * 100 + 300}` : 'opacity-0'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{`project_${index + 1}: "${project.title}"`}</h3>
                  <div className="space-x-3">
                    <a href={project.githubUrl} className="hover:text-neon-green inline-block">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={project.liveUrl} className="hover:text-neon-green inline-block">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <p className="mb-2 text-gray-400">{project.description}</p>
                <pre className="text-xs">
                  {`const tech = [${project.technologies.map(t => `"${t}"`).join(', ')}];`}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <Card
                key={project.title}
                className={`bg-dark-200 border-neon-blue/20 hover-card overflow-hidden ${inView ? `animate-fade-in delay-${index * 100 + 300}` : 'opacity-0'}`}
              >
                <div className="h-48 bg-gradient-to-br from-neon-blue/10 to-neon-purple/20 flex items-center justify-center">
                  <CodeIcon className="w-16 h-16 text-gray-600" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-100">{project.title}</CardTitle>
                  <CardDescription className="text-gray-400">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-dark-300 text-gray-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
                  <Button variant="outline" size="sm" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                    <a href={project.githubUrl} className="flex items-center">
                      <Github className="w-4 h-4 mr-2" /> Code
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                    <a href={project.liveUrl} className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
