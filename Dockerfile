FROM node:16.15

RUN mkdir -p /home/app/eCommerce-front
COPY . /home/app/eCommerce-front

WORKDIR /home/app/eCommerce-front
RUN npm install -g serve
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "./build"]