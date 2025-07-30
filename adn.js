const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); // Adjust path if different

// Replace this with your MONGO_URI
const MONGO_URI = 'mongodb+srv://zunairmurtaza001:!Saqtyfla!@clothing.5ryopf8.mongodb.net/?retryWrites=true&w=majority&appName=CLothing';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  seedAdmin();
}).catch(err => {
  console.error('❌ Connection error:', err);
});

async function seedAdmin() {
  const email = 'admin@gmail.com';

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      console.log('⚠️ Admin user already exists');
    } else {
      const hashedPassword = await bcrypt.hash('admin', 10);
      const admin = new User({
        name: 'Admin',
        email,
        password: hashedPassword,
        isAdmin: true,
      });

      await admin.save();
      console.log('✅ Admin user created');
    }
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  } finally {
    mongoose.disconnect();
  }
}
