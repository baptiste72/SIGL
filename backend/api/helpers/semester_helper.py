from base.models import Semester


# class permettant d'aider à la récupération des équipes tutorales
class SemesterHelper:
    def getSemestersNames(serializers):
        # boucle permettant de récupérer la totalité des équipes tutorales
        response = []
        for data in range(len(serializers.data)):
            semester_id = serializers.data[data]["semester"]

            semester = Semester.objects.get(pk=semester_id)

            context = {
                "id": serializers.data[data]["id"],
                "semester": semester.name,
                "title": serializers.data[data]["title"],
            }

            response.append(context)
        return response
