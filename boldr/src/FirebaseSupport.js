//convert snapshot of problems collection to problems
export function convertCollectionToProblems(querySnapshot){
  let tempData = [];
  querySnapshot.forEach((doc) => {
    let temp = {};
    let allstars = [doc.get('allstars.1'), doc.get('allstars.2'), doc.get('allstars.3'), doc.get('allstars.4'), doc.get('allstars.5')];
    let allvratings = [];
    for (let i = 0; i < 11; i++){
      let field = 'allvratings.V' + String(i);
      allvratings[i] = doc.get(field);
    }
    temp['id'] = doc.id;
    temp['image'] = doc.get('img');
    temp['title'] = doc.get('name');
    temp['isFavorite'] = false;
    temp['gym'] = doc.get('gymname');
    temp['description'] = doc.get('description');
    temp['rating'] = averageRating(allstars, 5);
    temp['vrating'] = averageRating(allvratings, 11).toPrecision(1);
    tempData = tempData.concat(temp);
  });
  
  return tempData;
}

export function convertDocumentToProblem(querySnapshot){
  const doc1 = querySnapshot.data();
  let temp = {};
  /*let allstars = [doc1['allstars.1'], doc1['allstars.2'], doc1['allstars.3'], doc1['allstars.4'], doc1['allstars.5']];
  let allvratings = [];
  for (let i = 0; i < 11; i++){
    let field = 'allvratings.V' + JSON.stringify(i);
    allvratings[i] = doc1[field];
  }*/
  temp['id'] = doc1.id;
  temp['image'] = doc1['img'];
  temp['title'] = doc1['name'];
  temp['isFavorite'] = false;
  temp['gym'] = doc1['gymname'];
  temp['description'] = doc1['description'];
  temp['rating'] = doc1['rating'];
  temp['vrating'] = doc1['vrating'];

  return temp;
}

function averageRating(allratings, len){
  let sum = 0;
  let count = 0;
  for (let i = 0; i < len; i++){
    sum = sum + i*allratings[i];
    count = count + allratings[i];
  }
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