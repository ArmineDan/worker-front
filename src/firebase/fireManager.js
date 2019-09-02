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
                const obj={...doc.data(),id:doc.id};
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
                if(data.indexOf(doc.data()['user-id'])=== -1){
                    data.push(doc.data()['user-id'])
                }

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
               // console.log(doc.data(),"doc.data()doc.data()doc.data()doc.data()doc.data()")
                data.push(doc.data()['skill-id'])
            });
            resolve(data)

        }).catch(e => reject(e));
    })
}
export function getUserOthersSkillsName(u_id) {
    return new Promise((resolve, reject) => {
        const docRef = db.collection('Users-Skills').where("user-id", "==", u_id);
        docRef.get().then((snapshot) => {
            let data=[];
            //debugger;
            snapshot.docs.forEach(doc => {
                if (doc.data()['skill-id'] ==='8.Others'){
                           // console.log(doc.data(),"doc.data()doc.data()doc.data()doc.data()doc.data()")
                data.push(doc.data()['skill-name'])
                }
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

                    promises.push(getAllSkills(data[i],skill_id));


                i++;
            }
            Promise.all(promises).then(values => {
                const data=[];
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


export function setNewUser(id,values) {
    return new Promise((resolve,reject)=>{
          db.collection('users').doc(id).set({
           firstName: values.firstName,
           lastName: values.lastName,
           age: "_",
           address: 'city/street',
           avatar: "https://firebasestorage.googleapis.com/v0/b/varpet-com.appspot.com/o/Avatars%2FDefaultAvatar.PNG?alt=media&token=d32bbf2a-c0b5-4593-8394-fd771001beda",
           mobile: '+374 XX XXX XXX',
           email: values.email,
           url: ["https://firebasestorage.googleapis.com/v0/b/varpet-com.appspot.com/o/Images%2FCapture1.PNG?alt=media&token=475f002c-4b52-4ed8-b7e2-08dc74b63d99",
               "https://firebasestorage.googleapis.com/v0/b/varpet-com.appspot.com/o/Images%2FCapture1.PNG?alt=media&token=475f002c-4b52-4ed8-b7e2-08dc74b63d99",
               "https://firebasestorage.googleapis.com/v0/b/varpet-com.appspot.com/o/Images%2FCapture1.PNG?alt=media&token=475f002c-4b52-4ed8-b7e2-08dc74b63d99",
               "https://firebasestorage.googleapis.com/v0/b/varpet-com.appspot.com/o/Images%2FCapture1.PNG?alt=media&token=475f002c-4b52-4ed8-b7e2-08dc74b63d99"],
           status: true,
       }).then(()=> { resolve(true)})
       .catch(error => reject(error))
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

export function getCategityIdByName(cat_name) {
    return new Promise((resolve, reject) => {
        const emailDef = db.collection('Categories').where("name", "==", cat_name);
        emailDef.get().then((data)=>{
            data.docs.forEach(doc=>{

                resolve(doc.id)
        })

    }).catch(e=> reject(e))
})
}