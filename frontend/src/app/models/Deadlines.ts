export class Deadlines {
  id: number;
  name: string;
  date: Date;
  description: string;
  //deliverable: string;
  constructor(
    id: number,
    name: string,
    date: Date,
    description: string
    //deliverable: string,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.description = description;
    //this.deliverable = deliverable;
  }
}
