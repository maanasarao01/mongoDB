const mongoose=require('mongoose')
const Student=require('./Student')

async function connectToDB(){
    try{
        await mongoose.connect("mongodb://localhost:27017/testdb")
        console.log('Successfully Connected to Database!')
    }
    catch(e){
        console.log(e.message)
    }
}
connectToDB()

//CRUD Operations
//const user=new User({name: "Ram", age:25})

//CREATE
async function Insert(){
    try{
    const student1= await Student.create({
        name: "Krishna", 
        rollNo: 21,
        class:5, 
        grade:"A+", 
        admissionDate: new Date(), 
        address:{
            street :"Happy" ,
            city:"Coimbatore"
        }
        })
    console.log(student1)

    const student2= await Student.create({
        name: "Ram", 
        rollNo: 22,
        class:5, 
        grade:"A", 
        admissionDate: new Date(), 
        address:{
            street :"Bypass" ,
            city:"Mulki"
        }
        })
    console.log(student2)

    const student3= await Student.create({
        name: "Anagha", 
        rollNo: 23,
        class:6, 
        grade:"A", 
        admissionDate: new Date(), 
        address:{
            street :"Big" ,
            city:"Mysore"
        }
        })
    console.log(student3)

    const student4= await Student.create({
        name: "Meghana", 
        rollNo: 24,
        class:7, 
        grade:"B+", 
        admissionDate: new Date(), 
        address:{
            street :"BSingh" ,
            city:"Mangalore"
        }
        })
    console.log(student4)

    const student5= await Student.create({
        name: "Vidhaathri", 
        rollNo: 25,
        class:7, 
        grade:"B", 
        admissionDate: new Date(), 
        address:{
            street :"Tilak" ,
            city:"Kerala"
        }
        })
    console.log(student5)

    }
    catch(e){
        console.log(e.message)
    }
}
Insert()

//DELETE
//const deleteStudent= await Student.deleteOne({name: "Krishna"})

//READ
async function readByName(Name){
    try{
      /*  const student1=await Student.where('name').equals(Name)
        console.log(student1)*/

        const student2= await Student.findOne({name: Name})
        console.log(student2)

    }
    catch(e){
        console.log(e.message)
    }
}
readByName('Anagha')

//UPDATE
async function updateOne(name, grade){
    try{
    const student= Student.updateOne({name: name}, {$set: {grade: grade}})
    console.log(student)
    }
    catch(e){
        console.log(e.message)
    }
}
updateOne("Meghana","A")

//DELETE
async function deleteOne(name){
    try{
    const student= Student.deleteOne({name: name})
    console.log(student)
    }
    catch(e){
        console.log(e.message)
    }
}
deleteOne("Vidhaathri")

