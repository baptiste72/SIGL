export class Period {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  description: string;

  constructor(
    id: number,
    name: string,
    start_date: Date,
    end_date: Date,
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.start_date = start_date;
    this.end_date = end_date;
    this.description = description;
  }
}
