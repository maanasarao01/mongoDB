const mongoose=require('mongoose')
const Student=require('./Student')
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

async function startMemoryServer() {
    mongoServer = new MongoMemoryServer();
    await mongoServer.start()
    const mongoUri = await mongoServer.getUri();
    console.log(mongoUri)
    return mongoUri;
}

async function connectToDB() {
    try {
        const uri = await startMemoryServer();
        await mongoose.connect(uri);
        return 'Successfully Connected to Database!';
    } catch (e) {
        console.log(e.message);
        throw e;
    }
}

//CRUD Operations

//CREATE
async function Insert(Name,rollNo,Class,grade,admissionDate){
    try{
    await Student.create({
        name: Name, 
        rollNo: rollNo,
        class:Class, 
        grade:grade, 
        admissionDate: admissionDate
        })
    return 'Inserted successfully!'
    }
    catch(e){
        console.log(e.message)
        throw e
    }
}

//READ
async function readByName(Name){
    try{
      /*  const student1=await Student.where('name').equals(Name)
        console.log(student1)*/
        const student2= await Student.findOne({name: Name})
        if(student2)
            return 'Read successfully'
        else
            return 'No document found'  
    }
    catch(e){
        console.log(e.message)
        throw e
    }
}


//UPDATE
async function updateOne(Name, grade){
    try{
    const student1= await Student.updateOne({name: Name}, {$set: {grade: grade}})
    if(student1)
       return 'Updated successfully!'
    else
       return 'No document found with given name'
    }
    catch(e){
        console.log(e.message)
        throw e
    }
}


//DELETE
async function deleteOne(name){
    try{
    const student= await Student.deleteOne({name: name})
    if(student.deletedCount>0)
       return 'Deleted successfully!'
    else
       return 'No document found with given name'
    }
    catch(e){
        console.log(e.message)
        throw e
    }
}

//Disconnect
async function disconnectFromDB(){
    try{
    await mongoose.disconnect();
    await mongoServer.stop();
    return 'Successfully disconnected'
    }
    catch(e){
        throw e
    }
}

module.exports= {connectToDB,Insert,readByName,updateOne,deleteOne,disconnectFromDB}
