Write-Host "Launching NestJS server...."

Set-Location -Path $PSScriptRoot

npm install

Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run start" -NoNewWindow

Write-Host "NestJS server has been launched successfully!"
Start-Sleep -Seconds 10
Start-Process -FilePath "http://localhost:3000/api"
Read-Host -Prompt "Press Enter to close"
Write-Host "NestJS is closing..."
Start-Process -FilePath "cmd.exe" -ArgumentList "/c taskkill /F /IM node.exe" -NoNewWindow