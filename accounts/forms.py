from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User


class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(
        label='Primeiro nome',
        max_length=150,
        widget=forms.TextInput(attrs={
            'placeholder': 'Digite seu primeiro nome'
        })
    )

    last_name = forms.CharField(
        label='Último nome',
        max_length=150,
        widget=forms.TextInput(attrs={
            'placeholder': 'Digite seu último nome'
        })
    )

    username = forms.CharField(
        label='Usuário',
        max_length=150,
        widget=forms.TextInput(attrs={
            'placeholder': 'Crie um nome de usuário'
        })
    )

    password1 = forms.CharField(
        label='Senha',
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Crie uma senha'
        })
    )

    password2 = forms.CharField(
        label='Confirmar senha',
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Confirme sua senha'
        })
    )

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'password1',
            'password2',
        ]


class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        label='Usuário',
        widget=forms.TextInput(attrs={
            'placeholder': 'Digite seu usuário'
        })
    )

    password = forms.CharField(
        label='Senha',
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Digite sua senha'
        })
    )