FROM nginx:1.27.2

COPY ./dist/rp-price-history /data/www/
COPY devops-nginx.conf /etc/nginx/conf.d/devops-nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
