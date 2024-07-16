
from django.urls import path
from .import views

urlpatterns = [
    path("students/", views.StudentListCreate.as_view(), name="student_list"),
    # path("students/delete/<int:pk>/", views.StudentDetailView, name="delete-student"),
    path("students/<int:pk>/", views.StudentDetailView.as_view(), name="student_detail"),

]