import { Role } from '@app/helpers';
import { User } from './User';

export class CompanyUser extends User {
  company_siret: number;
  opco_siret: number;
  contactCompany_id: number;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
    company_siret: number,
    opco_siret: number,
    contactCompany_id: number
  ) {
    super(id, firstName, lastName, email, role);
    this.company_siret = company_siret;
    this.opco_siret = opco_siret;
    this.contactCompany_id = contactCompany_id;
  }
}
