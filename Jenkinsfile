pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'weather-dashboard'
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_HUB_CREDS = 'dockerhub-credentials' // Configure these in Jenkins credentials
        DOCKER_HUB_REPO = 'your-dockerhub-username/weather-dashboard' // Update this
        KUBECONFIG = credentials('kubeconfig') // Configure in Jenkins credentials
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Create and activate virtual environment
                    bat '''
                        python -m venv venv
                        call venv\\Scripts\\activate.bat
                        pip install -r requirements.txt
                    '''
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    bat '''
                        call venv\\Scripts\\activate.bat
                        pip install pytest
                        pytest
                    '''
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    // Tag as latest too
                    bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        // Login to Docker Hub
                        bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin"
                        
                        // Tag with Docker Hub repo
                        bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                        bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_HUB_REPO}:latest"
                        
                        // Push both tags
                        bat "docker push ${DOCKER_HUB_REPO}:${DOCKER_TAG}"
                        bat "docker push ${DOCKER_HUB_REPO}:latest"
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                        // Update the deployment image
                        bat """
                            kubectl --kubeconfig=%KUBECONFIG% set image deployment/weather-dashboard web=${DOCKER_HUB_REPO}:${DOCKER_TAG}
                            kubectl --kubeconfig=%KUBECONFIG% rollout status deployment/weather-dashboard
                        """
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images
            script {
                bat "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest ${DOCKER_HUB_REPO}:${DOCKER_TAG} ${DOCKER_HUB_REPO}:latest || true"
            }
            
            // Deactivate virtual environment
            bat '''
                call venv\\Scripts\\deactivate.bat
                rmdir /s /q venv
            '''
        }
        
        success {
            echo 'Pipeline completed successfully!'
        }
        
        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
    }
}