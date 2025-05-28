// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import moment from 'moment';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
try {
  const conn = await mongoose.connect("mongodb+srv://aryeshsrivastava:RcRGJWudQr43wyos@cluster.gxtaerk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster");
  console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
  console.error(`❌ MongoDB Connection Failed: ${error.message}`);
  process.exit(1);
}

// Attendance schema
const attendanceSchema = new mongoose.Schema({
  time: String,
  date: String,
  status: String
});

const userCollections = {}; // Cache for each UID

function getUserModel(uid) {
  if (!userCollections[uid]) {
    userCollections[uid] = mongoose.model(uid, attendanceSchema, uid);
  }
  return userCollections[uid];
}

app.get('/', async (req, res) => {
    res.send("Hello From API.")
})

// Attendance endpoint
app.post('/attendance', async (req, res) => {
  const uid = req.body.uid;
  const now = moment();
  const hour = now.hour() + 5;
  const minute = now.minute() + 30;

  const isLate = (hour > 9 || (hour === 9 && minute > 35));
  const status = isLate ? 'Late' : 'On Time';

  const Attendance = getUserModel(uid);

  const record = new Attendance({
    time: now.format('HH:mm:ss'),
    date: now.format('YYYY-MM-DD'),
    status
  });

  try {
    await record.save();
    res.status(200).json({ message: 'Attendance marked.', status });
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
