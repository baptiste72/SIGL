import { Apprentice } from './Apprentice';
import { Mentor } from './Mentor';
import { Tutor } from './Tutor';

export class TutorTeam {
  id: number;
  apprentice: Apprentice;
  mentor: Mentor;
  tutor: Tutor;

  constructor(
    id: number,
    apprentice: Apprentice,
    mentor: Mentor,
    tutor: Tutor
  ) {
    this.id = id;
    this.apprentice = apprentice;
    this.mentor = mentor;
    this.tutor = tutor;
  }
}
