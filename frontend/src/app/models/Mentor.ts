import { Role } from '@app/helpers';
import { first } from 'rxjs';
import { User } from './User';

export class Mentor extends User {
  mt_cmp_siret: number;
  mt_job_title: string;
  mt_last_diploma: string;
  mt_former_eseo: string;
  mt_phone: string;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
    mt_cmp_siret: number,
    mt_job_title: string,
    mt_last_diploma: string,
    mt_former_eseo: string,
    mt_phone: string
  ) {
    super(id, firstName, lastName, email, role);
    this.mt_cmp_siret = mt_cmp_siret;
    this.mt_job_title = mt_job_title;
    this.mt_last_diploma = mt_last_diploma;
    this.mt_former_eseo = mt_former_eseo;
    this.mt_phone = mt_phone;
  }
}
