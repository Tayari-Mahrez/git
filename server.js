require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/model');

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToDB();

async function createAndSavePerson() {
    const person = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Sushi']
    });
  
    try {
      const savedPerson = await person.save();
      console.log('Person saved:', savedPerson);
    } catch (err) {
      console.error('Error saving person:', err);
    }
  }
  
  createAndSavePerson();


  async function createManyPeople(arrayOfPeople) {
    try {
      const people = await Person.create(arrayOfPeople);
      console.log('Multiple records created:', people);
    } catch (err) {
      console.error('Error creating records:', err);
    }
  }
  
  const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['Salad', 'Pasta'] },
    { name: 'Bob', age: 35, favoriteFoods: ['Burger', 'Steak'] },
    { name: 'Mary', age: 29, favoriteFoods: ['Tacos', 'Burritos'] }
  ];
  
  createManyPeople(arrayOfPeople);


  async function findPeopleByName(name) {
    try {
      const people = await Person.find({ name });
      console.log('People named Alice:', people);
    } catch (err) {
      console.error('Error finding people:', err);
    }
  }
  
  findPeopleByName('Alice');



  async function findPersonByFood(food) {
    try {
      const person = await Person.findOne({ favoriteFoods: food });
      console.log('Person who likes Pizza:', person);
    } catch (err) {
      console.error('Error finding person by food:', err);
    }
  }
  
  findPersonByFood('Pizza');

  
  async function findPersonById(personId) {
    try {
      const person = await Person.findById(personId);
      console.log('Person found by ID:', person);
    } catch (err) {
      console.error('Error finding person by ID:', err);
    }
  }
  
  findPersonById('66daa053941946cf06e93f6a');

  async function addFavoriteFood(personId, food) {
    try {
      const person = await Person.findById(personId);
      person.favoriteFoods.push(food);
      const updatedPerson = await person.save();
      console.log('Updated person:', updatedPerson);
    } catch (err) {
      console.error('Error updating person:', err);
    }
  }
  
  addFavoriteFood('66daa053941946cf06e93f6a', 'hamburger');

  