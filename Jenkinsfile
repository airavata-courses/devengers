pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages {
	stage('Adding MYSQL Call') {
		steps {
			sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo apt-get upgrade -y &&
				cd devengers/mysql && kubectl apply -f config-map.yaml && kubectl apply -f pod.yaml 
				&& kubectl apply -f service.yaml && kubectl apply -f client-pod.yaml"
            '''    
            }
        } 
    }
}
