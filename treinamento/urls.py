from django.urls import path
from . import views

urlpatterns = [
    path('modulo-1/', views.modulo1, name='modulo1'),
    path('modulo-1/concluir/', views.concluir_modulo1, name='concluir_modulo1'),
    path('modulo-2/', views.modulo2, name='modulo2'),
    path('modulo-2/salvar/', views.salvar_modulo2, name='salvar_modulo2'),
    path('modulo-3/', views.modulo3, name='modulo3'),
    path('modulo-3/salvar/', views.salvar_modulo3, name='salvar_modulo3'),
    path('conclusao/', views.conclusao, name='conclusao'),
    
]