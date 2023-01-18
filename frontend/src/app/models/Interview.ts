export class Interview {
  id: number;
  name: string;
  date: Date;
  first_hour: number;
  last_hour: number;
  attendees: number[];
  description: string;
  semester: number;

  constructor(
    id: number,
    name: string,
    date: Date,
    first_hour: number,
    last_hour: number,
    attendees: number[],
    description: string,
    semester: number
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.first_hour = first_hour;
    this.last_hour = last_hour;
    this.attendees = attendees;
    this.description = description;
    this.semester = semester;
  }
}
