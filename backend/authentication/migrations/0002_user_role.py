# Generated by Django 4.1.1 on 2022-11-18 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(default='UNKNOWN', max_length=255),
        ),
    ]