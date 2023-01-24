from django.core.mail import send_mail
from django.conf import settings


class MailHelper:
    def send_validation_mail(serializer, comment, email):
        validate_str = "validé" if serializer.data["app_is_validate"] else "refusé"
        send_mail(
            # title:
            "[Projet SIGL] Statut de validation de mission - "
            + serializer.data["app_first_name"]
            + " "
            + serializer.data["app_last_name"],
            # message:
            "Bonjour,\n\nLa mission de l'apprenti "
            + serializer.data["app_first_name"]
            + " "
            + serializer.data["app_last_name"]
            + " a été "
            + validate_str
            + ".\n\nCommentaire du coordinateur d'alternance :\n\n"
            + comment
            + "\n\nCordialement,\nL'équipe SIGL.",
            # from:
            settings.EMAIL_HOST_USER,
            # to:
            [email],
        )
