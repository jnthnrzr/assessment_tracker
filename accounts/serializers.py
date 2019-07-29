from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

from dashboard.models import Assessment
from .models import UserAssessment


class UserSerializer(serializers.ModelSerializer):
    """User Serializer"""
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    """Register Serializer"""
    password = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        username = validated_data['email']
        user = User.objects.create_user(
            username=username,
            email=validated_data['email'],
            password=validated_data['password']
        )
        assessments = Assessment.objects.all()
        for assessment in assessments:
            UserAssessment.objects.create(user=user,
                                          assessment=assessment,)
        return user


class LoginSerializer(serializers.Serializer):
    """Login Serializer"""
    email = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, data):
        username = data['email']
        user = authenticate(username=username, **data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class UserAssessmentSerializer(serializers.ModelSerializer):
    """Serializer to handle UserAssessment"""
    class Meta:
        model = UserAssessment
        fields = '__all__'
