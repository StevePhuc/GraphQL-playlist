const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

mongoose.connect(
    'mongodb+srv://stevephuc:mlab.comA1@cluster0-asn1a.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
);
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
    console.log('now listing app port 4000');
});
