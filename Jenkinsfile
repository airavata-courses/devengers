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
		sudo kubectl run rabbitmq --image rabbitmq:management &&
		sudo kubectl apply -f rabbit-mqconfig.yaml"
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
		kubectl apply -f postgres-configmap.yaml && kubectl apply -f postgres-storage.yaml &&
		kubectl apply -f postgres-deployment.yaml &&
		kubectl apply -f postgres-service.yaml"
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
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo docker pull devengers/um_api &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		sudo kubectl run um-api --image=devengers/um_api --port=8080"
            '''    
            }
        }

        stage('UI Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo docker pull devengers/ui &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		sudo kubectl run ui --image=devengers/ui --port=3000"
            '''    
            }
        }
        stage('SessionService --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo docker pull devengers/sessionservice &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		sudo kubectl run sessionservice --image=devengers/sessionservice --port=8300"
            '''    
            }
        }
        stage('Dataretrieval Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo docker pull devengers/dataretrieval &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		sudo kubectl run dataretrieval --image=devengers/dataretrieval"
            '''    
            }
        }
        stage('DataModelling Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo docker pull devengers/datamodel &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		sudo kubectl run datamodel --image=devengers/datamodel"
            '''    
            }
        }
        stage('DataAnalysis Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo docker pull devengers/dataanalysis &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		sudo kubectl run dataanalysis --image=devengers/dataanalysis"
            '''    
            }
        }
    }
}
