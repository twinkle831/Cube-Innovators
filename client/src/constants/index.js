import {
    benefitIcon1,
    benefitIcon2,
    benefitIcon3,
    benefitIcon4,
    benefitImage, 
    benefitImage2,
    chromecast,
    disc02,
    file02,
    homeSmile,
    instagram,
    plusSquare,
    recording01,
    recording03,
    searchMd,
    sliders04,
    yourlogo,
  } from "../assets";
  
  
  export const heroIcons = [homeSmile, file02, searchMd, plusSquare];
  
  
  export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];
  
  export const brainwaveServices = [
    "Photo generating",
    "Photo enhance",
    "Seamless Integration",
  ];
  
  export const brainwaveServicesIcons = [
    recording03,
    recording01,
    disc02,
    chromecast,
    sliders04,
  ];
  export const pricing = [
    {
      id: "0",
      title: "Basic",
      description: "AI chatbot, personalized recommendations",
      price: "0",
      features: [
        "An AI chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost",
      ],
    },
    {
      id: "1",
      title: "Premium",
      description: "Advanced AI chatbot, priority support, analytics dashboard",
      price: "9.99",
      features: [
        "An advanced AI chatbot that can understand complex queries",
        "An analytics dashboard to track your conversations",
        "Priority support to solve issues quickly",
      ],
    },
    {
      id: "2",
      title: "Enterprise",
      description: "Custom AI chatbot, advanced analytics, dedicated account",
      price: null,
      features: [
        "An AI chatbot that can understand your queries",
        "Personalized recommendations based on your preferences",
        "Ability to explore the app and its features without any cost",
      ],
    },
  ];
  export const benefits = [
    {
      id: "0",
      title: "AI-Powered Career Counseling",
      text: "Get personalized career guidance using advanced AI models like **Mistral-7B-Instruct + RAG**, ensuring accurate and insightful advice tailored to your goals.",
      backgroundUrl: "./src/assets/benefits/card-1.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "1",
      title: "Live AI Video Interaction",
      text: "Experience a **human-like counseling session** powered by **HeyGen AI Video**, making virtual career guidance feel more natural and engaging.",
      backgroundUrl: "./src/assets/benefits/card-2.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "2",
      title: "Data-Driven Personalization",
      text: "Your responses are **tailored using real-time user data**, ensuring career suggestions align with your background, skills, and aspirations.",
      backgroundUrl: "./src/assets/benefits/card-3.svg",
      iconUrl: benefitIcon3,
      imageUrl: benefitImage2,
    },
    {
      id: "3",
      title: "Secure & Confidential",
      text: "Your privacy is our priority. DreamPath **securely stores your career data** while ensuring confidentiality and protection of personal information.",
      backgroundUrl: "./src/assets/benefits/card-4.svg",
      iconUrl: benefitIcon4,
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "4",
      title: "Multi-Modal Interaction",
      text: "Engage with DreamPath via **speech, text, or video**, allowing for a flexible and seamless career counseling experience.",
      backgroundUrl: "./src/assets/benefits/card-5.svg",
      iconUrl: benefitIcon1,
      imageUrl: benefitImage2,
    },
    {
      id: "5",
      title: "Continuous Learning & Growth",
      text: "With **Mistral-7B-Instruct and RAG**, DreamPath continuously learns from user interactions and industry trends to offer **up-to-date career insights**.",
      backgroundUrl: "./src/assets/benefits/card-6.svg",
      iconUrl: benefitIcon2,
      imageUrl: benefitImage2,
    },
  ];
  