export class ContactCompany {
  ct_cmp_siret: number;
  ct_last_name: string;
  ct_first_name: string;
  ct_phone: string;
  ct_email: string;
  ct_former_eseo: string;
  fi_last_name: string;
  fi_first_name: string;
  fi_phone: string;
  fi_email: string;
  fi_job_title: string;
  fi_former_eseo: string;
  sa_last_name: string;
  sa_first_name: string;
  sa_phone: string;
  sa_email: string;
  sa_job_title: string;
  sa_former_eseo: string;
  constructor(
    ct_cmp_siret: number,
    ct_last_name: string,
    ct_first_name: string,
    ct_phone: string,
    ct_email: string,
    ct_former_eseo: string,
    fi_last_name: string,
    fi_first_name: string,
    fi_phone: string,
    fi_email: string,
    fi_job_title: string,
    fi_former_eseo: string,
    sa_last_name: string,
    sa_first_name: string,
    sa_phone: string,
    sa_email: string,
    sa_job_title: string,
    sa_former_eseo: string
  ) {
    this.ct_cmp_siret = ct_cmp_siret;
    this.ct_last_name = ct_last_name;
    this.ct_first_name = ct_first_name;
    this.ct_phone = ct_phone;
    this.ct_email = ct_email;
    this.ct_former_eseo = ct_former_eseo;
    this.fi_last_name = fi_last_name;
    this.fi_first_name = fi_first_name;
    this.fi_phone = fi_phone;
    this.fi_email = fi_email;
    this.fi_job_title = fi_job_title;
    this.fi_former_eseo = fi_former_eseo;
    this.sa_last_name = sa_last_name;
    this.sa_first_name = sa_first_name;
    this.sa_phone = sa_phone;
    this.sa_email = sa_email;
    this.sa_job_title = sa_job_title;
    this.sa_former_eseo = sa_former_eseo;
  }
}
