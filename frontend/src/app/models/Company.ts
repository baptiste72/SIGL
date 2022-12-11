export class Company {
  cmp_name: string;
  cmp_siret: number;
  cmp_employees: number;
  cmp_cpne: string;
  cmp_idcc: number;
  cmp_convention: string;
  cmp_naf_ape: string;
  cmp_work_field: string;
  cmp_phone: string;
  cmp_email: string;
  cmp_address: string;
  cmp_internat: string;

  constructor(
    cmp_name: string,
    cmp_siret: number,
    cmp_employees: number,
    cmp_cpne: string,
    cmp_idcc: number,
    cmp_convention: string,
    cmp_naf_ape: string,
    cmp_work_field: string,
    cmp_phone: string,
    cmp_email: string,
    cmp_address: string,
    cmp_internat: string
  ) {
    this.cmp_name = cmp_name;
    this.cmp_siret = cmp_siret;
    this.cmp_employees = cmp_employees;
    this.cmp_cpne = cmp_cpne;
    this.cmp_idcc = cmp_idcc;
    this.cmp_convention = cmp_convention;
    this.cmp_naf_ape = cmp_naf_ape;
    this.cmp_work_field = cmp_work_field;
    this.cmp_phone = cmp_phone;
    this.cmp_email = cmp_email;
    this.cmp_address = cmp_address;
    this.cmp_internat = cmp_internat;
  }
}
