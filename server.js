// var { graphql, buildSchema } = require('graphql')

// var schema = buildSchema(
//   ` 
//     type Query {
//       hello: String
//     } 
//   `
// );

// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// })

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// 使用 GraphQL Schema Language 创建一个 schema


var schema = buildSchema(
  `
    type Query {
      hello: String,
      masli: Float!,
      world: [Int],
    },
  `
);
// type Query {
//   rollDice(numDice: Int!, numSides: Int): [Int]
// }

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  world: () => {
    // return '我是你的全世界 !'
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  hello: () => {
    // return '我的小行星 !'
    return Math.random();
  },
  masli: () => {
    // return " 321132123 "
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  }
  // rollDice: function ({ numDice, numSides }) {
  //   var output = [];
  //   for (var i = 0; i < numDice; i++) {
  //     output.push(1 + Math.floor(Math.random() * (numSides || 6)));
  //   }
  //   return output;
  // }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

