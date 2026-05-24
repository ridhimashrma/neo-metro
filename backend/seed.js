const mongoose = require('mongoose');
require('dotenv').config();

const Bus = require('./models/Bus');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo Connected'));

  const buses = [
    {
      routeNumber: '335E',
      routeName: 'Koramangala - Majestic',
      driverName: 'Rajesh Kumar',
      status: 'on-time',
      fuelLevel: 78,
    },
    {
      routeNumber: '500A',
      routeName: 'Whitefield - Silk Board',
      driverName: 'Suresh Patel',
      status: 'delayed',
      fuelLevel: 45,
    },
    {
      routeNumber: '210N',
      routeName: 'Yelahanka - Kempegowda',
      driverName: 'Anil Sharma',
      status: 'ahead',
      fuelLevel: 92,
    },
    {
      routeNumber: '411D',
      routeName: 'Banashankari - Shivajinagar',
      driverName: 'Mohammed Irfan',
      status: 'delayed',
      fuelLevel: 60,
    },
    {
      routeNumber: '600F',
      routeName: 'Electronic City - KR Market',
      driverName: 'Venkat Rao',
      status: 'on-time',
      fuelLevel: 85,
    },
    {
      routeNumber: '114B',
      routeName: 'Indiranagar - KR Puram',
      driverName: 'Lakshmi Devi',
      status: 'on-time',
      fuelLevel: 67,
    },
  ];

async function seedData() {
  try {

    await Bus.deleteMany();

    await Bus.insertMany(buses);

    console.log('Buses Added Successfully');

    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedData();