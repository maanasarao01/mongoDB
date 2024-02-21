const { expect } = require('chai');
const { connectToDB, Insert, readByName,updateOne,deleteOne } = require('../index');

describe('Database Operations', () => {
    it('should successfully connect to the database', async () => {
        const url = 'mongodb://localhost:27017/testdb'; 
        const result = await connectToDB(url);
        expect(result).to.equal('Successfully Connected to Database!');
    });

    it('should successfully insert a document to the Collection', async () => {
        const result = await Insert("Krishna",21,8,'A',new Date());
        expect(result).to.equal('Inserted successfully!');
        const result2 = await Insert("Meghana",22,7,'B+',new Date());
        expect(result2).to.equal('Inserted successfully!');
        const result3 = await Insert("Karthik",23,6,'A',new Date());
        expect(result3).to.equal('Inserted successfully!');
        const result4 = await Insert("Ram",24,7,'B',new Date());
        expect(result4).to.equal('Inserted successfully!');
    });

    it('should successfully read a document from the Collection', async () => {
        const result = await readByName("Meghana");
        expect(result).to.equal('Read successfully');
    });

    it('should successfully update a document in the Collection', async () => {
        const result = await updateOne("Ram","A+");
        expect(result).to.equal('Updated successfully!');
    });

    it('should successfully delete a document in the Collection', async () => {
        const result = await deleteOne("Meghana");
        expect(result).to.equal('Deleted successfully!');
    });


});