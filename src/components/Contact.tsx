
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTerminalMode } from '@/hooks/useTerminalMode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, AtSign, MessagesSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { isTerminalMode } = useTerminalMode();
  const { toast } = useToast();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    submitted: false,
    loading: false,
  });
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate form submission
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        message: '',
        submitted: true,
        loading: false,
      });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={ref} 
      className={`section-padding ${isTerminalMode ? 'bg-black' : 'bg-dark'}`}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center ${isTerminalMode ? 'text-neon-green' : 'text-gradient'} ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          {isTerminalMode ? '> contact.send()' : 'Get In Touch'}
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {isTerminalMode ? (
            <div className={`w-full md:w-1/2 font-mono ${inView ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
              <pre className="text-neon-green whitespace-pre-wrap border border-neon-green p-6 h-full">
{`// Contact Information
const contactInfo = {
  email: "yashsharma.js@gmail.com",
  location: "Mumbai, India",
  schedule: "Open for opportunities",
  response: "Will reply within 24 hours"
};

// Why Contact Me?
function reasonsToConnect() {
  return [
    "Job opportunities",
    "Project collaboration",
    "Tech consultation",
    "Networking"
  ];
}`}
              </pre>
            </div>
          ) : (
            <div className={`w-full md:w-1/2 ${inView ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
              <div className="bg-dark-200 rounded-lg p-6 border border-neon-blue/20">
                <div className="flex items-center mb-6">
                  <Mail className="text-neon-blue w-8 h-8 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Let's Talk</h3>
                    <p className="text-gray-400">I'm always interested in new opportunities and collaborations.</p>
                  </div>
                </div>
                
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <AtSign className="text-neon-purple w-5 h-5 mr-3" />
                    <span>yashsharma.js@gmail.com</span>
                  </li>
                  <li className="flex items-center">
                    <MessagesSquare className="text-neon-purple w-5 h-5 mr-3" />
                    <span>I'll respond within 24 hours</span>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="font-bold mb-3 text-white">Connect for:</h4>
                  <ul className="list-disc list-inside text-gray-400">
                    <li>Job opportunities</li>
                    <li>Project collaboration</li>
                    <li>Tech consultation</li>
                    <li>Networking</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className={`w-full md:w-1/2 ${inView ? 'animate-fade-in delay-500' : 'opacity-0'}`}>
            <form 
              onSubmit={handleSubmit}
              className={`${isTerminalMode 
                ? 'border border-neon-green p-6' 
                : 'bg-dark-200 rounded-lg p-6 border border-neon-blue/20'}`}
            >
              <div className="mb-4">
                <label 
                  htmlFor="name" 
                  className={`block mb-2 ${isTerminalMode ? 'text-neon-green' : 'text-gray-300'}`}
                >
                  {isTerminalMode ? '> Name:' : 'Name'}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInput}
                  required
                  className={`${isTerminalMode 
                    ? 'bg-black border-neon-green text-neon-green focus:border-neon-green focus:ring-neon-green/30' 
                    : 'bg-dark-300 border-gray-700'}`}
                />
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="email" 
                  className={`block mb-2 ${isTerminalMode ? 'text-neon-green' : 'text-gray-300'}`}
                >
                  {isTerminalMode ? '> Email:' : 'Email'}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInput}
                  required
                  className={`${isTerminalMode 
                    ? 'bg-black border-neon-green text-neon-green focus:border-neon-green focus:ring-neon-green/30' 
                    : 'bg-dark-300 border-gray-700'}`}
                />
              </div>
              
              <div className="mb-6">
                <label 
                  htmlFor="message" 
                  className={`block mb-2 ${isTerminalMode ? 'text-neon-green' : 'text-gray-300'}`}
                >
                  {isTerminalMode ? '> Message:' : 'Message'}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleInput}
                  required
                  className={`${isTerminalMode 
                    ? 'bg-black border-neon-green text-neon-green focus:border-neon-green focus:ring-neon-green/30' 
                    : 'bg-dark-300 border-gray-700'}`}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={formState.loading}
                className={`w-full ${isTerminalMode 
                  ? 'bg-black border border-neon-green text-neon-green hover:bg-neon-green/20' 
                  : 'bg-neon-blue hover:bg-neon-blue/80'}`}
              >
                {formState.loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" /> {isTerminalMode ? 'Submit()' : 'Send Message'}
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
