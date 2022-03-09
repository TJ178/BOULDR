import { doc } from "firebase/firestore";

//convert snapshot of problems collection to problems
export function convertCollectionToProblems(querySnapshot){
  let tempData = [];
  querySnapshot.forEach((doc) => {
    let temp = {};
    
    const tempStars = doc['allstars'];
    let allstars = [];
    if(tempStars){
      for (let i = 0; i < 5; i++){
        let field = 'allstars.' + String(i+1);
        let tempvalue = doc.get(field);
        if (tempvalue != null){
          allstars[i] = tempvalue;
        } else {
          allstars[i] = 0;
        }
      }
    }
    
    let allvratings = [];
    if(allvratings){
      for (let i = 0; i < 11; i++){
        let field = 'allvratings.V' + String(i);
        let tempvalue = doc.get(field);
        if (tempvalue != null){
          allvratings[i] = tempvalue;
        } else {
          allvratings[i] = 0;
        }
      }
    }
    temp['id'] = doc.id;
    temp['image'] = doc.get('img');
    temp['title'] = doc.get('name');
    temp['isFavorite'] = false;
    temp['gym'] = doc.get('gymname');
    temp['description'] = doc.get('description');
    temp['rating'] = averageRating(allstars, 5);
    temp['vrating'] = averageRating(allvratings, 11) ? Math.round(averageRating(allvratings, 11)) : doc.get('vrating');
    tempData = tempData.concat(temp);
  });
  
  return tempData;
}

export function convertDocumentToProblem(querySnapshot){
  const doc1 = querySnapshot.data();
  let temp = {};

  const tempStars = doc1['allstars'];
  let allstars = [];
  if(tempStars){
    for (let i = 0; i < 5; i++){
      if (tempStars[i+1] != null){
        allstars[i] = tempStars[i+1];
      } else {
        allstars[i] = 0;
      }
    }
  }
  
  const tempVratings = doc1['allvratings']
  let vratingExists;
  let allvratings = [];
  if (tempVratings != null) {
    vratingExists = true;
    for (let i = 0; i < 11; i++) {
      let index = "V" + String(i);
      if (tempVratings[index] != null) {
        allvratings[i] = tempVratings[index];
      } else {
        allvratings[i] = 0;
      }
    }
  } else vratingExists = false;
  
  temp['id'] = doc1.id;
  temp['image'] = doc1['img'];
  temp['title'] = doc1['name'];
  temp['isFavorite'] = false;
  temp['gym'] = doc1['gymname'];
  temp['description'] = doc1['description'];
  temp['rating'] = tempStars ? averageRating(allstars, 5) : 0;
  temp['vrating'] = vratingExists ? Math.round(averageRating(allvratings, 11)) : doc1['vrating'];
  temp['available'] = doc1['available'];

  return temp;
}

function averageRating(allratings, len){
  let sum = 0;
  let count = 0;
  for (let i = 0; i < len; i++){
    let k = i;
    if (len == 5)
      k = i + 1;
    sum = sum + k*allratings[i];
    count = count + allratings[i];
  }
  if (count !== 0)
    return(sum/count);
}

//search = string to search for
//searchLoc = property of problems to search in
//problems = input problems to search

export function searchProblems(search, searchLoc, problems){
  if(search && searchLoc && problems){
    search = search.toLowerCase();
    let foundItems = [];
    problems.forEach((p) =>{
      for(let s of searchLoc){
        if(p[s] && p[s].toLowerCase().includes(search)){
          foundItems = foundItems.concat([p]);
          break;
        }
      }
    });
    return foundItems;
  }
  return problems;
}