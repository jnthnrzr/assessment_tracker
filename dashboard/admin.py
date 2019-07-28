from django.contrib import admin
from .models import Assessment, Choice, Question


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 1


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ['assessment', 'text']}),
    )
    inlines = (ChoiceInline, )


admin.site.register(Assessment)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
