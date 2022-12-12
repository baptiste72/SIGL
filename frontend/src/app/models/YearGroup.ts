export class YearGroup {
  id: number;
  worded: string;
  beginDate: Date;

  constructor(id: number, worded: string, beginDate: Date) {
    this.id = id;
    this.worded = worded;
    this.beginDate = beginDate;
  }
}

