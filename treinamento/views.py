from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import JsonResponse
import json
from .models import UserProgress


@login_required
def modulo1(request):
    return render(request, 'treinamento/modulo1.html')


@login_required
def modulo2(request):
    progress, created = UserProgress.objects.get_or_create(user=request.user)

    if not progress.modulo1_concluido:
        return redirect('dashboard')

    return render(request, 'treinamento/modulo2.html')


@login_required
def modulo3(request):
    progress, created = UserProgress.objects.get_or_create(user=request.user)

    if not progress.modulo2_concluido:
        return redirect('dashboard')

    return render(request, 'treinamento/modulo3.html')

@login_required
def conclusao(request):
    progress, created = UserProgress.objects.get_or_create(user=request.user)

    return render(request, 'treinamento/conclusao.html', {
        'progress': progress,
    })

@login_required
def concluir_modulo1(request):
    progress, created = UserProgress.objects.get_or_create(user=request.user)

    progress.modulo1_concluido = True
    progress.total_score = 100
    progress.save()

    return redirect('modulo2')

@login_required
def salvar_modulo2(request):
    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    data = json.loads(request.body)

    pontos = int(data.get('pontos', 0))
    total = int(data.get('total', 15))
    percentual = round((pontos / total) * 100) if total > 0 else 0
    aprovado = percentual >= 70

    progress, created = UserProgress.objects.get_or_create(user=request.user)

    progress.modulo2_score = pontos
    progress.modulo2_total = total

    if aprovado:
        progress.modulo2_concluido = True
        progress.total_score = 200

    progress.save()

    return JsonResponse({
        'aprovado': aprovado,
        'percentual': percentual,
        'pontos': pontos,
        'total': total,
    })

@login_required
def salvar_modulo3(request):
    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    data = json.loads(request.body)

    pontos_risco = int(data.get('pontos_risco', 0))
    risco = data.get('risco', '')

    progress, created = UserProgress.objects.get_or_create(user=request.user)

    progress.modulo3_concluido = True
    progress.modulo3_risco = risco
    progress.modulo3_pontos_risco = pontos_risco
    progress.total_score = 300
    progress.save()

    return JsonResponse({
        'salvo': True,
        'risco': risco,
        'pontos_risco': pontos_risco,
    })