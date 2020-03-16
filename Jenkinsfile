pipeline {
   agent any
   tools {nodejs "InstanceNodeJS"}
   stages {
       
	stage('Adding RabbitMQ Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo apt-get update &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run rabbitmq --image rabbitmq:management &&
				sudo kubectl expose deployment rabbitmq --port=5672"
            '''    
            }
        }   
	
	stage('Adding PostGres Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				kubectl create -f postgrespod.yaml &&
				sudo kubectl expose pod postgres --name postgres \
  				--port 5432 --protocol TCP"
            '''    
            }
        }   
    }
}
