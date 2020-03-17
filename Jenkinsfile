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
		sudo apt-get install -y kubectl &&
		rm -rf devengers &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers &&
		git checkout develop_new
		cd mysql &&
		kubectl create -f config-map.yaml &&
		kubectl create -f pod.yaml &&
		kubectl create -f server.yaml &&
		kubectl create -f client-pod.yaml"
		'''    
            }
        }
    }
}
