# Generated by Django 4.1.2 on 2022-10-07 19:05

import base.semester
from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('first_hour', models.CharField(max_length=100)),
                ('last_hour', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1500)),
                ('guest', models.CharField(max_length=255)),
                ('semester', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Mentor',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('authentication.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='TeacherInCharge',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('authentication.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Trainee',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('authentication.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='YearGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('worded', models.CharField(max_length=200)),
                ('semester', models.CharField(choices=[(base.semester.Semester['SEMESTRE_5'], 1), (base.semester.Semester['SEMESTRE_6'], 2), (base.semester.Semester['SEMESTRE_7'], 3), (base.semester.Semester['SEMESTRE_8'], 4), (base.semester.Semester['SEMESTRE_9'], 5), (base.semester.Semester['SEMESTRE_10'], 6)], max_length=10)),
                ('trainee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='yearGroup', to='base.trainee')),
            ],
        ),
        migrations.CreateModel(
            name='FormationCenter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('worded', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=500)),
                ('teacherInCharge', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='formationCenter', to='base.teacherincharge')),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('worded', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=500)),
                ('mentor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='company', to='base.mentor')),
            ],
        ),
    ]
