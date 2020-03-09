FROM node:latest
RUN mkdir Frontend
COPY . /Frontend
RUN cd Frontend && npm install
WORKDIR /Frontend
EXPOSE 3000
CMD ["npm", "start"]