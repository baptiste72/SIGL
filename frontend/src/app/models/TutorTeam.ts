import { Apprentice } from './Apprentice';
import { Mentor } from './Mentor';
import { Tutor } from './Tutor';

export class TutorTeam {
  apprentice: Apprentice;
  mentor: Mentor;
  tutor: Tutor;

  constructor(apprentice: Apprentice, mentor: Mentor, tutor: Tutor) {
    this.apprentice = apprentice;
    this.mentor = mentor;
    this.tutor = tutor;
  }
}
