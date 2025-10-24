Minikube deployment instructions for Weather Dashboard

1. Start minikube (if not running):

```powershell
minikube start
```

2. Build the image locally and load it into minikube so the cluster can use it. From the repo root:

```powershell
docker build -t weather-dashboard:latest .
minikube image load weather-dashboard:latest
```

3. Update the secret with your OpenWeatherMap API key. Edit `k8s/secret.yaml` and replace the placeholder or create the secret with kubectl:

```powershell
# set secret using literal (safer to keep out of git)
kubectl create secret generic weather-secret --from-literal=OPENWEATHER_API_KEY=your_api_key_here --dry-run=client -o yaml | kubectl apply -f -
```

4. Apply manifests:

```powershell
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

5. Access the service. The service is exposed as NodePort 30080. You can get the minikube IP and open in a browser:

```powershell
$ip = minikube ip
Write-Output "http://$ip:30080"
```

6. To remove the app:

```powershell
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/deployment.yaml
kubectl delete -f k8s/secret.yaml
```

Notes
- This uses `minikube image load` so you don't need to push to Docker Hub. If you prefer pulling from Docker Hub, update the image in `deployment.yaml` to `<username>/weather-dashboard:tag` and ensure the image is pushed.