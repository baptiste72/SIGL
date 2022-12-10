from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token, *args, **kwargs):

    email_plaintext_message = (
        "Bonjour, suite à votre demande de réinitialisation de mot de passe, voici le token à insérer. Ce token sera valide lors des prochaines minutes.\n\nTOKEN = "
        + reset_password_token.key
        + "\n\nBonne continuation sur notre plateforme.\nL'équipe SIGL2"
    )

    send_mail(
        # title:
        "[Projet SIGL] Demande de réinitialisation de mot de passe",
        # message:
        email_plaintext_message,
        # from:
        settings.EMAIL_HOST_USER,
        # to:
        [reset_password_token.user.email],
    )
