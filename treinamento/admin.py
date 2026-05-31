from django.contrib import admin
from .models import UserProgress


@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'modulo1_concluido',
        'modulo2_concluido',
        'modulo2_score',
        'modulo3_concluido',
        'modulo3_risco',
        'total_score',
        'atualizado_em',
    )

    search_fields = ('user__username', 'user__first_name', 'user__last_name')