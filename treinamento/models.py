from django.db import models
from django.contrib.auth.models import User


class UserProgress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    modulo1_concluido = models.BooleanField(default=False)

    modulo2_concluido = models.BooleanField(default=False)
    modulo2_score = models.IntegerField(default=0)
    modulo2_total = models.IntegerField(default=15)

    modulo3_concluido = models.BooleanField(default=False)
    modulo3_risco = models.CharField(max_length=20, blank=True, null=True)
    modulo3_pontos_risco = models.IntegerField(default=0)

    total_score = models.IntegerField(default=0)

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def calcular_progresso(self):
        concluidos = 0

        if self.modulo1_concluido:
            concluidos += 1

        if self.modulo2_concluido:
            concluidos += 1

        if self.modulo3_concluido:
            concluidos += 1

        return round((concluidos / 3) * 100)

    def calcular_status(self):
        progresso = self.calcular_progresso()

        if progresso == 0:
            return 'Treinamento não iniciado'

        if progresso < 100:
            return 'Em andamento'

        return 'Treinamento concluído'

    def __str__(self):
        return f'Progresso de {self.user.username}'