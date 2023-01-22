from authentication.models import User
from base.models import YearGroup


# class permettant d'aider à la récupération des livrables
class EvaluationHelper():
    def getAllEvaluations(serializers):
        # boucle permettant de récupérer la totalité des livrables
        response = []
        for data in range(len(serializers.data)):
            # récupération des clées étrangères
            user_id = serializers.data[data]["user"]
            owner_id = serializers.data[data]["owner"]
            yearGroup_id = serializers.data[data]["yearGroup"]

            # récupération des données liées aux clées étrangères
            user = (
                User.objects.filter(pk=user_id)
                .values("id", "first_name", "last_name", "email")
                .first()
            )
            
            owner = (
                User.objects.filter(pk=owner_id)
                .values("id", "first_name", "last_name", "email")
                .first()
            )

            yearGroup = (
                YearGroup.objects.filter(pk=yearGroup_id)
                .values("id", "worded")
                .first()
            )

            # fabrication d'un json object livrable contenant réellement les infos
            context = {
                "id":serializers.data[data]["id"],
                "file_name":serializers.data[data]["file_name"],
                "modification_date":serializers.data[data]["modification_date"],
                "status":serializers.data[data]["status"],
                "type":serializers.data[data]["type"],
                "note": serializers.data[data]["note"],
                "user": user,
                "owner": owner,
                "yearGroup": yearGroup
            }

            # ajout du livrable récupéré à la liste de livrables
            response.append(context)
        return response
