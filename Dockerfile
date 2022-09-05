FROM node:16.15

RUN npm install -g serve
RUN mkdir -p /home/app/eCommerce-front
COPY . /home/app/eCommerce-front

WORKDIR /home/app/eCommerce-front
RUN npm install

EXPOSE 3000
CMD ["serve", "-s build"]