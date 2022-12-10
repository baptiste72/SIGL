from django.dispatch import receiver
from django.urls import reverse
from django.core.mail import send_mail
from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(
    # pylint: disable unused-argument
    sender,
    instance,
    reset_password_token,
    *args,
    **kwargs
):

    email_plaintext_message = "{}?token={}".format(
        reverse("password_reset:reset-password-request"), reset_password_token.key
    )

    send_mail(
        # title:
        "[Projet SIGL] Demande de réinitialisation de mot de passe",
        # message:
        email_plaintext_message,
        # from:
        "TODO:email_a_remplacer",
        # to:
        [reset_password_token.user.email],
    )
