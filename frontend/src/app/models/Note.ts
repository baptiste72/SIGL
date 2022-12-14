export class Note {
  id: number;
  title: string;
  text: string;
  beginDate: Date;
  endDate: Date;
  apprentice: number;
  semester: number;
  timestamp?: Date;

  constructor(
    id: number,
    title: string,
    text: string,
    beginDate: Date,
    endDate: Date,
    apprentice: number,
    semester: number,
    timestamp?: Date
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.apprentice = apprentice;
    this.semester = semester;
    this.timestamp = timestamp;
  }
}
