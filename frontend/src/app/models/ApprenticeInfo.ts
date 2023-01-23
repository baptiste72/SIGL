export class ApprenticeInfo {
  id: number;
  app_last_name: string;
  app_first_name: string;
  app_job_title: string;
  app_description: string;
  app_phone: string;
  app_collective_convention: string;
  app_working_hours: string;
  app_comp_name: string;
  app_siret: string;
  app_location: string;

  constructor(
    id: number,
    lastName: string,
    firstName: string,
    jobTitle: string,
    description: string,
    phone: string,
    collectiveConvention: string,
    workingHours: string,
    companyName: string,
    companySiret: string,
    companyLocation: string
  ) {
    this.id = id;
    this.app_last_name = lastName;
    this.app_first_name = firstName;
    this.app_job_title = jobTitle;
    this.app_description = description;
    this.app_phone = phone;
    this.app_collective_convention = collectiveConvention;
    this.app_working_hours = workingHours;
    this.app_comp_name = companyName;
    this.app_siret = companySiret;
    this.app_location = companyLocation;
  }
}
