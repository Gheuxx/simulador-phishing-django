"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from core import views as core_views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', core_views.home, name='home'),
    path('dashboard/', core_views.dashboard, name='dashboard'),
    path('dashboard/usuario/<int:progress_id>/', core_views.detalhe_usuario, name='detalhe_usuario'),
    path('dashboard/resetar/<int:progress_id>/', core_views.resetar_progresso_usuario, name='resetar_progresso_usuario'),
    path('dashboard/exportar/csv/', core_views.exportar_csv, name='exportar_csv'),
    path('dashboard/exportar/pdf/', core_views.exportar_pdf, name='exportar_pdf'),
    
    path('accounts/', include('accounts.urls')),
    path('treinamento/', include('treinamento.urls')),
]