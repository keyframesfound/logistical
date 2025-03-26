import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    useTheme,
    Avatar,
    Rating,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const features = [
    {
        icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
        title: 'Real-time Tracking',
        description: 'Track your shipments in real-time with our advanced GPS integration.',
    },
    {
        icon: <SpeedIcon sx={{ fontSize: 40 }} />,
        title: 'Fast Delivery',
        description: 'Optimized routes and efficient delivery management for faster service.',
    },
    {
        icon: <SecurityIcon sx={{ fontSize: 40 }} />,
        title: 'Secure',
        description: 'Enterprise-grade security to protect your shipment data.',
    },
    {
        icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
        title: 'Analytics',
        description: 'Comprehensive analytics and reporting for better decision making.',
    },
];

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Operations Manager',
        company: 'Global Logistics Co.',
        rating: 5,
        text: 'Logistical has transformed how we manage our supply chain. The real-time tracking and analytics have saved us countless hours.',
        avatar: '/avatars/sarah.jpg',
    },
    {
        name: 'Michael Chen',
        role: 'Supply Chain Director',
        company: 'Tech Solutions Inc.',
        rating: 5,
        text: 'The platform's intuitive interface and powerful features make it a game-changer for logistics management.',
        avatar: '/avatars/michael.jpg',
    },
    {
        name: 'Emma Rodriguez',
        role: 'Fleet Manager',
        company: 'Express Delivery Services',
        rating: 5,
        text: 'We've seen a 30% improvement in delivery efficiency since implementing Logistical.',
        avatar: '/avatars/emma.jpg',
    },
];

const pricingPlans = [
    {
        title: 'Starter',
        price: '$49',
        period: 'per month',
        features: [
            'Up to 100 shipments/month',
            'Basic tracking',
            'Email support',
            'Standard analytics',
        ],
        cta: 'Start Free Trial',
        popular: false,
    },
    {
        title: 'Professional',
        price: '$99',
        period: 'per month',
        features: [
            'Up to 500 shipments/month',
            'Advanced tracking',
            'Priority support',
            'Advanced analytics',
            'API access',
            'Custom reporting',
        ],
        cta: 'Get Started',
        popular: true,
    },
    {
        title: 'Enterprise',
        price: 'Custom',
        period: 'contact us',
        features: [
            'Unlimited shipments',
            'Real-time tracking',
            '24/7 dedicated support',
            'Custom analytics',
            'Full API access',
            'White-label options',
            'Custom integrations',
        ],
        cta: 'Contact Sales',
        popular: false,
    },
];

const LandingPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                    color: 'white',
                    py: 8,
                    mb: 6,
                }}
            >
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h1" gutterBottom>
                                Modern Logistics Management
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4 }}>
                                Streamline your shipping operations with our comprehensive logistics platform
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => navigate('/dashboard')}
                                sx={{ mr: 2 }}
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                size="large"
                                onClick={() => navigate('/about')}
                            >
                                Learn More
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* Add hero image here */}
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container sx={{ mb: 8 }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Why Choose Us
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Comprehensive logistics solutions for modern businesses
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                    },
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Testimonials Section */}
            <Box sx={{ py: 8, background: theme.palette.background.paper }}>
                <Container>
                    <Typography variant="h2" align="center" gutterBottom>
                        What Our Clients Say
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                        Trusted by leading companies worldwide
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar
                                                src={testimonial.avatar}
                                                sx={{ width: 56, height: 56, mr: 2 }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {testimonial.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {testimonial.role} at {testimonial.company}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                            "{testimonial.text}"
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Pricing Section */}
            <Container sx={{ py: 8 }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Simple, Transparent Pricing
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Choose the plan that's right for your business
                </Typography>
                <Grid container spacing={4} alignItems="stretch">
                    {pricingPlans.map((plan, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    position: 'relative',
                                    transform: plan.popular ? 'scale(1.05)' : 'none',
                                    border: plan.popular ? `2px solid ${theme.palette.primary.main}` : 'none',
                                }}
                            >
                                {plan.popular && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -12,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 1,
                                        }}
                                    >
                                        Most Popular
                                    </Box>
                                )}
                                <CardContent sx={{ textAlign: 'center', pt: plan.popular ? 4 : 2 }}>
                                    <Typography variant="h4" gutterBottom>
                                        {plan.title}
                                    </Typography>
                                    <Typography variant="h3" gutterBottom>
                                        {plan.price}
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        {plan.period}
                                    </Typography>
                                    <Divider sx={{ my: 3 }} />
                                    <Box sx={{ mb: 3 }}>
                                        {plan.features.map((feature, idx) => (
                                            <Box
                                                key={idx}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 1,
                                                }}
                                            >
                                                <CheckCircleIcon
                                                    sx={{ color: 'primary.main', mr: 1 }}
                                                />
                                                <Typography>{feature}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Button
                                        variant={plan.popular ? 'contained' : 'outlined'}
                                        color={plan.popular ? 'primary' : 'inherit'}
                                        size="large"
                                        fullWidth
                                        onClick={() => navigate('/register')}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* CTA Section */}
            <Box
                sx={{
                    background: theme.palette.background.paper,
                    py: 8,
                    mb: 6,
                }}
            >
                <Container>
                    <Typography variant="h2" align="center" gutterBottom>
                        Ready to Get Started?
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Join thousands of businesses already using our platform
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigate('/register')}
                        >
                            Sign Up Now
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage; 