export class CompanyUserCompanyInfoAssociation {
  user_company_id: number;
  company_siret: number;
  opco_siret: number;
  contactCompany_id: number;
  constructor(
    user_company_id: number,
    company_siret: number,
    opco_siret: number,
    contactCompany_id: number
  ) {
    this.user_company_id = user_company_id;
    this.company_siret = company_siret;
    this.opco_siret = opco_siret;
    this.contactCompany_id = contactCompany_id;
  }
}
