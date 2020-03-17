pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages {
	   stage('Adding PostGres Call') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl && git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd postgresql &&
		kubectl create -f postgres-configmap.yaml && kubectl create -f postgres-storage.yaml &&
		kubectl create -f postgres-deployment.yaml && kubectl create -f postgres-service.yaml"
		'''    
            }
	   }
    }
}
