# Travelworld3



# DevOps Project: Travel Website Deployment

## 1. Project Overview
This project demonstrates end-to-end deployment of a travel website using modern DevOps tools including Git, Ansible, Docker, Jenkins, Kubernetes, and AWS (EC2 & EKS). The Cluster objects like Nodes, Pods and Cluster usage of CPU is also demonstrated using Grafana and Prometheus.

## 2. GitHub Repository Structure
.
├── CODEOWNER
├── Jenkinsfile
├── README.md
├── backend
│   ├── Dockerfile
│   └── api.php
├── frontend
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── script.js
│   └── style.css
└── k8s
    ├── back-deployment.yaml
    ├── back-service.yaml
    ├── db.sql
    ├── front-deployment.yaml
    ├── front-service.yaml
    ├── mysql-configmap.yaml
    ├── mysql-deployment.yaml
    └── mysql-service.yaml

This is a multi-branch project in which there are 3 branches: main, frontend (codes pushed by frontend developer) and backend (code pushed by backened developer). Collaboratores are added to approve the codes update and there approving authority is assigned so that PR for frontend and backend codes will be forwarded to the respective collaborator


---

## 3. Project Flow Architecture

Developer pushes code to GitHub ---> PR generation (manually) ---> PR forwarded and approved by collaborators ----> Branch merger to main (manually)---->Jenkins pulls files ----> Builds Docker images ---> Pushes images to DockerHub → Deployment by  EKS cluster → Website accessible to server via LoadBalancer

---

## 4. Tools & Technologies Used

- **Git** – Version control  

- **Ansible** – Configuration  
  Ansible is used to install Docker and Kubernetes tools (kubeadm, kubectl, kubelet) and prepare the system by disabling swap and   enabling Docker service.  

- **Docker** – Containerization  
  Frontend and backend applications are containerized using Docker. For frontend application nginx image and for backend application Apache server with PHP is used. Code is copied into `/var/www/html` and exposed on port 80.  

- **Jenkins** – Run CI/CD pipeline  

- **Kubernetes** – Container orchestration: Frontend and backend are deployed using Kubernetes Deployments.  
    - Frontend → LoadBalancer  
    - Backend → ClusterIP  

- **AWS EC2** – Virtual servers  

- **AWS EKS** – Managed Kubernetes cluster

- **Grafana & prometheus** - Observebility

---

## 5. Jenkins CI/CD Pipeline: Pipeline stages include:
  
1. SonarQube code analysis  
2. Docker image build  
3. Security scans using Trivy  
4. Push images to DockerHub  
5. Deploy to AWS EKS cluster    

---

## 6. Screenshots

- Website Output
- ![Website Front Page](screenshots/Exploreworld_Page1.jpg)
- 
- ![Website Second PageC](screenshots/Exploreworld_Page2_Destinations.jpg)
- 
- ![Website Third page](screenshots/Exploreworld_India.jpg)
- 
  Grafana Outputs:

- ![Grafana Cluster](screenshots/Grafana_Cluster_Dash.jpg)
  
- ![Grafana Nodes](screenshots/Grafana_Node_Dash.jpg)

- ![Grafana Pods](screenshots/Grafana_Pods_Dash.jpg)

- EC2 Output
  ![Kubectl output](screenshots/Nods_Pods_Svc.jpg)
  

---

### 7.Challenges and Solutions

# 1. SonarQube Analysis Issue
**Error:** Failed to query server version: HTTP connect timed out  

**Solution:**  
Manage Jenkins → System → SonarQube Installation → Update URL  

Since EC2 public IP changes (no Elastic IP), update URL: http://<public-ip>:9000

# 2. Trivy Not Found
**Error:** trivy: not found  

**Solution:**  
Installed Trivy using official documentation: https://trivy.dev/  

# 3. Kubectl Configuration Issue
**Error:**  
The connection to the server 127.0.0.1:34897 was refused  

**Reason:**  
kubectl was not connected to EKS cluster (missing kubeconfig)

**Solution:** command: aws eks --region ap-south-1 update-kubeconfig --name ekscluster
Then verify: "kubectl get pods" & "kubectl get svc"


---

## 8. Conclusion

This project demonstrates a complete DevOps lifecycle including CI/CD, containerization, orchestration, and deployment on AWS cloud.

## 9. GitHub Repository:   https://github.com/Qazaidi123/ExploreWorldFinal
