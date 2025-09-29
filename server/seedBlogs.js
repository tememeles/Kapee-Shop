import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

// Sample blog data - 15 blog posts to match all imported images
const sampleBlogs = [
  {
    title: "Getting Started with React Development",
    content: "React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React and how to get started with your first component. We'll cover JSX syntax, component lifecycle, and state management to help you build modern web applications.",
    author: "John Doe",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend"],
    isPublished: true
  },
  {
    title: "Understanding TypeScript for Better Code",
    content: "TypeScript adds static typing to JavaScript, making your code more robust and maintainable. Learn how TypeScript can improve your development workflow by catching errors at compile time, providing better IDE support, and making your code more self-documenting.",
    author: "Jane Smith",
    category: "Programming",
    tags: ["TypeScript", "JavaScript", "Development"],
    isPublished: true
  },
  {
    title: "Modern CSS Techniques and Best Practices",
    content: "Explore modern CSS features like Grid, Flexbox, and custom properties. These techniques will help you create responsive and beautiful web layouts. We'll also cover CSS-in-JS solutions and how to organize your styles for maintainable projects.",
    author: "Mike Johnson",
    category: "CSS",
    tags: ["CSS", "Grid", "Flexbox", "Responsive"],
    isPublished: true
  },
  {
    title: "Web Performance Optimization Strategies",
    content: "Learn essential techniques for optimizing web performance, including lazy loading, code splitting, and image optimization strategies. We'll explore tools and metrics to measure performance and implement solutions that make your website lightning fast.",
    author: "Sarah Wilson",
    category: "Performance",
    tags: ["Performance", "Optimization", "Web Vitals"],
    isPublished: true
  },
  {
    title: "Building RESTful APIs with Node.js",
    content: "A comprehensive guide to building robust RESTful APIs with Node.js and Express. Cover best practices, authentication, error handling, and testing strategies. Learn how to structure your API for scalability and maintainability.",
    author: "David Brown",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "REST"],
    isPublished: true
  },
  {
    title: "Database Design Principles",
    content: "Understanding database design is crucial for building efficient applications. This post covers normalization, indexing, and query optimization techniques that will help you design better database schemas and improve application performance.",
    author: "Lisa Garcia",
    category: "Database",
    tags: ["Database", "MongoDB", "Design", "Performance"],
    isPublished: true
  },
  {
    title: "Introduction to Machine Learning",
    content: "Machine learning is transforming how we solve complex problems. This beginner-friendly introduction covers supervised and unsupervised learning, common algorithms, and practical applications you can start implementing today.",
    author: "Alex Chen",
    category: "AI/ML",
    tags: ["Machine Learning", "AI", "Python", "Data Science"],
    isPublished: true
  },
  {
    title: "Mobile App Development with React Native",
    content: "Learn how to build cross-platform mobile applications using React Native. We'll cover navigation, state management, native modules, and deployment strategies for both iOS and Android platforms.",
    author: "Tom Rodriguez",
    category: "Mobile Development",
    tags: ["React Native", "Mobile", "iOS", "Android"],
    isPublished: true
  },
  {
    title: "Cloud Computing Fundamentals",
    content: "Dive into the world of cloud computing with AWS, Azure, and Google Cloud. Learn about different service models, deployment strategies, and how to architect scalable applications in the cloud. Perfect for developers looking to modernize their infrastructure.",
    author: "Emma Thompson",
    category: "Cloud Computing",
    tags: ["AWS", "Azure", "Cloud", "DevOps"],
    isPublished: true
  },
  {
    title: "Cybersecurity Best Practices for Developers",
    content: "Security should be a top priority in modern application development. This guide covers essential security practices, common vulnerabilities, and how to implement secure coding practices to protect your applications and users' data.",
    author: "Robert Kim",
    category: "Security",
    tags: ["Security", "OWASP", "Encryption", "Authentication"],
    isPublished: true
  },
  {
    title: "GraphQL vs REST: Choosing the Right API",
    content: "Compare GraphQL and REST APIs to understand when to use each approach. We'll explore the benefits and drawbacks of both technologies, implementation considerations, and real-world use cases to help you make informed decisions.",
    author: "Maria Santos",
    category: "API Development",
    tags: ["GraphQL", "REST", "API", "Backend"],
    isPublished: true
  },
  {
    title: "Docker Containerization Guide",
    content: "Master Docker containerization to streamline your development workflow. Learn how to create efficient Docker images, manage containers, and implement container orchestration for scalable deployments.",
    author: "James Wilson",
    category: "DevOps",
    tags: ["Docker", "Containers", "DevOps", "Deployment"],
    isPublished: true
  },
  {
    title: "Progressive Web Apps Development",
    content: "Build engaging Progressive Web Apps that provide native app experiences on the web. Learn about service workers, offline functionality, push notifications, and app manifest to create fast, reliable web applications.",
    author: "Sophie Anderson",
    category: "Web Development",
    tags: ["PWA", "Service Workers", "Offline", "Web Apps"],
    isPublished: true
  },
  {
    title: "Data Visualization with D3.js",
    content: "Create stunning interactive data visualizations using D3.js. This comprehensive tutorial covers data binding, SVG manipulation, animations, and best practices for creating compelling charts and graphs for web applications.",
    author: "Daniel Lee",
    category: "Data Visualization",
    tags: ["D3.js", "Data Viz", "SVG", "Charts"],
    isPublished: true
  },
  {
    title: "Microservices Architecture Patterns",
    content: "Explore microservices architecture patterns and learn how to break down monolithic applications into manageable, scalable services. Cover service communication, data management, and deployment strategies for distributed systems.",
    author: "Rachel Green",
    category: "Architecture",
    tags: ["Microservices", "Architecture", "Distributed Systems", "Scalability"],
    isPublished: true
  }
];

async function seedBlogs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('🗑️ Cleared existing blogs');

    // Insert sample blogs
    const insertedBlogs = await Blog.insertMany(sampleBlogs);
    console.log(`📝 Inserted ${insertedBlogs.length} blogs`);

    console.log('✅ Blog seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blogs:', error);
    process.exit(1);
  }
}

seedBlogs();