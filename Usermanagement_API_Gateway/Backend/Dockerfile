FROM node:latest
RUN mkdir Backendend
COPY . /Backendend
RUN cd Backendend && npm install
WORKDIR /Backendend
EXPOSE 8080
RUN chmod +x wait-for-it.sh
RUN chmod +x run_app.sh
CMD ["npm", "run", "dev"]