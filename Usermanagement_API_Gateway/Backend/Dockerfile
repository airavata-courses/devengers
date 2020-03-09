FROM node:latest
RUN mkdir Backendend
COPY . /Backendend
RUN cd Backendend && npm install
WORKDIR /Backendend
EXPOSE 8080
RUN chmod +x wait-for-it.sh
RUN chmod +x run_app.sh
CMD ["./wait-for-it.sh" , "rabbitmq:5672" , "--strict" , "--timeout=20" , "--" , "./run_app.sh"]