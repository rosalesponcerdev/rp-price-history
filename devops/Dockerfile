FROM nginx:1.27.2

COPY ./dist/rp-price-history/browser /data/www/
COPY ./devops/devops-nginx.conf /etc/nginx/conf.d/devops-nginx.conf
COPY ./devops/nginx.conf /etc/nginx/nginx.conf
