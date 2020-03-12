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
                       sh 'npm install'
                }
                
            }
        }
        stage('Testing NodeJS') {
            steps {
                 dir('Usermanagement_API_Gateway/Backend/') {
                       checkout scm
                       sh 'npm test'
                 }
            }
        }  
        stage('build Python Dependencies and runtest for DataAnalysisService') {
            steps {
                   dir('dataanalysis/') {
                       checkout scm
                 sh 'pip install -r requirements.txt'
                  }
            }
            steps {
                dir('dataanalysis/') {
                       checkout scm
                sh 'python test_analysis.py'
                }    
            }   
        }
         
        stage('build Python Dependencies and runtest for DataModellingService') {
            steps {
                   dir('datamodelling/') {
                       checkout scm
                 sh 'pip install -r requirements.txt'
                  }
            }
            steps {
                dir('datamodelling/') {
                       checkout scm
                sh 'python test_modelling.py'
                }    
            }   
        }
            
        stage('build Python Dependencies and runtest for DataRetrievalService') {
            steps {
                   dir('dataretrieval/') {
                       checkout scm
                 sh 'pip install -r requirements.txt'
                  }
            }
            steps {
                dir('dataretrieval/') {
                       checkout scm
                sh 'python test_dataretrieval.py'
                }    
            }   
        }           
    }
}
