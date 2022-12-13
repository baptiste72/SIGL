export class FormationCenter {
    id: number;
    worded: string;
    city: string;
    postal_code: string;
    address: string;

    constructor(id: number, worded: string, city: string, postal_code: string, address: string) {
      this.id = id;
      this.worded = worded;
      this.city = city;
      this.postal_code = postal_code;
      this.address = address;
    }
  }
