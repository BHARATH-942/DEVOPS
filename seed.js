require('dotenv').config();
const mongoose = require('mongoose');
const Hotel = require('./models/Hotel');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking';

const hotels = [
  {
    title: 'Luxury Villa with Ocean View',
    location: 'Malibu, California',
    description: 'Experience the ultimate luxury in this stunning oceanfront villa.',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    rating: 4.9
  },
  {
    title: 'Cozy Mountain Cabin',
    location: 'Aspen, Colorado',
    description: 'A perfect getaway in the snowy mountains with a warm fireplace.',
    price: 320,
    imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
    rating: 4.7
  },
  {
    title: 'Modern City Apartment',
    location: 'New York City, NY',
    description: 'Right in the heart of Manhattan, steps away from Central Park.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1de2d92015?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    rating: 4.5
  },
  {
    title: 'Tropical Beachfront Paradise',
    location: 'Bali, Indonesia',
    description: 'Wake up to the sound of waves in this beautiful beachfront property.',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    rating: 4.8
  },
  {
    title: 'Historic European Chateau',
    location: 'Loire Valley, France',
    description: 'Live like royalty in this renovated 18th-century chateau.',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    rating: 5.0
  },
  {
    title: 'Desert Oasis Retreat',
    location: 'Scottsdale, Arizona',
    description: 'Relax in the sun with a private pool and stunning desert views.',
    price: 290,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=765&q=80',
    rating: 4.6
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding database...');
    await Hotel.deleteMany({}); // Clear existing hotels
    await Hotel.insertMany(hotels);
    console.log('Successfully seeded database with hotels!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
