const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://guerrafreddy:C3YojXYXAbbUKnTf@cluster0.lbttoju.mongodb.net/quantum-db?retryWrites=true&w=majority'
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

module.exports = db;