@echo off
echo === Scraper Alcainca AC - zerozero.pt ===
echo.

cd /d "%~dp0.."

echo A descarregar resultados do zerozero.pt...
node scripts/scrape-jogos.mjs
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Scraper falhou
    pause
    exit /b 1
)

echo.
echo A verificar alteracoes...
git diff --quiet src/data/jogos.json 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Sem alteracoes nos resultados.
    pause
    exit /b 0
)

echo Novos resultados encontrados! A publicar...
git add src/data/jogos.json
git commit -m "chore: atualizar resultados zerozero.pt"
git push origin master

echo.
echo Resultados atualizados com sucesso!
pause
