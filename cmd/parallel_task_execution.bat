(
   start "task1" cmd /C "timeout /t 5 /nobreak > nul"
   start "task2" cmd /C "timeout /t 8 /nobreak > nul"
) | pause
