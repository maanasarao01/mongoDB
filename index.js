const mongoose = require('mongoose');
const Student = require('./Student');
const {MongoMemoryServer} = require('mongodb-memory-server');

let mongoServer;

async function startMemoryServer() {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  const mongoUri = await mongoServer.getUri();
  console.log(mongoUri);
  return mongoUri;
}

async function connectToDB() {
  const uri = await startMemoryServer();
  await mongoose.connect(uri);
  return 'Successfully Connected to Database!';
}

// CRUD Operations

// CREATE
async function Insert(Name, rollNo, Class, grade, admissionDate) {
  try {
    await Student.create({
      name: Name,
      rollNo: rollNo,
      class: Class,
      grade: grade,
      admissionDate: admissionDate,
    });
    return 'Inserted successfully!';
  } catch (e) {
    return e.message;
  }
}


// READ
async function readByName(Name) {
  const read = await Student.findOne({name: Name});
  return read?'Read successfully':'No document found';
}

// UPDATE
async function updateOne(Name, grade) {
  const result = await Student.updateOne({name: Name}, {$set: {grade: grade}});
  return result.acknowledged && result.modifiedCount>0?'Updated successfully!':'Unsuccessfull';
}

// DELETE
async function deleteOne(name) {
  const result = await Student.deleteOne({name: name});
  return result.deletedCount>0?'Deleted successfully!': 'No document found with given name';
}


// Disconnect
async function disconnectFromDB() {
  // drops the database
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
  return 'Successfully disconnected';
}

module.exports = {connectToDB, Insert, readByName, updateOne, deleteOne, disconnectFromDB};
