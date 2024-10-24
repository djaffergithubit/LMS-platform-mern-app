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
const Course = require('./models/course');
const { Chapter } = require('./models/chapter');
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
  methods: ['GET', 'POST'],
  credentials: true,
}));

// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   next();
// });

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

  socket.on('stripe success', async (data) => {
    
    const { message, courseId } = data
    console.log('stripe success', message, courseId);
    
  })

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
app.use('/courses', upload.single('courseImage'), require('./Routes/courseRoute'));
app.use('/chapters', upload.single('chapterVideo'), require('./Routes/chapterRoute'));

const endpointSecret = "whsec_8eed9c5a0dd2e1f8969b00ce9c749a941d710e088ce7ded3349d2e0e1287d323";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const session = event.data.object; 
      const courseId = session.metadata.courseId;
      const userId = session.metadata.userId;

      const updateChapter = async (courseId) => {
        const courseChapters = await Chapter.find({courseId})

        if (!courseChapters) {
          console.log('no chapters found');
        }else{      
          courseChapters.forEach( async (chapter) => {
            await Chapter.findByIdAndUpdate(chapter._id, {
              freePreview: true
            })
          })
        }
      }

      updateChapter(courseId)
      
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send(); // Acknowledge receipt of the event
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  Connect();
});
