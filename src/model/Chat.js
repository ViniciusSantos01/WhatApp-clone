import { Model } from "./Model";
import {Firebase} from '../util/Firebase';

export class Chat extends Model {

    constructor(){
        super();
    }

    get users(){ return this._data.users; }
    set users(value){ this._data.users = value; }

    get timeStamp(){ return this._data.timeStamp ; }
    set timeStamp(value){ this._data.timeStamp = value; }

    static getRef(){

        return Firebase.db().collection('/chats');

    }

    static create(meEmail, contactEmail){

        return new Promise((resp, rej) => {

            let users = {};

            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc => {

                Chat.getRef().doc(doc.id).get().then(chat => {

                    resp(chat);

                }).catch(err => {
                    rej(err);
                });

            }).catch(err => {
                rej(err);
            }); 

        });

    }

    static find(meEmail, contactEmail){

        //where(who, what to do, who) 
        return Chat.getRef().where(btoa(meEmail), '==', true).where(btoa(contactEmail), '==', true).get();

    }

    static createIfNotExists(meEmail, contactEmail){

        return new Promise((resp, rej) => {

            Chat.find(meEmail, contactEmail).then(chats => {

                if (chats.empty) {

                    Chat.create(meEmail, contactEmail).then(chat => {

                        resp(chat);

                    });

                } else {

                    chats.forEach(chat => {
                        
                        resp(chat);

                    });

                }

            }).catch(err => {
                rej(err);
            });

        });

    }

}