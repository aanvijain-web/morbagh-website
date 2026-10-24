@echo off
title Morbagh Website Preview
echo Starting Morbagh Website Local Server...
powershell -ExecutionPolicy Bypass -File "%~dp0scratch\server.ps1" -Port 8080
pause
