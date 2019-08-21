import {db} from "./fire";

export function getActiveCategories() {
    return new Promise((resolve, reject)=>{
        db.collection('Categories').where("status", "==", true).get().then((snapshot)=>{
            const data = [];
            let others=null;
            snapshot.docs.forEach(doc=>{


                if (doc.id !=='8.Others'){
                    const obj={...doc.data(),id:doc.id};
                    data.push(obj);
                }
                else{
                    others={...doc.data(),id:doc.id};
                }

              // id.push(doc.id);
               // console.log(doc.data())
            });

            data.push(others);
            resolve(data);
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
export function removeSkillFromUserList(u_id,skill_id) {
    return new Promise((resolve, reject) => {
        const docRef = db.collection('Users-Skills').where("user-id", "==", u_id);
        docRef.get().then((snapshot) => {
            let data=[];
            //debugger;
            snapshot.docs.forEach(doc => {
                if(doc.data()['skill-id'] === skill_id){
                    data.push(doc.id)
                }
            });
            return data;
        }).then((row)=>{
            db.collection('Users-Skills').doc(row[0]).delete().then(function() {
               resolve(true)
            }).catch(function(e) {
                reject(e)
            });

        }).catch(e => reject(e));
    })
}
export function getUserSkills(u_id) {
    return new Promise((resolve, reject) => {
        const docRef = db.collection('Users-Skills').where("user-id", "==", u_id);
        docRef.get().then((snapshot) => {
            let data=[];
            //debugger;
            snapshot.docs.forEach(doc => {
                data.push(doc.data()['skill-id'])
            });
            resolve(data)

        }).catch(e => reject(e));
    })
}
export function getAllSkills(cat_id,skill_id) {
    return new Promise((resolve, reject) => {

        db.collection('Categories').doc(cat_id).collection('sub').get().then((snapshot)=>{

            const data = [];
            //debugger;
            snapshot.docs.forEach(doc=>{

                if(doc.id === skill_id){
                    data.push({...doc.data(),id:doc.id});
                }
            });
            resolve(data)
        }).catch(e=> reject(e));
    })
}
export function editUserInfo(user_id,obj) {
    return new Promise((resolve, reject) => {

        db.collection('users').doc(user_id).update(obj).then((data)=>{
            resolve(data)
        }).catch(e=> reject(e));
    })
}
export function getSkillsData(skill_id) {
    return new Promise((resolve, reject) => {
        db.collection('Categories').get()
            .then((snapshot) => {
                const data = [];
                snapshot.docs.forEach(doc => {
                   data.push(doc.id);
                });
                return(data)
            }).then((data)=>{

            const promises=[];
            let i=0;
            while(i<data.length){

                    promises.push(getAllSkills(data[i],skill_id))


                i++;
            }
            Promise.all(promises).then(values => {
                const data=[]
                for(let i=0; i<values.length; i++){
                    if (values[i].length){
                        data.push(values[i]);
                    }
                }

                resolve(data);

            }).catch(e => reject(e));
        })

    })
}

export function subscribeUser(email) {
    return new Promise((resolve, reject) => {
        const emailDef = db.collection('subscribe').where("email", "==", email);
        emailDef.get().then((data)=>{
            if(data.empty){
                db.collection('subscribe').add({
                    email:email
                }).then((data)=>{
                    resolve(data);
                }).catch(e=> reject(e))
            }
            else{
                reject({err_mess:'You have already Subscribed!'});
            }
        }).catch(e=> reject(e))

    })
}