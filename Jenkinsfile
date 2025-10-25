pipeline {
    agent any

    environment {
        IMAGE_NAME = "mohamadfikriisfahani/simple-app"
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
                bat 'echo Mulai build aplikasi'
            }
        }
        stage('Unit Test') {
            steps {
                bat 'pip install -r requirements.txt'
                bat 'pytest test_app.py -v'
            }
        }
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% .'
                bat 'docker tag %IMAGE_NAME%:%BUILD_NUMBER% %IMAGE_NAME%:latest'
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${REGISTRY_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat 'docker push %IMAGE_NAME%:%BUILD_NUMBER%'
                    bat 'docker push %IMAGE_NAME%:latest'
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
