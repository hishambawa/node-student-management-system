const {MongoClient, ObjectId} = require('mongodb');

class MongoRepository {
    constructor() {
        // get the db client
        const url = process.env.DB_URL || '';
        const client = new MongoClient(url);
        
        // connect to the database
        client.connect().then(() => {
            console.log('Successfully connected to the database');
        }).catch((err) => {
            console.error('An error occurred while connecting to the database', err);
            throw err;
        });

        // ping the database
        client.db().admin().ping().then(() => {
            console.log('Successfully pinged the database');
        }).catch((err) => {
            console.error('An error occurred while pinging the database', err);
            throw err;
        });

        const dbName = process.env.DB || 'adv-server-side';
        const collectionName = process.env.COLLECTION || 'students';
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        this.collection = collection;
    }

    async insert(entity) {
        const result = await this.collection.insertOne(entity);
        return result.acknowledged;
    }

    async getAll() {
        const entities = await this.collection.find().toArray();
        return entities;
    }

    async getById(id) {
        const entity = await this.collection.findOne(
            { _id: ObjectId.createFromHexString(id) }
        );

        return entity;
    }

    async update(id, entity) {
        const result = await this.collection.updateOne(
            { _id: ObjectId.createFromHexString(id) }, 
            { $set: entity }
        );

        return result.modifiedCount === 1;
    }

    async delete(id) {        
        const result = await this.collection.deleteOne(
            { _id: ObjectId.createFromHexString(id) }
        );

        return result.deletedCount === 1;
    }
}

module.exports = MongoRepository;