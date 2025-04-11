import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, Brain, Calendar, Clock, Heart, HeartPulse, Laptop, MessageSquare, Phone, User, Check, Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "24/7", label: "Support Available" },
    { value: "50+", label: "Health Metrics Tracked" }
  ];

  const features = [
    {
      icon: <Activity className="h-5 w-5" />,
      title: "Real-time Monitoring",
      description: "Track your vitals with live updates."
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "AI Chat Assistance",
      description: "24/7 health queries answered by AI."
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Health Plans",
      description: "Custom wellness guides."
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI Predictions",
      description: "Smart symptom analysis."
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Doctor Connect",
      description: "Video consultations."
    },
    {
      icon: <Laptop className="h-5 w-5" />,
      title: "Cross-device Sync",
      description: "Access data anywhere."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh",
      role: "Cardiac Patient",
      testimonial: "Saved my father's life by detecting an irregular heartbeat early.",
      rating: 5
    },
    {
      name: "Sarah",
      role: "Fitness Enthusiast",
      testimonial: "The AI chatbot helped me understand my symptoms when I couldn't reach my doctor.",
      rating: 4
    },
    {
      name: "Miguel",
      role: "Diabetes Patient",
      testimonial: "My health has improved significantly thanks to the personalized plans.",
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <Badge variant="outline">
                Revolutionizing Healthcare
              </Badge>
              
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Precision Healthcare Simplified
              </h1>
              
              <p className="text-gray-400 max-w-lg">
                AI-powered diagnostics and real-time health monitoring in one seamless platform.
              </p>
              
              <div className="flex gap-4">
                <Button>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-900">
                  <Phone className="h-4 w-4 mr-2" />
                  Book a Demo
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-gray-900 rounded-xl aspect-square flex items-center justify-center border border-gray-800">
                [Dashboard Preview]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <Badge variant="outline">
                Real-time Monitoring
              </Badge>
              
              <h2 className="text-3xl font-bold md:text-4xl">
                Your Health Dashboard
              </h2>
              
              <p className="text-gray-400">
                Monitor your vital signs in real-time with our tracking system.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Continuous heart rate monitoring",
                  "Blood pressure trends analysis",
                  "Oxygen saturation tracking",
                  "ECG rhythm detection",
                  "Temperature fluctuations"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-600" />
                    <div className="h-3 w-3 rounded-full bg-gray-600" />
                    <div className="h-3 w-3 rounded-full bg-gray-600" />
                    <span className="ml-2 text-sm">Live Health Dashboard</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="border-r border-b border-gray-800 p-4 flex flex-col items-center">
                      <Heart className="h-6 w-6 mb-2" />
                      <p className="text-sm text-gray-400">Heart Rate</p>
                      <p className="text-2xl font-bold">72 <span className="text-sm font-normal text-gray-400">bpm</span></p>
                    </div>
                    <div className="border-b border-gray-800 p-4 flex flex-col items-center">
                      <Activity className="h-6 w-6 mb-2" />
                      <p className="text-sm text-gray-400">Blood Pressure</p>
                      <p className="text-2xl font-bold">120/80</p>
                    </div>
                    <div className="border-r border-gray-800 p-4 flex flex-col items-center">
                      <Clock className="h-6 w-6 mb-2" />
                      <p className="text-sm text-gray-400">SpO2</p>
                      <p className="text-2xl font-bold">98<span className="text-sm font-normal text-gray-400">%</span></p>
                    </div>
                    <div className="p-4 flex flex-col items-center">
                      <Activity className="h-6 w-6 mb-2" />
                      <p className="text-sm text-gray-400">ECG</p>
                      <div className="w-20 h-8 mt-1">
                        <svg viewBox="0 0 100 20" className="w-full h-full">
                          <path d="M0,10 L10,10 L15,2 L20,18 L25,0 L30,10 L40,10 L45,10 L50,2 L55,18 L60,0 L65,10 L75,10 L80,10 L85,2 L90,18 L95,0 L100,10" 
                                fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="bg-gray-900 text-white border-gray-800">
              Key Features
            </Badge>
            <h2 className="text-3xl font-bold mt-4 md:text-4xl">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              Everything you need to manage your health in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className=" transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg  mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" size="sm" className="px-0 text-white hover:text-gray-300">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 ">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="bg-gray-800 text-white border-gray-700">
              User Stories
            </Badge>
            <h2 className="text-3xl font-bold mt-4 md:text-4xl">
              What Our Users Say
            </h2>
            <p className="text-gray-400 mt-2">
              Join thousands who transformed their healthcare experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{testimonial.name}</CardTitle>
                      <CardDescription className="text-gray-500">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'fill-white text-white' : 'text-gray-700'}`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-gray-400 italic">
                    "{testimonial.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl  rounded-xl p-8 text-center border border-gray-800">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Transform Your Healthcare?
          </h2>
          <p className="mt-4 text-gray-400">
            Join thousands of users who have taken control of their health
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-black hover:bg-gray-200">
              Get Started for Free
            </Button>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              Speak to an Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <HeartPulse className="h-5 w-5" />
                BioSync360
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionizing healthcare through AI-powered solutions.
              </p>
            </div>
            
            {["Product", "Resources", "Company"].map((category, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold">{category}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {["Features", "Documentation", "About Us"].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-white hover:underline">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t  flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2023 BioSync360. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-white hover:underline">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-white hover:underline">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}