import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './CareerAssessment.css';

const { Title, Paragraph } = Typography;

const categories = [
  {
    name: 'Software & Technology',
    description: 'Explore career paths in software development, IT, and digital technology',
    tests: [
      { name: 'Programming & Development Aptitude', questions: 20, image: 'programming.jpg', route: '/test/programming' },
      { name: 'IT Systems & Infrastructure Skills', questions: 15, image: 'it-systems.jpg', route: '/test/it-systems' },
      { name: 'Data Science & Analytics Fit', questions: 18, image: 'data-science.jpg', route: '/test/data-science' },
    ]
  },
  {
    name: 'Business & Management',
    description: 'Assess your fit for business administration, management, and entrepreneurship',
    tests: [
      { name: 'Business Strategy & Leadership', questions: 18, image: 'business-strategy.jpg', route: '/test/business-strategy' },
      { name: 'Marketing & Sales Aptitude', questions: 15, image: 'marketing.jpg', route: '/test/marketing' },
      { name: 'Financial Analysis & Management', questions: 20, image: 'finance.jpg', route: '/test/finance' },
    ]
  },
  {
    name: 'Creative & Design',
    description: 'Discover your potential in creative fields and design professions',
    tests: [
      { name: 'Visual Design & UI/UX Skills', questions: 22, image: 'visual-design.jpg', route: '/test/visual-design' },
      { name: 'Creative Writing & Content Creation', questions: 18, image: 'content-creation.jpg', route: '/test/content' },
      { name: 'Digital Media & Production Aptitude', questions: 20, image: 'digital-media.jpg', route: '/test/digital-media' },
    ]
  },
  {
    name: 'Healthcare & Medicine',
    description: 'Evaluate your alignment with healthcare and medical professions',
    tests: [
      { name: 'Clinical Practice Suitability', questions: 20, image: 'clinical.jpg', route: '/test/clinical' },
      { name: 'Healthcare Administration Aptitude', questions: 15, image: 'healthcare-admin.jpg', route: '/test/healthcare-admin' },
      { name: 'Medical Research & Development Fit', questions: 18, image: 'medical-research.jpg', route: '/test/medical-research' },
    ]
  },
  {
    name: 'Education & Training',
    description: 'Assess your potential in teaching, training, and educational roles',
    tests: [
      { name: 'Teaching & Instruction Style', questions: 15, image: 'teaching.jpg', route: '/test/teaching' },
      { name: 'Educational Leadership & Administration', questions: 18, image: 'educational-leadership.jpg', route: '/test/edu-leadership' },
      { name: 'Training & Development Aptitude', questions: 12, image: 'training.jpg', route: '/test/training' },
    ]
  }
];

const CareerAssessment = () => {
  const navigate = useNavigate();

  const handleStartTest = (route) => {
    navigate(route);
  };
  
  return (
    <div className="landing-page">
      <Title level={1} className="main-title">Professional Domain Assessment</Title>
      <Paragraph className="subtitle">
        Discover which professional domains align with your skills, interests, and aptitudes
      </Paragraph>

      {categories.map((category, index) => (
        <section key={index} className="category-section">
          <Divider orientation="left">
            <Title level={3} className="category-title">
              {category.name}
              <Paragraph className="category-description">{category.description}</Paragraph>
            </Title>
          </Divider>

          <Row gutter={[24, 24]}>
            {category.tests.map((test, testIndex) => (
              <Col key={testIndex} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className="test-card"
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <img src={`images/${test.image}`} alt={test.name} className="test-image" />
                      <div className="card-content">
                        <Title level={5} className="test-title">{test.name}</Title>
                        <Paragraph className="test-meta">
                          {test.questions} Questions • 10-15 mins
                        </Paragraph>
                      </div>
                    </div>
                    <div className="card-back">
                      <button 
                        className="start-test-btn"
                        onClick={() => handleStartTest(test.route)}
                      >
                        Start Assessment <RightOutlined />
                      </button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      ))}
    </div>
  );
};

export default CareerAssessment;