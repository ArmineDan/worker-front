import {db,fire} from "../fire";

export function getActiveCategories() {
    return new Promise((resolve, reject)=>{
        db.collection('Categories').where("status", "==", true).get().then((snapshot)=>{
            const data = [];

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
                const obj={...doc.data(),id:doc.id}
                data.push(obj);
            });
            resolve(data)
        }).catch(e=> reject(e));
    })
}

export function getUsersBySkills(skill_id) {
    return new Promise((resolve, reject) => {
        const docRef = db.collection('skills').doc(skill_id);
        docRef.get().then((doc) => {
            resolve(doc.data())
            })
            .catch(e => reject(e));
    })
}

function userData(u_id){
    const data = [];
    debugger;
    db.collection('users').doc(u_id).get().then((snapshot)=>
    { console.log(snapshot.docs,"userData")
        snapshot.docs.forEach(docs => {
            data.push(docs.data());
        })
       return data;
    }).catch(e=> e)
}