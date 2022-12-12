from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone
from api.views import TutorTeamList
import datetime
from base.models import (
    Apprentice,
    Company,
    Deadline,
    FormationCenter,
    Interview,
    Mentor,
    Semester,
    Tutor,
    TutorTeam,
    YearGroup,
)


class test_views_api(APITestCase):

    def authenticate(self):
        #self.client.post(reverse("register"),{'username':"username",'email': 'email', 'password': 'password'})
        response = self.client.post(reverse('login', {'username':'username','email': 'email', 'password': 'password'}))
        self.client.credentials(HTTP_AUTHORIZATION='Admin')

    def test_get_mentors(self):
        response = self.client.get(reverse('getMentors'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_mentor_valid_data(self):
        sample_mentor = {
            'id' : 1,
            'last_name': 'Men',
            'first_name': 'Sim',
            'password': 'azertyuiop12',
            'email': 'simon.men@reseau.eseo.fr',
            'company': '',
        }
        previous_mentor_count = Mentor.objects.all().count()
        response = self.client.post(reverse('addMentor'), sample_mentor)
        self.assertEqual(Mentor.objects.all().count(), previous_mentor_count+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_mentor_invalid_data(self):
        sample_mentor = {
            'id' : "azer",
            'password': 'azertyuiop12',
        }
        previous_mentor_count = Mentor.objects.all().count()
        response = self.client.post(reverse('addMentor'), sample_mentor)
        self.assertEqual(Mentor.objects.all().count(), previous_mentor_count)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_tutors(self):
        response = self.client.get(reverse('getTutor'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_apprentice(self):
        response = self.client.get(reverse('getApprentices'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_interview(self):
        response = self.client.get(reverse('getInterviews'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_interview_valid_data(self):
        now = datetime.datetime.now()
        hour = '{:02d}'.format(now.hour)
        minute = '{:02d}'.format(now.minute)
        second = '{:02d}'.format(now.second)
        hour_minute_seconds = '{}-{}-{}'.format(hour, minute, second)
        sample_interview = {
            'name' : 'Interview1',
            'date' : now,
            'first_hour' : hour_minute_seconds,
            'last_hour' : hour_minute_seconds,
            'description' : 'desc1',
            'guest' : 'guest1',
            'semester' : 'S9'
        }
        previous_interview_count = Interview.objects.all().count()
        response = self.client.post(reverse('addInterview'), sample_interview)
        self.assertEqual(Interview.objects.all().count(), previous_interview_count+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_interview_invalid_data(self):
        now = datetime.datetime.now()
        hour = '{:02d}'.format(now.hour)
        minute = '{:02d}'.format(now.minute)
        second = '{:02d}'.format(now.second)
        hour_minute_seconds = '{}-{}-{}'.format(hour, minute, second)
        sample_interview = {
            'name' : 'Interview1',
            'date' : '12/02',
            'first_hour' : hour_minute_seconds,
            'last_hour' : hour_minute_seconds,
            'description' : 'desc1',
            'guest' : 'guest1',
            'semester' : 'S9'
        }
        previous_interview_count = Interview.objects.all().count()
        response = self.client.post(reverse('addInterview'), sample_interview)
        self.assertEqual(Interview.objects.all().count(), previous_interview_count)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_deadline(self):
        response = self.client.get(reverse('getDeadlines'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_deadline(self):
        now = datetime.datetime.now()
        sample_deadline = {
            'name' : 'Deadline1',
            'date' : now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            'description' : 'desc1'
        }
        previous_deadline_count = Deadline.objects.all().count()
        response = self.client.post(reverse('addDeadline'), sample_deadline)
        self.assertEqual(Deadline.objects.all().count(), previous_deadline_count+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_year_group(self):
        response = self.client.get(reverse('getYearGroups'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_post_year_group(self):
        now = datetime.datetime.now()
        sample_yeargroup = {
            'id': 1,
            'worded': 'Promo Noether',
            'beginDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        }
        previous_yeargroup_count = YearGroup.objects.all().count()
        response = self.client.post(reverse('addYearGroup'), sample_yeargroup)
        self.assertEqual(YearGroup.objects.all().count(), previous_yeargroup_count+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete_year_group_by_id(self):
        now = datetime.datetime.now()
        sample_yeargroup = {
            'id': 1,
            'worded': 'Promo Noether',
            'beginDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        }
        previous_yeargroup_count = YearGroup.objects.all().count()
        response = self.client.post(reverse('addYearGroup'), sample_yeargroup)
        self.assertEqual(YearGroup.objects.all().count(), previous_yeargroup_count+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        sample_yeargroup = {
            'id' : YearGroup.objects.all()[0].id
        }
        url = reverse('deleteYearGroupById', kwargs={'pk': sample_yeargroup['id']})
        response = self.client.delete(url)
        self.assertEqual(YearGroup.objects.all().count(), previous_yeargroup_count)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_year_group(self):
        now = datetime.datetime.now()
        sample_yeargroup = {
            'id': 1,
            'worded': 'Promo Noether',
            'beginDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        }
        previous_yeargroup_count = YearGroup.objects.all().count()
        response = self.client.post(reverse('addYearGroup'), sample_yeargroup)
        self.assertEqual(YearGroup.objects.all().count(), previous_yeargroup_count+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        now = datetime.datetime.now()
        sample_yeargroup_to_update = {
            'pk': YearGroup.objects.all()[0].pk,
            'id': YearGroup.objects.all()[0].id,
            'worded': 'Promo Tesla',
            'beginDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        }

        response = self.client.post(reverse('updateYearGroup'), sample_yeargroup_to_update)
        self.assertEqual(YearGroup.objects.all()[0].worded, sample_yeargroup_to_update['worded'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_semester(self):
        response = self.client.get(reverse('getSemesters'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_semester(self):
        now = datetime.datetime.now()
        sample_semester = {
            'id': 1,
            'name': 'S9',
            'beginDate': now,
            'endDate': now,
            'yeargroup': ''
        }
        previous_semester = Semester.objects.all().count()
        response = self.client.post(reverse('addSemester'), sample_semester)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Semester.objects.all().count(), previous_semester+1)


    def test_delete_semester_by_id(self):
        now = datetime.datetime.now()
        sample_semester = {
            'id': 1,
            'name': 'S9',
            'beginDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            'endDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            'yeargroup': '',
            'apprentice': ''
        }
        previous_semester = Semester.objects.all().count()
        response = self.client.post(reverse('addSemester'), sample_semester)
        self.assertEqual(Semester.objects.all().count(), previous_semester+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        sample_semester_to_delete = {
            'id' : Semester.objects.all()[0].id
        }
        url = reverse('deleteSemesterById', kwargs={'pk': sample_semester_to_delete['id']})
        response = self.client.delete(url)
        self.assertEqual(Semester.objects.all().count(), previous_semester)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_semester_by_id(self):
        now = datetime.datetime.now()
        sample_semester = {
            'id': 1,
            'name': 'S9',
            'beginDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            'endDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            'yeargroup': '',
            'apprentice': ''
        }
        previous_semester = Semester.objects.all().count()
        response = self.client.post(reverse('addSemester'), sample_semester)
        self.assertEqual(Semester.objects.all().count(), previous_semester+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        sample_yeargroup = {
            'id': 1,
            'worded': 'Promo Noether',
            'beginDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
        }
        previous_yeargroup_count = YearGroup.objects.all().count()
        response = self.client.post(reverse('addYearGroup'), sample_yeargroup)
        self.assertEqual(YearGroup.objects.all().count(), previous_yeargroup_count+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        sample_semester_to_update = {
            'pk': Semester.objects.all()[0].pk,
            'id': Semester.objects.all()[0].id,
            'name': 'S10',
            'beginDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            'endDate': now.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            'yearGroup': YearGroup.objects.all()[0].pk,
            'apprentice': ''
        }
        response = self.client.post(reverse('updateSemester'), sample_semester_to_update)
        self.assertEqual(Semester.objects.all()[0].name, sample_semester_to_update['name'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    """
    def test_get_tutor_teams(self):
        response = self.client.get(TutorTeamList)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_tutor_teams(self):
        sample_tutor_teams = {
            'id': 1,
            'mentor': '',
            'tutor': '',
            'apprentice': ''
        }
        previous_tutor_teams = TutorTeam.objects.all().count()
        response = self.client.post(reverse('addTutorTeams'), sample_tutor_teams)
        self.assertEqual(TutorTeam.objects.all().count(), previous_tutor_teams+1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    """
