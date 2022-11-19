export class Interviews {
  id: number;
  name: string;
  date: Date;
  first_hour: number;
  last_hour: number;
  guest: string;
  description: string;
  semester: string;

  constructor(
    id: number,
    name: string,
    date: Date,
    first_hour: number,
    last_hour: number,
    guest: string,
    description: string,
    semester: string
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.first_hour = first_hour;
    this.last_hour = last_hour;
    this.guest = guest;
    this.description = description;
    this.semester = semester;
  }
}
