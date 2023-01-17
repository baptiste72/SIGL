export class Deadline {
  id: number;
  name: string;
  date: Date;
  description: string;

  constructor(id: number, name: string, date: Date, description: string) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.description = description;
  }
}
