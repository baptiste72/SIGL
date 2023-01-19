from base.models import Mentor, Apprentice, Tutor

# class permettant d'aider à la récupération des équipes tutorales
class TutorTeamHelper:
    def getAllTutorTeams(serializers):
        # boucle permettant de récupérer la totalité des équipes tutorales
        response = []
        for data in range(len(serializers.data)):
            # récupération des clées étrangères
            tutor_team_id = serializers.data[data]["id"]
            apprentice_id = serializers.data[data]["apprentice"]
            mentor_id = serializers.data[data]["mentor"]
            tutor_id = serializers.data[data]["tutor"]

            # récupération des données liées aux clées étrangères
            # on aurait pu le faire en une requête dans la base User
            # mais d'un point de vue métier ça n'a pas le même sens
            apprentice = (
                Apprentice.objects.filter(pk=apprentice_id)
                .values("id", "first_name", "last_name", "email")
                .first()
            )
            mentor = (
                Mentor.objects.filter(pk=mentor_id)
                .values("id", "first_name", "last_name", "email")
                .first()
            )
            tutor = (
                Tutor.objects.filter(pk=tutor_id)
                .values("id", "first_name", "last_name", "email")
                .first()
            )

            # fabriaction d'un json object equipe tutorale contenant réellement les infos
            context = {
                "id": tutor_team_id,
                "apprentice": apprentice,
                "mentor": mentor,
                "tutor": tutor,
            }

            # ajout de l'équipe tutorale récupérée à la liste d'équipes tutorales
            response.append(context)
        return response
