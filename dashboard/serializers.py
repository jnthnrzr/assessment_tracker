from rest_framework import serializers

from .models import Assessment, Choice, Question, UserAssessment


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


class UserAssessmentSerializer(serializers.ModelSerializer):
    """Serializer to handle UserAssessment"""
    class Meta:
        model = UserAssessment
        fields = '__all__'
