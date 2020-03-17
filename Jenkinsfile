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
		rm -rf devengers &&
		sudo apt-get install -y kubectl &&
		kubectl delete service postgres &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd postgresql &&
		kubectl apply -f postgres-configmap.yaml && kubectl apply -f postgres-storage.yaml &&
		kubectl apply -f postgres-deployment.yaml &&
		kubectl expose deployment postgres --port=5432 --type=NodePort --name=postgres"
            '''    
            }
        }
	   
	   
	   stage('Adding SQL Call') {
            steps {
            sh '''
		chmod 400 id_rsa
		ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
		ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y &&
		sudo apt install git -y &&
		sudo docker login --username=devengers --password=DEVENGERS@2019 &&
		sudo apt-get upgrade -y &&
		sudo apt-get install -y kubectl &&
		kubectl delete service mysql &&
		rm -rf devengers &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers &&
		git checkout develop_new &&
		cd mysql &&
		kubectl apply -f mysql-deployment.yaml &&
		kubectl apply -f mysql-pv.yaml &&
		kubectl expose deployment mysql --port=3306 --type=NodePort --name=mysql"
		'''    
            }
        }
	  stage('Adding MongoDB Call') {
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
		kubectl expose deployment mongo --port=27017 --type=NodePort --target-port=27017 --name=mongo"
		'''    
            }
        }  
    }
}
