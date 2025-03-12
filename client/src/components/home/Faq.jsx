import React, { useState } from "react";
import { Collapse, Input, Button, Tooltip, message, Pagination } from "antd";
import { motion } from "framer-motion";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import "./FAQSection.css";
import photo5 from "../../assets/images/photo_5.jpg"
const { Panel } = Collapse;

const faqsData = [
  { id: 1, question: "What is DreamPath?", answer: "DreamPath is your AI-powered career counselor, offering guidance on career choices, skill-building, and professional growth." },
  { id: 2, question: "How does DreamPath provide career advice?", answer: "It uses AI-driven insights, industry trends, and skill assessments to offer personalized career recommendations." },
  { id: 3, question: "What AI technology does DreamPath use?", answer: "DreamPath leverages a **RAG model** alongside Google's **Gemini LLM** to generate accurate and insightful career advice." },
  { id: 4, question: "What input methods are supported?", answer: "You can interact with DreamPath through **both voice and text** for a seamless experience." },
  { id: 5, question: "Does DreamPath support voice responses?", answer: "Yes, DreamPath provides both **text-based and voice-driven** career guidance." },
  { id: 6, question: "Can DreamPath analyze my resume?", answer: "Yes! DreamPath offers **resume analysis** and optimization tips to improve your job prospects." },
  { id: 7, question: "Is my career data stored?", answer: "Yes, your career history and preferences are securely stored to offer personalized advice. You can delete your data anytime." },
  { id: 8, question: "How secure is my personal information?", answer: "We prioritize your privacy with **end-to-end encryption** and strict data protection policies." },
  { id: 9, question: "Can DreamPath replace human career counseling?", answer: "DreamPath provides AI-driven insights but **is not a substitute for professional career coaches**. It can connect you to experts if needed." },
  { id: 10, question: "Do I need an account to use DreamPath?", answer: "Yes, signing in ensures **personalized career recommendations** and data security." },
  { id: 11, question: "Does DreamPath support multiple languages?", answer: "Currently, DreamPath operates in **English**, with plans to introduce multilingual support soon." },
  { id: 12, question: "Can I track my career progress?", answer: "Yes! DreamPath keeps a record of your career assessments, skill recommendations, and consultations, which you can review anytime." },
  { id: 13, question: "How does DreamPath generate responses?", answer: "It combines **retrieval-based AI (RAG) and generative AI (LLM - Gemini)** to provide insightful career guidance." },
  { id: 14, question: "Will DreamPath improve over time?", answer: "Yes! DreamPath continuously learns from industry trends and user interactions to enhance its career guidance capabilities." },
  { id: 15, question: "Can DreamPath integrate with job platforms?", answer: "Integrations with job portals and professional networks are in progress, but currently, DreamPath operates as a standalone career assistant." },
  { id: 16, question: "Can DreamPath identify career stress or burnout?", answer: "It can recognize patterns of **career dissatisfaction and burnout** but **is not a diagnostic tool**. If needed, it can suggest career coaching or mental wellness resources." },
]; 


const Faq = () => {
  const [faqs, setFaqs] = useState(faqsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of FAQs per page

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filtered FAQs based on search input
  const filteredFaqs = faqs?.filter((faq) =>
    faq?.question?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Paginate FAQs
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + pageSize);

  // Handle pagination change
  const handlePageChange = (page) => setCurrentPage(page);

  // Handle feedback (Like/Dislike)
  const handleFeedback = (id, type) => {
    setFeedback((prev) => ({
      ...prev,
      [id]: type,
    }));
    message.success(`You ${type === "like" ? "liked" : "disliked"} this FAQ!`);
  };
 
    return (
        <section>
           <div className="text-center">
  <p className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
    <span className="text-[#f64a8a]">GOT QUESTIONS? WE'VE </span> 
    <span className="text-[#5CE0E6]">GOT ANSWERS  </span>
  </p>
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold pt-8 pb-6" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
    <span className="text-[#5CE0E6] mx-auto">FREQUENTLY ASKED QUESTIONS </span>
  </h1>
</div>
          <motion.div
            className="faq-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Add the image here */}
            <img
  src={photo5}
  alt="FAQ Illustration"
  className="faq-overlap-image hidden md:hidden lg:block"
/>

<h2 className="faq-title">
              <QuestionCircleOutlined /> Search Your Queries
            </h2>
            
    
            {/* Search Bar */}
            <Input
              className="faq-search"
              placeholder="Search FAQs..."
              prefix={<SearchOutlined />}
              onChange={handleSearch}
            />
    
            {/* FAQ Accordion */}
            <Collapse accordion className="faq-collapse">
              {paginatedFaqs.length > 0 ? (
                paginatedFaqs.map((faq) => (
                  <Panel header={faq.question} key={faq.id} className="faq-panel">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {faq.answer}
                    </motion.p>
    
                    {/* Feedback Buttons */}
                    <div className="faq-feedback">
                      <Tooltip title="Helpful">
                        <Button
                          type={feedback[faq.id] === "like" ? "primary" : "default"}
                          shape="circle"
                          icon={<LikeOutlined />}
                          onClick={() => handleFeedback(faq.id, "like")}
                        />
                      </Tooltip>
                      <Tooltip title="Not Helpful">
                        <Button
                          type={feedback[faq.id] === "dislike" ? "primary" : "default"}
                          shape="circle"
                          icon={<DislikeOutlined />}
                          onClick={() => handleFeedback(faq.id, "dislike")}
                        />
                      </Tooltip>
                    </div>
                  </Panel>
                ))
              ) : (
                <p className="no-results">No FAQs found for "{searchTerm}"</p>
              )}
            </Collapse>
    
            {/* Pagination */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredFaqs.length}
              onChange={handlePageChange}
              className="faq-pagination"
            />
          </motion.div>
        </section>
      );
    };
    
    export default Faq;