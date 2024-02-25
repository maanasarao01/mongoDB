const {expect} = require('chai');
const {connectToDB, Insert, readByName,
  updateOne, deleteOne, disconnectFromDB} = require('../index');

describe('Database Operations', () => {
  before(async () => {
    const result = await connectToDB();
    expect(result).to.equal('Successfully Connected to Database!');
  });

  // INSERT
  it('should successfully insert a document to the Collection', async () => {
    const result = await Insert('Krishna', 21, 8, 'A', new Date());
    expect(result).to.equal('Inserted successfully!');
    const result2 = await Insert('Meghana', 22, 7, 'B+', new Date());
    expect(result2).to.equal('Inserted successfully!');
    const result3 = await Insert('Karthik', 23, 6, 'A', new Date());
    expect(result3).to.equal('Inserted successfully!');
    const result4 = await Insert('Ram', 24, 7, 'O', new Date());
    expect(result4).to.equal('Inserted successfully!');
  });

  it('should notify when an entry is made without defining rollNo', async () => {
    const result=await Insert('Bhargav', undefined, 7, 'B', new Date());
    expect(result).to.equal('Student validation failed: rollNo: Path `rollNo` is required.');
  });

  // READ
  it('should successfully read a document from the Collection', async () => {
    const result = await readByName('Meghana');
    expect(result).to.equal('Read successfully');
  });

  it('should fail when no such document exists in the Collection', async () => {
    const result = await readByName('Sahyadri');
    expect(result).to.equal('No document found');
  });

  // UPDATE
  it('should successfully update a document in the Collection', async () => {
    const result = await updateOne('Ram', 'A+');
    expect(result).to.equal('Updated successfully!');
  });

  it('should fail upon no modifications', async () => {
    const result = await updateOne('Sita', 'O+');
    expect(result).to.equal('Unsuccessfull');
  });

  // DELETE
  it('should successfully delete a document in the Collection', async () => {
    const result = await deleteOne('Meghana');
    expect(result).to.equal('Deleted successfully!');
  });

  it('should\'nt delete a document if it is not in the Collection', async () => {
    const result = await deleteOne('Keerthana');
    expect(result).to.equal('No document found with given name');
  });

  // DISCONNECTION
  after(async () => {
    const result = await disconnectFromDB();
    expect(result).to.equal('Successfully disconnected');
  });
});
