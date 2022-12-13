from enum import Enum


class Semester(Enum):
    SEMESTRE_5 = 1
    SEMESTRE_6 = 2
    SEMESTRE_7 = 3
    SEMESTRE_8 = 4
    SEMESTRE_9 = 5
    SEMESTRE_10 = 6


class Role(Enum):
    UNKNOWN = "UNKNOWN"
    APPRENTICE = "APPRENTICE"
    TUTOR = "TUTOR"
    MENTOR = "MENTOR"
    COMPANY = "COMPANY"
    COORDINATOR = "COORDINATOR"
