import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})

export class SocketComponent implements OnInit {

  socket = io('http://localhost:3000');
  amountOfUserConnect: 'numClients';

  constructor() { }

  ngOnInit() {
    //when I am already login 
    //if (this.authService.authenticated == true) {
      this.socket.on('numClients', (data) => {
        this.amountOfUserConnect = data.numClients;
      });
    //}
  }

  onChange() {
    this.socket = io('http://localhost:3000');
    this.socket.emit('update', this.amountOfUserConnect);
  }
}

