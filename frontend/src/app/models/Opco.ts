export class Opco {
  opco_cmp_siret: number;
  opco_name: string;
  opco_siret: number;
  opco_address: string;
  opco_phone: string;
  opco_email: string;
  constructor(
    opco_cmp_siret: number,
    opco_name: string,
    opco_siret: number,
    opco_address: string,
    opco_phone: string,
    opco_email: string,
) {
    this.opco_cmp_siret = opco_cmp_siret
    this.opco_name = opco_name
    this.opco_siret = opco_siret
    this.opco_address = opco_address
    this.opco_phone = opco_phone
    this.opco_email = opco_email
  }}
