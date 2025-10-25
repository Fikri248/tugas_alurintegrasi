pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "mohamadfikriisfahani/simple-app"
        REGISTRY = "https://index.docker.io/v1/"
        REGISTRY_CREDENTIALS = "25"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'echo "Mulai build aplikasi"'
            }
        }
        
        stage('Unit Test') {
            steps {
                sh '''
                    echo "Menjalankan Unit Test dengan pytest..."
                    pip install -r requirements.txt
                    pytest test_app.py -v
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry(REGISTRY, REGISTRY_CREDENTIALS) {
                        def customImage = docker.image("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                        customImage.push()
                        customImage.push('latest')
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline selesai"
        }
        success {
            echo "✅ Build dan Test berhasil! Image berhasil di-push ke Docker Hub"
        }
        failure {
            echo "❌ Pipeline gagal! Cek log untuk detail error"
        }
    }
}
