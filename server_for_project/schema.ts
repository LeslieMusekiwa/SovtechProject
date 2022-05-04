const axios = require('axios').default;
import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } from 'graphql';
import { type } from 'os';

//Hero Type

const PageType = new GraphQLObjectType({
    name: 'Page',
    fields: () => ({
        count: {type: GraphQLInt},
        next: {type: GraphQLString},
        previous: {type: GraphQLString},
        results: {type: new GraphQLList(HeroType)},
    }),
})

const HeroType = new GraphQLObjectType({
    name: 'Hero',
    fields: () => ({
        name: { type: GraphQLString },
        height: { type: GraphQLString },
        mass: { type: GraphQLString },
        gender: { type: GraphQLString },
        homeworld: { type: (GraphQLString)},
    })
});




// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: { 
        results:{
            type: new GraphQLList(HeroType),
            resolve(parent, args){
                return axios.get('https://swapi.dev/api/people/?page=1')
                .then((res: any) => res.data.results);
            }
        },
        Hero: {
            type: new GraphQLList(HeroType),
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent, args)
            {
                return axios.get(`https://swapi.dev/api/people/?search=${args.name}`)
                .then((res: any) => res.data.results);
            }
        },
        Page: {
            type: PageType,
            args: { page_num : {type: GraphQLInt}
            },
            resolve(parent, args){
                return axios.get(`https://swapi.dev/api/people/?page=${args.page_num}`)
                .then((res: any) => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({query: RootQuery});