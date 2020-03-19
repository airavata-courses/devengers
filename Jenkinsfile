pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages {
	   
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
		sudo kubectl apply -f postgres-storage.yaml &&
		sudo kubectl apply -f postgres-deployment.yaml && sudo kubectl apply -f postgres-service.yaml"
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
		sudo apt install snapd &&
		rm -rf devengers &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers &&
		git checkout develop_new &&
		cd mongodb &&
		sudo snap install kompose &&
		kubectl apply -f mongodata-persistentvolumeclaim.yaml &&
		kubectl apply -f mongodb-deployment.yaml --validate=false"
		'''
           }
       }
    }
}
