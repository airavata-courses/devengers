pipeline {
    agent any
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
                sh 'npm install'
            }
        }
        stage('Testing NodeJS') {
            steps {
                sh 'npm test'
            }
        }
    }
}
