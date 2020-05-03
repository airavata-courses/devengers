pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages{
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

        stage('Docker image Build') {
              steps {
                    checkout scm
              sh '''
                  sudo apt --assume-yes install docker.io
                  sudo systemctl start docker
                  sudo systemctl enable docker
                  python -m pip uninstall -y urllib3
  		          python -m pip install urllib3==1.22
                  sudo docker-compose build
              '''
              }
          }

          stage('Docker hub Push Image') {
              steps {
                    checkout scm
              sh '''
	      	  sudo apt install gnupg2 pass -y
                  sudo docker login --username=devengers --password=DEVENGERS@2019
                  sudo docker-compose push
              '''
              }
          }
	    stage('RabbitMQ Service -- on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout IstioPart3 && cd rabbitmq &&
		sudo kubectl apply -f rabbit-mqconfig.yaml"
            '''
            }
        }
		stage('SQL Service -- on Kubernetes Master') {
           steps {
           sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		rm -rf devengers &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers &&
		git checkout IstioPart3 &&
		cd mysql &&
        sudo kubectl delete --ignore-not-found=true -f mysql-deployment.yaml &&
        sudo kubectl delete --ignore-not-found=true pvc mysql-pv-claim &&
        sudo kubectl delete --ignore-not-found=true pv mysql-pv-volume &&
        sudo kubectl apply -f mysql-pv.yaml &&
		sudo kubectl apply -f mysql-deployment.yaml"
		'''
           }
       } 
	   stage('PostGres Service -- on Kubernetes Master') {
            steps {
             sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get upgrade -y &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout IstioPart3 && cd postgresql &&
		sudo kubectl delete --ignore-not-found=true -f postgres-deployment.yaml &&
        sudo kubectl delete --ignore-not-found=true pvc postgres-pv-claim &&
        sudo kubectl delete --ignore-not-found=true pv postgres-pv-volume &&
		sudo kubectl apply -f postgres-storage.yaml &&
		sudo kubectl apply -f postgres-deployment.yaml &&
        sudo kubectl delete --ignore-not-found=true -f postgres-service.yaml &&
        sudo kubectl apply -f postgres-service.yaml"
            '''    
            }
        }
		stage('User Management Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout IstioPart3 && cd Usermanagement_API_Gateway &&
		sudo kubectl delete --ignore-not-found=true -f um-apiDeployment.yaml &&
        sudo kubectl apply -f um-apiDeployment.yaml --validate=false"
            '''
            }
        }
		stage('UI Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout IstioPart3 && cd Frontend &&
		sudo kubectl delete --ignore-not-found=true -f uiDeployment.yaml &&
		sudo kubectl apply -f uiDeployment.yaml --validate=false"
            '''
            }
        }
        stage('SessionService --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout IstioPart3 && cd db-service &&
		sudo kubectl delete --ignore-not-found=true -f dbDeployment.yaml &&
		sudo kubectl apply -f dbDeployment.yaml --validate=false"
            '''
            }
        }
        stage('Dataretrieval Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout IstioPart3 && cd dataretrieval &&
		sudo kubectl delete --ignore-not-found=true -f dataretrievalDeployment.yaml &&
		sudo kubectl apply -f dataretrievalDeployment.yaml --validate=false"
            '''
            }
        }
        stage('DataModelling Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout IstioPart3 && cd datamodelling &&
		sudo kubectl delete --ignore-not-found=true -f datamodellingDeployment.yaml &&
		sudo kubectl apply -f datamodellingDeployment.yaml --validate=false"
            '''
            }
        }
		
        stage('DataAnalysis Service --on Kubernetes Master') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.171.75 uptime
		ssh -i id_rsa ubuntu@149.165.171.75 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get update &&
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout IstioPart3 && cd dataanalysis &&
		sudo kubectl delete --ignore-not-found=true -f dataanalysisDeployment.yaml &&
		sudo kubectl apply -f dataanalysisDeployment.yaml --validate=false"
            '''
            }
        }
    }
}
