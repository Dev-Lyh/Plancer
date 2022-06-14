/* eslint-disable prettier/prettier */
export default class Gig {
  constructor(title, description, gigDate, deadLine, price, clientName, phoneClient, concluded, imgPath) {
    this.title = title;
    this.description = description;
    this.gigDate = gigDate;
    this.deadLine = deadLine;
    this.price = price;
    this.clientName = clientName;
    this.phoneClient = phoneClient;
    this.concluded = concluded;
    this.imgPath = imgPath;
  }
}
