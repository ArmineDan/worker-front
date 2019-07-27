import {db} from "../fire";

export function getActiveCategories() {
    return new Promise((resolve, reject)=>{
        db.collection('Categories').where("status", "==", true).get().then((snapshot)=>{
            const data = [];
            snapshot.docs.forEach(doc=>{
                data.push(doc.data());
            })
            resolve(data)
        }).catch(e=> reject(e));
    })
}