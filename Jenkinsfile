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
                 sh 'pip install -r dataanalysis/requirements.txt'
                  }
            }
        }  
        stage('Testing DataAnalysis Service') {
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
                 sh 'pip install -r datamodelling/requirements.txt'
                  }
            }
        }
        
        stage('Testing DataModelling Service') {
            steps {
                dir('datamodelling/') {
                       checkout scm
                sh 'python datamodelling/test_modelling.py'
                }    
            }   
        }
            
        stage('build Python Dependencies and runtest for DataRetrievalService') {
            steps {
                   dir('dataretrieval/') {
                       checkout scm
                 sh 'pip install -r dataretrieval/requirements.txt'
                  }
            }
        }
        stage('Testing DataRetrieval Service') {
            steps {
                dir('dataretrieval/') {
                       checkout scm
                sh 'python dataretrieval/test_dataretrieval.py'
                }    
            }   
        } 
        stage('Building Docker image') {
            steps {
                  checkout scm
            sh '''
                sudo apt --assume-yes install docker.io
                sudo systemctl start docker
                sudo systemctl enable docker   
                python -m pip uninstall -y urllib3
				python -m pip install urllib3==1.22
                sudo docker-compose up --build
            '''    
            }
        }
        stage('Docker hub Push Image') {
            steps {
                  checkout scm
            sh '''
                sudo docker login --username=devengers --password=DEVENGERS@2019
                sudo docker-compose push
            '''    
            }
        }
    }
}
