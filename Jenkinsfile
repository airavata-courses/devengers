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
		kubectl delete deployment postgres &&
		kubectl delete configmap postgres-config &&
		kubectl delete persistentvolumeclaim postgres-pv-claim &&
		kubectl delete persistentvolume postgres-pv-volume &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers && git checkout develop_new && cd postgresql &&
		kubectl create -f postgres-configmap.yaml && kubectl create -f postgres-storage.yaml &&
		kubectl create -f postgres-deployment.yaml && kubectl create -f postgres-service.yaml"
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
		kubectl delete deployment,svc mysql &&
		kubectl delete pvc mysql-pv-claim &&
		kubectl delete pv mysql-pv-volume &&
		rm -rf devengers &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers &&
		git checkout develop_new &&
		cd mysql &&
		kubectl create -f mysql-deployment.yaml &&
		kubectl create -f mysql-pv.yaml"
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
		kubectl delete service mongo &&
		kubectl delete replicationcontroller --all &&
		rm -rf devengers &&
		git clone https://github.com/airavata-courses/devengers.git &&
		cd devengers &&
		git checkout develop_new &&
		cd mongodb &&
		kubectl create -f db-controller.yml &&
		kubectl create -f db-service.yml"
		'''    
            }
        }  
    }
}
