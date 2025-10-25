pipeline {
    agent any

    environment {
        PATH = 'C:\\laragon\\bin\\python\\python-3.10;C:\\laragon\\bin\\python\\python-3.10\\Scripts;%PATH%'
        IMAGE_NAME = 'mohamadfikriisfahani/simple-app'
        REGISTRY_CREDENTIALS = '25'
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
                bat 'C:\\laragon\\bin\\python\\python-3.10\\Scripts\\pip.bat install -r requirements.txt'
                bat 'C:\\laragon\\bin\\python\\python-3.10\\python.exe -m pytest test_app.py -v'
            }
        }
        stage('Build Docker Image') {
            steps {
                bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe" build -t %IMAGE_NAME%:%BUILD_NUMBER% .'
                bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe" tag %IMAGE_NAME%:%BUILD_NUMBER% %IMAGE_NAME%:latest'
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
            echo 'Pipeline selesai'
        }
        success {
            echo '✅ Build dan Test berhasil! Image berhasil di-push ke Docker Hub'
        }
        failure {
            echo '❌ Pipeline gagal! Cek log untuk detail error'
        }
    }
}
