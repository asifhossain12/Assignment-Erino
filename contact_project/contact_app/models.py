from django.db import models

# Create your models here.
class Contact(models.Model):
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100)     
    email = models.EmailField(unique=True) 
    phone = models.CharField(max_length=16, unique=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)  
    job_title = models.CharField(max_length=100, blank=True, null=True)  



    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"