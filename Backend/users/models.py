from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


# This code defines a custom user model and manager for a Django application.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None , **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
       extra_fields.setdefault('is_staff', True)
       extra_fields.setdefault('is_superuser', True)
       
       return self.create_user(email, password, **extra_fields)
        
        
class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

