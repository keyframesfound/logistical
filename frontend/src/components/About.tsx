import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    useTheme,
    Button,
    useMediaQuery,
    Fade,
    Paper,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineGroup from '@mui/lab/TimelineGroup';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import DataObjectIcon from '@mui/icons-material/DataObject';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const techStack = [
    {
        icon: <CodeIcon sx={{ fontSize: 40 }} />,
        title: 'Modern Tech Stack',
        description: 'Built with React, TypeScript, and Material-UI for a seamless user experience.',
    },
    {
        icon: <CloudIcon sx={{ fontSize: 40 }} />,
        title: 'Cloud-Native',
        description: 'Leveraging cloud infrastructure for scalability and reliability.',
    },
    {
        icon: <DataObjectIcon sx={{ fontSize: 40 }} />,
        title: 'API-First',
        description: 'RESTful APIs with real-time capabilities for instant updates.',
    },
    {
        icon: <StorageIcon sx={{ fontSize: 40 }} />,
        title: 'MongoDB Atlas',
        description: 'Enterprise-grade database for secure and efficient data management.',
    },
];

const milestones = [
    {
        year: '2023',
        title: 'AI-Powered Analytics',
        description: 'Introduced machine learning algorithms for predictive logistics optimization.',
    },
    {
        year: '2022',
        title: 'Global Expansion',
        description: 'Launched operations in 10+ countries with localized support.',
    },
    {
        year: '2021',
        title: 'Real-time Tracking',
        description: 'Implemented advanced GPS and IoT integration for precise tracking.',
    },
    {
        year: '2020',
        title: 'Platform Launch',
        description: 'Successfully launched the Logistical platform with core features.',
    },
];

const About: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    color: 'white',
                    py: 12,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Fade in timeout={1000}>
                                <Box>
                                    <Typography variant="h1" gutterBottom>
                                        Revolutionizing Logistics
                                    </Typography>
                                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                                        We're building the future of supply chain management with cutting-edge technology
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        onClick={() => navigate('/register')}
                                        startIcon={<RocketLaunchIcon />}
                                    >
                                        Join the Revolution
                                    </Button>
                                </Box>
                            </Fade>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '20px',
                                        backdropFilter: 'blur(10px)',
                                    },
                                }}
                            >
                                {/* Add a modern illustration or animation here */}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Tech Stack Section */}
            <Container sx={{ py: 8 }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Powered by Innovation
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                    Our technology stack ensures performance, security, and scalability
                </Typography>
                <Grid container spacing={4}>
                    {techStack.map((tech, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Fade in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        background: theme.palette.background.paper,
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Box sx={{ color: 'primary.main', mb: 2 }}>
                                            {tech.icon}
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            {tech.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {tech.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Timeline Section */}
            <Box sx={{ py: 8, background: theme.palette.background.paper }}>
                <Container>
                    <Typography variant="h2" align="center" gutterBottom>
                        Our Journey
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
                        Milestones that shaped our success
                    </Typography>
                    <Timeline position={isMobile ? 'right' : 'alternate'}>
                        <TimelineGroup>
                            {milestones.map((milestone, index) => (
                                <TimelineItem key={index}>
                                    <TimelineOppositeContent color="text.secondary">
                                        {milestone.year}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary" />
                                        {index < milestones.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                p: 3,
                                                background: theme.palette.background.default,
                                            }}
                                        >
                                            <Typography variant="h6" gutterBottom>
                                                {milestone.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                {milestone.description}
                                            </Typography>
                                        </Paper>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </TimelineGroup>
                    </Timeline>
                </Container>
            </Box>

            {/* Stats Section */}
            <Container sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" color="primary" gutterBottom>
                                1M+
                            </Typography>
                            <Typography variant="h6">Shipments Tracked</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" color="primary" gutterBottom>
                                99.9%
                            </Typography>
                            <Typography variant="h6">Uptime</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" color="primary" gutterBottom>
                                50+
                            </Typography>
                            <Typography variant="h6">Enterprise Clients</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                    py: 8,
                }}
            >
                <Container>
                    <Typography variant="h2" align="center" gutterBottom>
                        Ready to Transform Your Logistics?
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
                        Join the future of supply chain management
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => navigate('/register')}
                            startIcon={<RocketLaunchIcon />}
                        >
                            Get Started Today
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default About; 