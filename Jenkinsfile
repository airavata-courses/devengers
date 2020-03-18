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
	   
	   stage('RabbitMQ Service -- on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd rabbitmq &&
		sudo kubectl apply -f rabbit-mqconfig.yaml "
            '''    
            }
        }
	   
	   stage('PostGres Service -- on Kubernetes Master') {
            steps {
             sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get upgrade -y &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd postgresql &&
		kubectl apply -f postgres-config.yaml --validate=false && kubectl apply -f postgres-services.yaml &&
		kubectl apply -f postgres-stateful.yaml"
            '''    
            }
        }
	   
	   
	   stage('SQL Service -- on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		rm -rf devengers &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers &&
		git checkout develop_new &&
		cd mysql &&
		kubectl apply -f mysql-deployment.yaml &&
		kubectl apply -f mysql-pv.yaml"
		'''
            }
        }
	  stage('MongoDB Service -- on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		rm -rf devengers &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers &&
		git checkout develop_new &&
		cd mongodb &&
		kubectl apply -f db-controller.yml &&
		kubectl apply -f db-service.yml"
		'''    
            }
        } 
	   stage('User Management Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd Usermanagement_API_Gateway &&
		sudo kubectl apply -f um-apiDeployment.yaml --validate=false"
            '''    
            }
        }

        stage('UI Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd Frontend &&
		sudo kubectl apply -f uiDeployment.yaml --validate=false"
            '''    
            }
        }
        stage('SessionService --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd db-service &&
		sudo kubectl apply -f dbDeployment.yaml --validate=false"
            '''    
            }
        }
        stage('Dataretrieval Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd dataretrieval &&
		sudo kubectl apply -f dataretrievalDeployment.yaml --validate=false"
            '''    
            }
        }
        stage('DataModelling Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd datamodelling &&
		sudo kubectl apply -f datamodellingDeployment.yaml --validate=false"
            '''    
            }
        }
        stage('DataAnalysis Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd dataanalysis &&
		sudo kubectl apply -f dataanalysisDeployment.yaml --validate=false"
            '''    
            }
        }
    }
}
