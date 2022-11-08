
from base.models import Mentor, Trainee, TeacherInCharge

# class permettant d'aider à la récupération des équipes tutorales
class TutorTeamHelper:
    
    def getAllTutorTeam(serializers):
        # boucle permettant de récupérer la totalité des équipes tutorales
        response = []
        for data in range(len(serializers.data)):
            # récupération des clées étrangères
            teacherInChargeID = serializers.data[data]['teacherInCharge']
            mentorID = serializers.data[data]['mentor']
            traineeID = serializers.data[data]['trainee']

            # récupération des données liées aux clées étrangères
            # on aurait pu le faire en une requête dans la base User 
            # mais d'un point de vue métier ça n'a pas le même sens
            teacherInCharge = TeacherInCharge.objects.filter(pk=teacherInChargeID).values('id', 'first_name', 'last_name', 'email')
            mentor = Mentor.objects.filter(pk=mentorID).values('id','first_name', 'last_name', 'email')
            trainee = Trainee.objects.filter(pk=traineeID).values('id','first_name', 'last_name', 'email')

            # fabriaction d'un json object equipe tutorale contenant réellement les infos
            context = {            
                'mentor': mentor,
                'trainee': trainee,
                'teacherInCharge': teacherInCharge
            }
            
            # ajout de l'équipe tutorale récupérée ou autre équipe tutorale
            response.append(context)
        return response