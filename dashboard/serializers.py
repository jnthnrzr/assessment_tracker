from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Assessment, Choice, Question, UserAssessment


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'choices']


class AssessmentSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Assessment
        fields = ['id', 'title', 'questions']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']


class UserAssessmentSerializer(serializers.ModelSerializer):
    """Serializer to handle UserAssessment"""
    # user = UserSerializer(many=False, read_only=True)
    # assessment = AssessmentSerializer(many=False, read_only=True)

    class Meta:
        model = UserAssessment
        fields = ['id', 'user', 'assessment', 'score']


class BestScoreSerializer(serializers.ModelSerializer):
    assessment = serializers.IntegerField(read_only=True)
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = UserAssessment
        fields = '__all__'
