import React, { useState, useEffect } from 'react';
import Testimonials from '../components/home/Testimonials';
import Faq from '../components/home/Faq';
// import Pricings from '../components/home/Pricings';
import Features from '../components/home/Features';
import Footer from '../components/home/Footer';
const Home = () => {
  const [animatedText, setAnimatedText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fullText = "Your career journey starts here.";
  
  // Text animation effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const careerImages = [
    "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg"
  ];
  
  const careerPaths = ['Technology', 'Healthcare', 'Business'];
  
  return (
    <div >
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16 bg-blue-100">
          <div className="flex items-center space-x-2 bg-blue-100">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl font-bold">DP</span>
            </div>
            <span className="text-xl font-bold">DreamPath</span>
          </div>
          
          <button className="bg-blue-300 px-6 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors">
            Get Started
          </button>
        </nav>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Take Control of Your Career Path
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-6 h-10">
              {animatedText}<span className="animate-pulse">|</span>
            </h2>
            <p className="text-lg mb-8 text-blue-300">
              Professional guidance to help you navigate career transitions, advance in your field, and achieve your professional goals.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-200 text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-100 transition-colors">
                Book Consultation
              </button>
              <button className="bg-blue-200 border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
              {careerImages.map((img, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img 
                    src={img} 
                    alt={`Career in ${careerPaths[index]}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-xl font-bold text-white">Explore Careers in {careerPaths[currentImageIndex]}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white text-blue-600 p-4 rounded-lg shadow-lg">
              <p className="font-bold text-lg">98%</p>
              <p className="text-sm">Success Rate</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex justify-center space-x-6 md:space-x-16">
          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <div className="text-4xl mb-2 animate-bounce">📝</div>
            <p>Assessment</p>
          </div>
          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <div className="text-4xl mb-2 animate-bounce">🎯</div>
            <p>Strategy</p>
          </div>
          <div className="text-center hover:scale-110 transition-transform cursor-pointer">
            <div className="text-4xl mb-2 animate-bounce">🚀</div>
            <p>Results</p>
          </div>
        </div>
      </div>
      <div className='mb-26 mx-26'>
        <Features/>
      </div>
      <div className='mb-26'>
        <Faq/>
      </div>
      <div className='mb-26'>
        <Testimonials/>
      </div>
     <Footer/>

    </div>
  );
};

export default Home;