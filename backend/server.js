const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads (for careers)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Word documents are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Email templates
const createCareerEmailTemplate = (formData) => {
  return `
    <h2>New Job Application Received</h2>
    <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
    <p><strong>Position:</strong> ${formData.position}</p>
    <p><strong>Experience:</strong> ${formData.experience}</p>
    <p><strong>Willing to relocate:</strong> ${formData.relocate}</p>
    <h3>Cover Letter:</h3>
    <p>${formData.coverLetter.replace(/\n/g, '<br>')}</p>
    <p><em>Resume attached</em></p>
  `;
};

const createContactEmailTemplate = (formData) => {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
    <h3>Message:</h3>
    <p>${formData.message.replace(/\n/g, '<br>')}</p>
  `;
};

// Initialize email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// API status route
app.get('/api', (req, res) => {
  res.json({ 
    status: 'active',
    message: 'Blacksmith Mechatronics Backend API is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root route for backend-only deployment
app.get('/', (req, res) => {
  res.json({
    message: 'Blacksmith Mechatronics Backend API',
    status: 'active',
    version: '1.0.0',
    endpoints: {
      status: '/api',
      testEmail: '/api/test-email',
      careers: '/api/careers/submit',
      contact: '/api/contact/submit'
    }
  });
});

// Test email route
app.get('/api/test-email', async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    
    const info = await transporter.sendMail({
      from: `"Blacksmith Mechatronics" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'SMTP Test Successful',
      text: 'Your email configuration is working!',
      html: '<p>Your email configuration is working!</p>'
    });

    res.json({ 
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Careers form submission
app.post('/api/careers/submit', upload.single('resume'), async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'position', 'experience', 'relocate', 'coverLetter', 'consent'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }

    const transporter = createTransporter();
    await transporter.verify();

    const mailOptions = {
      from: `"Blacksmith Mechatronics Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      replyTo: req.body.email,
      subject: `New Job Application - ${req.body.position} - ${req.body.firstName} ${req.body.lastName}`,
      html: createCareerEmailTemplate(req.body),
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Clean up uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({
      success: true,
      message: 'Application submitted successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Contact form submission
app.post('/api/contact/submit', async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      });
    }

    const transporter = createTransporter();
    await transporter.verify();

    const mailOptions = {
      from: `"Blacksmith Mechatronics Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      replyTo: req.body.email,
      subject: `New Contact Form Submission from ${req.body.name}`,
      html: createContactEmailTemplate(req.body)
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Your message has been sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send your message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Please upload a file smaller than 5MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: 'File upload error: ' + error.message
    });
  }
  
  if (error.message === 'Only PDF and Word documents are allowed!') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Generic 404 handler for backend-only deployment
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: {
      status: '/api',
      testEmail: '/api/test-email',
      careers: '/api/careers/submit',
      contact: '/api/contact/submit'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Backend API available at: http://localhost:${PORT}`);
});