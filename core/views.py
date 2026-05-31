from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.paginator import Paginator

from django.http import HttpResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import csv

from treinamento.models import UserProgress


def home(request):
    return render(request, 'core/home.html')


@login_required
def dashboard(request):
    if request.user.is_staff or request.user.is_superuser:
        todos_progresses = UserProgress.objects.select_related('user').filter(
            user__is_staff=False,
            user__is_superuser=False
        )

        progresses = list(todos_progresses)

        filtro = request.GET.get('filtro', 'todos')

        if filtro == 'nao_iniciados':
            progresses = [p for p in progresses if p.calcular_progresso() == 0]
        elif filtro == 'em_andamento':
            progresses = [p for p in progresses if 0 < p.calcular_progresso() < 100]
        elif filtro == 'concluidos':
            progresses = [p for p in progresses if p.calcular_progresso() == 100]
        elif filtro == 'baixo_risco':
            progresses = [p for p in progresses if p.modulo3_risco == 'Baixo risco']
        elif filtro == 'medio_risco':
            progresses = [p for p in progresses if p.modulo3_risco == 'Médio risco']
        elif filtro == 'alto_risco':
            progresses = [p for p in progresses if p.modulo3_risco == 'Alto risco']

        paginator = Paginator(progresses, 5)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        total_usuarios = todos_progresses.count()
        nao_iniciados = 0
        em_andamento = 0
        concluidos = 0

        baixo_risco = 0
        medio_risco = 0
        alto_risco = 0

        for progress in progresses:
            progresso = progress.calcular_progresso()

            if progresso == 0:
                nao_iniciados += 1
            elif progresso < 100:
                em_andamento += 1
            else:
                concluidos += 1

            if progress.modulo3_risco == 'Baixo risco':
                baixo_risco += 1
            elif progress.modulo3_risco == 'Médio risco':
                medio_risco += 1
            elif progress.modulo3_risco == 'Alto risco':
                alto_risco += 1

        taxa_conclusao = round((concluidos / total_usuarios) * 100) if total_usuarios > 0 else 0

        return render(request, 'core/dashboard_admin.html', {
            'progresses': page_obj,
            'page_obj': page_obj,
            'total_usuarios': total_usuarios,
            'nao_iniciados': nao_iniciados,
            'em_andamento': em_andamento,
            'concluidos': concluidos,
            'taxa_conclusao': taxa_conclusao,
            'baixo_risco': baixo_risco,
            'medio_risco': medio_risco,
            'alto_risco': alto_risco,
            'filtro_atual': filtro,
        })

    progress, created = UserProgress.objects.get_or_create(user=request.user)

    return render(request, 'core/dashboard_user.html', {
        'progress': progress,
    })


@login_required
def resetar_progresso_usuario(request, progress_id):
    if not request.user.is_staff and not request.user.is_superuser:
        return redirect('dashboard')

    progress = UserProgress.objects.get(id=progress_id)

    progress.modulo1_concluido = False
    progress.modulo2_concluido = False
    progress.modulo2_score = 0
    progress.modulo2_total = 15
    progress.modulo3_concluido = False
    progress.modulo3_risco = None
    progress.modulo3_pontos_risco = 0
    progress.total_score = 0
    progress.save()

    messages.success(request, f'Progresso de {progress.user.username} resetado com sucesso.')

    return redirect('dashboard')

@login_required
def detalhe_usuario(request, progress_id):
    if not request.user.is_staff and not request.user.is_superuser:
        return redirect('dashboard')

    progress = get_object_or_404(
        UserProgress.objects.select_related('user'),
        id=progress_id
    )

    modulo2_percentual = round(
        (progress.modulo2_score / progress.modulo2_total) * 100
    ) if progress.modulo2_total > 0 else 0

    return render(request, 'core/detalhe_usuario.html', {
        'progress': progress,
        'modulo2_percentual': modulo2_percentual,
    })

@login_required
def exportar_csv(request):
    if not request.user.is_staff and not request.user.is_superuser:
        return redirect('dashboard')

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="relatorio_usuarios.csv"'

    writer = csv.writer(response)
    writer.writerow([
        'Nome',
        'Usuario',
        'Progresso',
        'Pontuacao',
        'Modulo 1',
        'Modulo 2',
        'Modulo 2 Score',
        'Modulo 3',
        'Risco Modulo 3',
        'Status',
    ])

    progresses = UserProgress.objects.select_related('user').filter(
        user__is_staff=False,
        user__is_superuser=False
    )

    for progress in progresses:
        writer.writerow([
            f'{progress.user.first_name} {progress.user.last_name}',
            progress.user.username,
            f'{progress.calcular_progresso()}%',
            progress.total_score,
            'Concluido' if progress.modulo1_concluido else 'Pendente',
            'Concluido' if progress.modulo2_concluido else 'Pendente',
            f'{progress.modulo2_score}/{progress.modulo2_total}',
            'Concluido' if progress.modulo3_concluido else 'Pendente',
            progress.modulo3_risco or '-',
            progress.calcular_status(),
        ])

    return response


@login_required
def exportar_pdf(request):
    if not request.user.is_staff and not request.user.is_superuser:
        return redirect('dashboard')

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="relatorio_usuarios.pdf"'

    pdf = canvas.Canvas(response, pagesize=A4)
    largura, altura = A4

    y = altura - 50

    pdf.setFont('Helvetica-Bold', 16)
    pdf.drawString(50, y, 'Relatório de Usuários - Simulador de Phishing')

    y -= 35

    progresses = UserProgress.objects.select_related('user').filter(
        user__is_staff=False,
        user__is_superuser=False
    )

    pdf.setFont('Helvetica', 10)

    for progress in progresses:
        if y < 80:
            pdf.showPage()
            y = altura - 50
            pdf.setFont('Helvetica', 10)

        nome = f'{progress.user.first_name} {progress.user.last_name}'
        linha = (
            f'Nome: {nome} | '
            f'Usuário: {progress.user.username} | '
            f'Progresso: {progress.calcular_progresso()}% | '
            f'Pontuação: {progress.total_score} | '
            f'Status: {progress.calcular_status()}'
        )

        pdf.drawString(50, y, linha)
        y -= 20

        linha2 = (
            f'Módulo 2: {progress.modulo2_score}/{progress.modulo2_total} | '
            f'Risco Módulo 3: {progress.modulo3_risco or "-"}'
        )

        pdf.drawString(50, y, linha2)
        y -= 30

    pdf.save()

    return response