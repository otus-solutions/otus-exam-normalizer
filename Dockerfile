FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/index.html
RUN rm -rf /usr/share/nginx/html/50x.html

COPY source /usr/share/nginx/html/otus-exam-normalizer
COPY server/nginx.conf /etc/nginx/nginx.conf
COPY server/otus-exam.conf /etc/nginx/conf.d/default.conf


