# Team Devengers
ADS Project Spring 2020: Team Devengers


Check our wiki page for [Installation Steps](https://github.com/airavata-courses/devengers/wiki/Installation-steps-for-all-the-services.). You can pull the code from develop_new branch.


Currently team is working on:

1. Dockerizing all microservices.
2. Developing test cases and automating the deployment process.

Wiki Page Link:
https://github.com/airavata-courses/devengers/wiki/Setting-Up-Instances,-Kubernetes-Cluster,-Jenkins

After following the above steps , you will have 4 Instances, Kubernetes-Cluster
consisting of 1 master and 2 slave created and a Jenkins CI/CD Pipeline setup.

If you are skipping the above steps: You could use our configuration-

1. Jenkins Instance IP : 149.165.168.197
2. Kubernetes Master IP : 149.165.169.178
3. Kubernetes Worker Node 1 IP: 149.165.169.133
4. Kubernetes Worker Node 2 IP: 149.165.169.83


To run the project by single command:

Put a dummy commit onto the master node.

Then, access the Jenkins URL: http://149.165.168.197:8090

Once Prompted with Login Screen use the following credentials:

Username: DevengersJenkins

Password: kaustubh

After login, you will see a build that was automatically triggered by your dummy
commit.

Once the build is successfull acesss the Application through

Application URL : http://149.165.169.178:32177 

For Session Data to be Visible please add Plugin : "moesif cors" in your browser. 
