require('dotenv').config();
require('express-async-errors');
const path = require('path')
const express = require('express');
const app = express();

// security packages
const helmet = require('helmet')
const xss = require('xss-clean')

// connectDB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// Routers
const authRouter = require('./routes/authRouter')
const jobRouter = require('./routes/jobsRouter')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);

// a frontend-hez:
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json());
// extra packages
app.use(helmet())
app.use(xss())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`A szerver a ${port} porton figyel`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
