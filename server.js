
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000','https://contact-form-backend-rouge.vercel.app'],
  credentials: true,
}));
app.use(express.json());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/api/contact', contactRoutes);
app.get('/',(req,res)=>{
res.json({message:"Welcome"})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
