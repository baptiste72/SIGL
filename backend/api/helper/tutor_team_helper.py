
from base.models import Mentor, Apprentice, Tutor

# class permettant d'aider à la récupération des équipes tutorales
class TutorTeamHelper:
    
    def getAllTutorTeams(serializers):
        # boucle permettant de récupérer la totalité des équipes tutorales
        response = []
        for data in range(len(serializers.data)):
            # récupération des clées étrangères
            apprenticeID = serializers.data[data]['apprentice']
            mentorID = serializers.data[data]['mentor']
            tutorID = serializers.data[data]['tutor']

            # récupération des données liées aux clées étrangères
            # on aurait pu le faire en une requête dans la base User 
            # mais d'un point de vue métier ça n'a pas le même sens
            apprentice = Apprentice.objects.filter(pk=apprenticeID).values('id','first_name', 'last_name', 'email').first()
            mentor = Mentor.objects.filter(pk=mentorID).values('id','first_name', 'last_name', 'email').first()
            tutor = Tutor.objects.filter(pk=tutorID).values('id', 'first_name', 'last_name', 'email').first()
            
            # fabriaction d'un json object equipe tutorale contenant réellement les infos
            context = {
                'apprentice': apprentice,       
                'mentor': mentor,
                'tutor': tutor
            }
            
            # ajout de l'équipe tutorale récupérée ou autre équipe tutorale
            response.append(context)
        return response