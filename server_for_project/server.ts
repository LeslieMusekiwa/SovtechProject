//const express = require('express');
import express, { request, response, application} from 'express';
//import {res, req } from 'express'
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const path = require('path')

const app = express();

// Allow cross orgin
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.use(express.static('public'));

app.get('*',(request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4008;

app.listen(PORT, () => console.log('Server started on port ${PORT}'));
