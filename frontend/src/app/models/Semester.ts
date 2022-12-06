export class Semester {
  id: number;
  name: string;
  beginDate: Date;
  endDate: Date;
  yearGroup: number;

  constructor(id: number, name: string, beginDate: Date, endDate: Date, yearGroup: number) {
    this.id = id;
    this.name = name;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.yearGroup = yearGroup;
  }
}
