#BUILD
FROM httpd:2-alpine

#FROM node:8.15.1

# INSTALL NODE
RUN apk update && apk add nodejs nodejs-npm bash \
    && mkdir /tempfolder

# Create app directory
WORKDIR /tempfolder

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY .  .

RUN npm run build --production

RUN rm -rf /usr/local/apache2/htdocs/.htaccess
COPY ./.htaccess /usr/local/apache2/htdocs/
RUN rm -rf /usr/local/apache2/conf/httpd.conf
COPY /httpd.conf /usr/local/apache2/conf/httpd.conf
RUN cp -a ./build/. /usr/local/apache2/htdocs/ \
    && rm -rf /tempfolder


EXPOSE 80
# Start up apache on load
CMD ["httpd-foreground"]
