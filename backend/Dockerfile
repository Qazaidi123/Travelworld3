FROM php:8.2-apache

RUN docker-php-ext-install mysqli

# Enable rewrite (optional but safe)
RUN a2enmod rewrite

# Copy only backend code
COPY . /var/www/html/

# Permissions
RUN chmod -R 755 /var/www/html
RUN chown -R www-data:www-data /var/www/html

# Enable .htaccess
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

EXPOSE 80
