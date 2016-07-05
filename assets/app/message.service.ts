import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Message } from './message.model';
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx';

@Injectable()
export class MessageService {
    constructor(private http: Http){}

    getMessages(): Observable<any> {
        return this.http.get('http://localhost:3000/messages').map(data => {
            const extracted = data.json();
            const msgArray: Message[] = [];
            let message;
            for(let element of extracted.data){
                message = new Message(element.content);
                msgArray.push(message);
            }
            return msgArray;
        });
    }

    saveMessage(message: Message): Observable<any> {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:3000/message', body, {headers: headers});
    }
}