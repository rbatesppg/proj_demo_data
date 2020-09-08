/*


// ***********************************************************************
//
//           Mutation Groups 
//
// ***********************************************************************
GET /mutation_groups/_search
{
  "_source": ["name","mutationGroupId","mutationIds","modifiers"], 
  "query": {
    "match_all": {}
  }
  , "size": 500
}




// ***********************************************************************
//
//            Result Interpretations
//
// ***********************************************************************
GET /result_interpretations/_search
{
  "_source": ["meta","isPublished","caseId","mutationGroupId","mutationIds","genotype"], 
  "query": {
    "match_all": {}
  }
  , "size": 2000
}




// ***********************************************************************
//
//            Animals
//
// ***********************************************************************
GET /animals/_search
{
  "_source": ["animalId","caseId","callName","breed","sex","modifiers"], 
  "query": {
    "match_all": {}
  }
  , "size": 2000
}




// ***********************************************************************
//
//            Breeds
//
// ***********************************************************************
GET /breeds/_search
{
  "_source": ["breedId","name","taxonomy"], 
  "query": {
    "match_all": {}
  }
  , "size": 800
}









*/