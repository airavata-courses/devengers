pipeline {
    agent any
     tools {nodejs "InstanceNodeJS"}
    stages {
        stage('Build Application') {
            steps {
                sh 'mvn -f db-service/pom.xml clean package'
            }
            post {
                success {
                    echo "Now Archiving the Artifacts...."
                    archiveArtifacts artifacts: '**/*.jar'
                }
            }
        }
        stage('Install dependencies for Node') {
            steps {
                dir('Usermanagement_API_Gateway/Backend/') {
                       checkout scm
                }
                sh 'npm install'
            }
        }
        stage('Testing NodeJS') {
            steps {
                 dir('Usermanagement_API_Gateway/Backend/') {
                       checkout scm
                 }
                sh 'npm test'
            }
        }
    }
}
