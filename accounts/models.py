from django.db import models
from django.contrib.auth.models import User
from dashboard.models import Assessment


class UserAssessment(models.Model):
    user = models.ForeignKey(User, related_name='assessments',
                             on_delete=models.CASCADE, null=False,)
    assessment = models.ForeignKey(Assessment, related_name="users",
                                   on_delete=models.CASCADE, null=False,)
    score = models.IntegerField(default=0, null=True,)
