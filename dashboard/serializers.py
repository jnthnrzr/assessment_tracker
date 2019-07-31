from rest_framework import serializers

from .models import Assessment, Choice, Question, UserAssessment


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['text', 'choices']


class AssessmentSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Assessment
        fields = ['title', 'questions']


class UserAssessmentSerializer(serializers.ModelSerializer):
    """Serializer to handle UserAssessment"""
    class Meta:
        model = UserAssessment
        fields = '__all__'
