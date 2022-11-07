# Generated by Django 4.1.2 on 2022-10-08 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_deadline_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deadline',
            name='date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='interview',
            name='date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='interview',
            name='description',
            field=models.CharField(blank=True, max_length=1500, null=True),
        ),
    ]
