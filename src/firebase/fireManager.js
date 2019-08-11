import {db} from "../fire";

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

export function getUsers_IdBySkills(skill_id) {
    return new Promise((resolve, reject) => {
        const docRef = db.collection('Users-Skills').where("skill-id", "==", skill_id);
        docRef.get().then((snapshot) => {
            let data=[];
            //debugger;
            snapshot.docs.forEach(doc => {
                data.push(doc.data()['user-id'])
            });
            resolve(data)

        }).catch(e => reject(e));
    })
}


export function getUserData(u_id) {
    return new Promise((resolve, reject) => {
        const docRef = db.collection('users').doc(u_id);
        docRef.get().then((doc) => {
           // console.log(doc.data(), "doc.data()")
            resolve({...doc.data(),id:doc.id})
        })
            .catch((e) => reject(e));


    })
}