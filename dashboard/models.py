from django.db import models


class Assessment(models.Model):
    title = models.CharField(max_length=140)

    def __str__(self):
        return self.title


class Question(models.Model):
    text = models.CharField(max_length=140)
    assessment = models.ForeignKey(Assessment,
                                   related_name='questions',
                                   on_delete=models.CASCADE,
                                   null=False)

    def __str__(self):
        return f'{self.assessment}: {self.text}'


class Choice(models.Model):
    text = models.CharField(max_length=40)
    question = models.ForeignKey(Question,
                                 related_name='choices',
                                 on_delete=models.CASCADE,
                                 null=False)
    correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text
