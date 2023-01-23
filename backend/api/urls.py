from django.urls import include, path

from . import views

urlpatterns = [
    # apprentices
    path("apprentices", views.ApprenticeList.as_view()),
    path("apprentices/<int:pk>", views.ApprenticeDetail.as_view()),
    # apprentice-info
    path("apprentice-info", views.ApprenticeInfoList.as_view()),
    path("apprentice-info/<int:pk>", views.ApprenticeInfoDetail.as_view()),
    path("apprentice-info/company/<int:pk>", views.ApprenticeInfoByCompany.as_view()),
    # companies
    path("companies", views.CompanyList.as_view()),
    path("companies/<int:pk>", views.CompanyDetail.as_view()),
    # opco
    path("opco", views.OpcoList.as_view()),
    path("opco/<int:pk>", views.OpcoDetail.as_view()),
    # contact-company
    path("contact-company", views.ContactCompanyList.as_view()),
    path("contact-company/<int:pk>", views.ContactCompanyDetail.as_view()),
    # company-user
    path("company-user", views.CompanyUserList.as_view()),
    path("company-user/<int:pk>", views.CompanyUserDetail.as_view()),
    # formation-centers
    path(
        "formation-centers/<int:pk>",
        views.FormationCenterDetail.as_view(),
        name="formationCenters",
    ),
    path(
        "formation-centers",
        views.FormationCenterList.as_view(),
        name="formationCenters",
    ),
    # apprentice-info
    path("apprentice-info", views.ApprenticeInfoList.as_view()),
    path("apprentice-info/<int:pk>", views.ApprenticeInfoDetail.as_view()),
    path("apprentice-info/validate/<int:pk>", views.ApprenticeInfoValidate.as_view()),
    # notes
    path("notes", views.NotesList.as_view()),
    path("notes/<int:pk>", views.NotesDetail.as_view()),
    path("notes/users/<int:pk>/", views.ApiNoteByUserId.as_view()),
    path("notes/tree-note/<int:pk>/", views.TreeNote.as_view()),
    # deadlines
    path("deadlines", views.DeadlinesList.as_view()),
    path("deadlines/<int:pk>/", views.DeadlinesDetail.as_view()),
    path("deadlines/users/<int:pk>/", views.DeadlinesByUserId.as_view()),
    # interviews
    path("interviews", views.InterviewList.as_view()),
    path("interviews/<int:pk>/", views.InterviewDetail.as_view()),
    path("interviews/users/<int:pk>/", views.InterviewsByUserId.as_view()),
    # mentors
    path("mentors", views.MentorList.as_view()),
    path("mentors/<int:pk>", views.MentorDetail.as_view()),
    path("mentors/company/<int:pk>", views.MentorByCompany.as_view()),
    # semesters
    path("semesters/year-groups/<int:pk>", views.SemesterByYearGroup.as_view()),
    path("semesters", views.SemesterList.as_view()),
    path("semesters/<int:pk>", views.SemesterDetail.as_view()),
    # tutor-teams
    path("tutor-teams", views.TutorTeamList.as_view()),
    path("tutor-teams/<int:pk>", views.TutorTeamDetail.as_view()),
    # tutors
    path("tutors", views.get_tutors, name="getTutor"),
    # users
    path("users", views.UserList.as_view()),
    path("users/<int:pk>", views.UserDetail.as_view()),
    path("users/change-password", views.UserChangePasswordView.as_view()),
    path(
        "users/password-reset/",
        include("django_rest_passwordreset.urls"),
    ),
    path("year-group", views.YearGroupList.as_view()),
    path("year-group/<int:pk>", views.YearGroupDetail.as_view()),
    # documents
    path("documents", views.DocumentList.as_view()),
    path("documents/<int:pk>", views.DocumentDetail.as_view()),
    path("documents/cleanup/<str:file_name>", views.cleanup),
    path("documents/year-group/<int:pk>", views.DocumentByYearGroup.as_view()),
    # livrables
    path("evaluations", views.EvaluationList.as_view()),
    path("evaluations/<int:pk>", views.EvaluationDetail.as_view()),
    path("evaluations/owner/<int:pk>", views.EvaluationByOwner.as_view()),
    path("evaluations/cleanup/<str:file_name>", views.cleanup),
]
