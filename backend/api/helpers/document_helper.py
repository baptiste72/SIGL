from authentication.models import User
from base.models import YearGroup


# class permettant d'aider à la récupération des documents
class DocumentHelper():
    def getAllDocuments(serializers):
        # boucle permettant de récupérer la totalité des documents
        response = []
        for data in range(len(serializers.data)):
            # récupération des clées étrangères
            user_id = serializers.data[data]["user"]
            yearGroup_id = serializers.data[data]["yearGroup"]

            # récupération des données liées aux clées étrangères
            user = (
                User.objects.filter(pk=user_id)
                .values("id", "first_name", "last_name", "email")
                .first()
            )

            yearGroup = (
                YearGroup.objects.filter(pk=yearGroup_id)
                .values("id", "worded")
                .first()
            )

            # fabrication d'un json object document contenant réellement les infos
            context = {
                "id": serializers.data[data]["id"],
                "name": serializers.data[data]["name"],
                "file_name": serializers.data[data]["file_name"],
                "user": user,
                "yearGroup": yearGroup
            }

            # ajout du document récupéré à la liste de documents
            response.append(context)
        return response
