pipeline {
  agent any

  environment {
    SONAR_HOME = tool "Sonar"
    FRONTEND_IMAGE = "qazaidi123/travel3-front"
    BACKEND_IMAGE = "qazaidi123/travel3-back"
    IMAGE_TAG = "${BUILD_NUMBER}"
    DOCKER_CREDS = credentials('dockerhub-creds')
   
     
  }
  stages {
                
    stage("SonarQube Analysis") {
      steps {
        withSonarQubeEnv("Sonar") {
          sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=NETLIPROJ -Dsonar.projectKey=NETLIPROJ"
        }
      }

    }

    stage ("Build") {
      steps {
        sh " docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./frontend "
        sh " docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./backend "
      }
    }

    stage ("image check") {
      steps {
        sh " trivy image --severity CRITICAL --exit-code 0 $FRONTEND_IMAGE:$IMAGE_TAG "
        sh " trivy image --severity CRITICAL --exit-code 0 $BACKEND_IMAGE:$IMAGE_TAG "
      }
    }

    stage ("Image push to DockerHub") {
      steps {
        sh " echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin "
        sh " docker push $FRONTEND_IMAGE:$IMAGE_TAG "
        sh " docker push $BACKEND_IMAGE:$IMAGE_TAG "
      }
    }
    stage ("EKS cluster deploy") {
      steps {
        withAWS(credentials: 'AWS-CREDENTIALS') {
        sh " aws eks --region ap-south-1 update-kubeconfig --name ekscluster "
        sh " kubectl get pods "
        sh " kubectl apply -f k8s/ "

        sh "kubectl set image deployment/frontend-deployment frontend-container=$FRONTEND_IMAGE:$IMAGE_TAG"
        sh "kubectl set image deployment/backend-deployment backend-container=$BACKEND_IMAGE:$IMAGE_TAG"

        sh " kubectl rollout status deployment/frontend-deployment "
        sh " kubectl rollout status deployment/backend-deployment "
        sh " kubectl rollout restart deployment frontend-deployment "
        sh " kubectl rollout restart deployment backend-deployment "
        
        }
      }
    }
  }
}
