import {db} from "../fire";

export function getActiveCategories() {
    return new Promise((resolve, reject)=>{
        db.collection('Categories').where("status", "==", true).get().then((snapshot)=>{
            const data = [];
            const id=[];

            snapshot.docs.forEach(doc=>{
                const obj={...doc.data(),id:doc.id}
                data.push(obj);
              // id.push(doc.id);
               // console.log(doc.data())
            });
           resolve(data)

        }).catch(e=> reject(e));
    })
}

export function getsubCategories(id) {
    return new Promise((resolve, reject)=>{

        db.collection('Categories').doc(id).collection('sub').get().then((snapshot)=>{
            const data = [];
            //debugger;
            snapshot.docs.forEach(doc=>{
                data.push(doc.data());
            });
            resolve(data)
        }).catch(e=> reject(e));
    })
}