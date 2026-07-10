require('dotenv').config();

const sequelize = require('../config/database');
const Media = require('../models/Media');
const User = require('../models/User');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    const media = await Media.findAll({ limit: 20, order: [['createdAt', 'DESC']] });

    if (!media.length) {
      console.log('No media rows to seed.');
      process.exit(0);
    }

    for (let i = 0; i < media.length; i++) {
      const m = media[i];
      // generate sample views/likes
      const views = Math.floor(Math.random() * 5000) + 10;
      const likes = Math.floor(Math.random() * 500) + 1;
      m.views = views;
      m.likes = likes;
      // optionally set a price if missing
      if (!m.price || m.price === 'KES 0') {
        m.price = `KES ${Math.max(100, Math.round((m.fileSize || 1000) / 1000) * 100)}`;
      }
      await m.save();
      console.log(`Updated media ${m.id}: views=${views} likes=${likes}`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
