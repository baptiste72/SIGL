from django.utils import timezone
from base.models import YearGroup
from base.utilities import Role


class ApprenticeService:
    def get_apprentice_from_apprentice_info(apprentice_info):
        # On détermine la promotion du futur apprenti
        apprentice_year_group = YearGroup.objects.filter(
            beginDate__year=timezone.now().year
        ).first()

        apprentice_email = (
            apprentice_info["app_first_name"]
            + "."
            + apprentice_info["app_last_name"]
            + "@reseau.eseo.fr"
        ).lower()

        # Dictionnaire de données
        return {
            "last_name": apprentice_info["app_last_name"],
            "first_name": apprentice_info["app_first_name"],
            "password": "Champ non vide",
            "email": apprentice_email,
            "role": Role.APPRENTICE.value,
            "yearGroup": apprentice_year_group.id,
        }
