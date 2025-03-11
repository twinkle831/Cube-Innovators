import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const testimonials = [
  {
    name: 'John Doe',
    role: 'Software Engineer',
    comment: 'Selene helped me identify my strengths and guided me toward the right career path. Highly recommended!',
  },
  {
    name: 'Jane Smith',
    role: 'Data Scientist',
    comment: 'The AI-driven insights were spot-on. Selene made career planning so much easier for me.',
  },
  {
    name: 'Alice Johnson',
    role: 'Product Manager',
    comment: 'I was confused about my career, but Selene provided clarity and actionable advice.',
  },
];

const pricingPlans = [
  {
    title: 'Basic',
    price: '$0',
    features: ['Limited access to Selene', 'Basic career guidance', 'Email support'],
    recommended: false,
  },
  {
    title: 'Pro',
    price: '$29/month',
    features: ['Full access to Selene', 'Advanced career insights', 'Priority email support', 'Monthly career reports'],
    recommended: true,
  },
  {
    title: 'Enterprise',
    price: '$99/month',
    features: ['Full access to Selene', 'Dedicated career coach', '24/7 support', 'Custom career plans'],
    recommended: false,
  },
];

const faqs = [
  {
    question: 'What is Selene?',
    answer: 'Selene is an AI-powered career guidance tool that helps you identify your strengths, interests, and career opportunities.',
  },
  {
    question: 'How does Selene work?',
    answer: 'Selene uses advanced AI algorithms to analyze your skills, preferences, and market trends to provide personalized career recommendations.',
  },
  {
    question: 'Is Selene free?',
    answer: 'Selene offers a free basic plan with limited features. For advanced features, you can subscribe to our Pro or Enterprise plans.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. No hidden fees!',
  },
];

function LandingPage() {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', minHeight: '100vh', padding: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', padding: 6, background: 'linear-gradient(135deg, #6a11cb, #2575fc)', color: 'white', borderRadius: 2, mb: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to Selene
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Your AI-Powered Career Guidance Assistant
        </Typography>
        <Button variant="contained" size="large" sx={{ background: '#ff4081', '&:hover': { background: '#e91e63' } }}>
          Get Started
        </Button>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#3f51b5' }}>
          What Our Users Say
        </Typography>
        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ height: '100%', background: '#f0f4ff', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#757575' }}>
                    {testimonial.role}
                  </Typography>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{testimonial.comment}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#3f51b5' }}>
          Pricing Plans
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  background: plan.recommended ? '#ff4081' : '#f0f4ff',
                  color: plan.recommended ? 'white' : 'inherit',
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {plan.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                  {plan.price}
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {plan.features.map((feature, i) => (
                    <Typography key={i} variant="body1" sx={{ mb: 1 }}>
                      {feature}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    background: plan.recommended ? 'white' : '#ff4081',
                    color: plan.recommended ? '#ff4081' : 'white',
                    '&:hover': { background: plan.recommended ? '#f0f4ff' : '#e91e63' },
                  }}
                >
                  Choose Plan
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Selene Features Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#3f51b5' }}>
          Selene Features
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ background: '#f0f4ff', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Personalized Career Guidance
                </Typography>
                <Typography variant="body1">
                  Selene analyzes your skills and interests to provide tailored career recommendations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ background: '#f0f4ff', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  AI-Driven Insights
                </Typography>
                <Typography variant="body1">
                  Get actionable insights based on market trends and your unique profile.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ background: '#f0f4ff', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Continuous Support
                </Typography>
                <Typography variant="body1">
                  Selene provides ongoing support to help you achieve your career goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4, color: '#3f51b5' }}>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 1, background: '#f0f4ff', borderRadius: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}

export default LandingPage;