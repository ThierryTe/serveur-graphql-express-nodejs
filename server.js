const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');


//Schema graphql avec le type QUERY
const schema = buildSchema(`
      type Query{
        course(id: Int!): Course
        courses(topic: String):[Course]
      }
      type Mutation {
          updateCourseTopic(id: Int!, topic: String!): Course
      }
      type Course {
          id: Int,
          titre: String,
          auteur: String,
          description: String,
          topic: String,
          url: String

      }
`);
// Liste des cours
const courseData = [
    {
        id: 1,
        titre: "Créer un serveur graphql express et nodejs",
        auteur: "Tewendé",
        description: "Ce cours montre comment créer un serveur avec Express Graphql et Nodejs",
        topic: "Node.js",
        url: "http://localhost/mescours/graphql"
    },
    {
        id: 2,
        titre: "Débuter avec Reactjs",
        auteur: "Tewendé",
        description: "Ce cours montre comment créer une application web avec Reactjs",
        topic: "Reacrt.js",
        url: "http://localhost/mescours/react"
    },
    {
        id: 3,
        titre: "Créer un servuer express",
        auteur: "Tewendé",
        description: "Ce cours montre comment créer un serveur avec Express et Nodejs",
        topic: "Node.js",
        url: "http://localhost/mescours/express"
    }
]
// Fonction d'affichage d'un cours à travers son id
const getCourse = function(args){
    var id = args.id;
    return courseData.filter(course => {
        return course.id == id;
    })[0];
}
//Fonction d'affichage d'un cours par cartégorie
const getCourses = function(args){
    if(args.topic){
      var topic = args.topic;
      return courseData.filter(courses =>  courses.topic == topic)
     }else {
        return courseData;
    }
}
// Fonction de mise à jour de la catégorie d'un cours
const updateCourseTopic = function({id, topic}){
    courseData.map(course => {
        if(course.id === id){
            course.topic = topic;
            return course;
        }
    });
    return courseData.filter(course => course.id === id)[0];
}


//Resolver pour utiliser le schema graphql defini en haut
const root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
};

//Création du serveur express et de l'endpoint graphql
 const app = express();
 app.use('/graphql', express_graphql.graphqlHTTP({
     schema: schema,
     rootValue: root,
     graphiql: true
 }),
 );
 app.listen(4000, () => console.log('Serveur Express Graphql a démarré sur le port 4000'));