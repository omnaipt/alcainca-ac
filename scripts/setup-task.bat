@echo off
echo === Configurar tarefa agendada - Scraper zerozero.pt ===
echo.
echo Isto vai criar uma tarefa no Agendador de Tarefas do Windows
echo que corre todas as tercas-feiras as 08:30.
echo.

schtasks /create /tn "AlcaincaAC-Scraper" /tr "\"%~dp0scrape-and-push.bat\"" /sc weekly /d TUE /st 08:30 /f

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Tarefa criada com sucesso!
    echo A tarefa "AlcaincaAC-Scraper" vai correr todas as tercas as 08:30.
    echo.
    echo Para remover: schtasks /delete /tn "AlcaincaAC-Scraper" /f
) else (
    echo.
    echo ERRO: Executa este script como Administrador.
)

pause
