const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Connect = require('./dbConfig');
const fs = require('fs');
const multer = require('multer');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  next();
});

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// socket.io setup
io.on('connection', (socket) => { 
  console.log('a user connected');
  
  socket.on('courseField change', (message) => {
    io.emit('courseField change', message);
  });

  socket.on('new chapter added', (message) => {
    io.emit('new chapter added', message);
  });

  socket.on('chapterField change', (message) => {
    io.emit('chapterField change', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Store both images and videos in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to file name to prevent overwriting
  }
});

// File filter for images and videos
const fileFilter = (req, file, cb) => {
  // Accept images and videos only
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type! Only images and videos are allowed.'), false);
  }
};

// Multer instance with file size limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // 100MB size limit
  fileFilter: fileFilter
});

// Routes
app.use('/users', require('./Routes/userRoute'));

// For course images
app.use('/courses', upload.single('courseImage'), require('./Routes/courseRoute'));

// For chapter videos
app.use('/chapters', upload.single('chapterVideo'), require('./Routes/chapterRoute'));

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  Connect();
});
