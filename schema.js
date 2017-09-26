const request = require('request');
const fetch = require('node-fetch');
const xml2json = require('xml2json');

var { GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const NewsType = new GraphQLObjectType({
    name: 'News',
    description:'...',
    fields:{
        title:{
            type:GraphQLString,
            resolve(xml){
                json=JSON.parse(xml)
                return json.rss.channel.item[0].title
            }
        },
        description:{
            type:GraphQLString,
            resolve(xml){
                json=JSON.parse(xml)
                return json.rss.channel.item[0].description
            }
        },
        link:{
            type:GraphQLString,
            resolve(xml){
                json=JSON.parse(xml)
                return json.rss.channel.item[0].link
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description:'...',
        fields:{
            news:{
                type:NewsType,
                resolve:(root, args)=>fetch(`https://news.google.com/news/rss/?ned=in&hl=en-IN`)
                .then(response => response.text())
                .then(function(xmlResponse){
                    return xml2json.toJson(xmlResponse);
                })
            }
        }
    }) 
});