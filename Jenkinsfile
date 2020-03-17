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
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull postgres:11 &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run postgres --image postgres:11 -it -- sh -c 'exec psql -U postgres -tc "SELECT 1 FROM dataretrieval_db" | grep -q 1 || psql -U postgres -c "CREATE DATABASE dataretrieval_db"'
				"
            '''    
            }
        } 
	   
	   stage('Adding MYSQL Call') {
            steps {
            sh '''
				chmod 400 id_rsa
				ssh -o StrictHostKeyChecking=no -i id_rsa ubuntu@149.165.169.178 uptime
				ssh -i id_rsa ubuntu@149.165.169.178 "sudo apt install gnupg2 pass -y && 
				sudo docker login --username=devengers --password=DEVENGERS@2019 &&
				sudo docker pull mysql:8 &&
				sudo apt-get upgrade -y &&
				sudo apt-get install -y kubectl &&
				sudo kubectl run mysql --image  mysql:8"
            '''    
            }
        } 
    }
}
