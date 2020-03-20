pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages{
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
