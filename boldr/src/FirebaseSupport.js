import React from 'react';
import { db, app, storage } from "./firebase-config.js";
import { collection, getDocs, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';


export function getAllProblems(component){
    getAllDocs().then(
      (value) => {
        value.forEach((problem) =>{
          getDownloadURL(ref(storage, problem['image'])).then(
            (value2) => {
              let temp = problem;
              temp['image'] = value2;
              component.setState({
                data: value
              });
            }, (error) => {
              console.error(error);
            }
          );
        });
    },
    (error) => {
    console.error(error);
    this.setState({
        data: fallbackProbs
    });
    }).finally((info) =>{
        console.log("done?")
    });
}

export function getProblemFromID(component, id){
    getDocFromID(id).then(
        (value) => {
        getDownloadURL(ref(storage, value['image'])).then(
            (value2) => {
                value['image'] = value2;
                component.setState({
                    data: value
                });
                }, (error) => {
                console.error(error);
                }
            );
        },
        (error) => {
            console.error(error);
            this.setState({
                data: fallbackProbs
            });
        }
    ).finally((info) =>{
        console.log("done?")
    });
}

async function getDocFromID(id){
    const docRef = doc(db, "problems", id)
    const querySnapshot = getDoc(docRef);
    const doc = querySnapshot.data();

    let temp = {};
    temp['id'] = doc.id;
    temp['image'] = doc.get('img');
    temp['title'] = doc.get('name');
    temp['isFavorite'] = false;
    temp['gym'] = doc.get('gymname');
    temp['description'] = doc.get('description');
    temp['rating'] = doc.get('rating');
    temp['vrating'] = doc.get('vrating');

    return temp;
}


async function getAllDocs(){
    let tempData = [];
    const querySnapshot = await getDocs(collection(db, "problems"));
    querySnapshot.forEach((doc) => {
      let temp = {};
      temp['id'] = doc.id;
      temp['image'] = doc.get('img');
      temp['title'] = doc.get('name');
      temp['isFavorite'] = false;
      temp['gym'] = doc.get('gymname');
      temp['description'] = doc.get('description');
      temp['rating'] = doc.get('rating');
      temp['vrating'] = doc.get('vrating');
      tempData = tempData.concat(temp);
      //console.log(doc.id, " => ", doc.data());
    });
  
    //console.log('data:');
    //console.log(tempData);
    return tempData;
}

export const fallbackProbs = [
    {
      id: 0,
      image: null,
      title: "",
      isFavorite: false,
      gym: "",
      description: "",
    }
]
