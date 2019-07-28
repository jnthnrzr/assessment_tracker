from django.contrib import admin
from .models import Assessment, Choice, Question

admin.site.register(Assessment)
admin.site.register(Question)
admin.site.register(Choice)
