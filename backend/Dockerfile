FROM python:3.11-alpine

WORKDIR .

RUN apk --no-cache add dcron curl nano

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY job.sh /job.sh
RUN chmod +x /job.sh

COPY cronjob /etc/crontabs/root
RUN chmod 0644 /etc/crontabs/root && \
    crontab /etc/crontabs/root && \
    touch /var/log/cron.log

EXPOSE 8080

COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

CMD ["/usr/local/bin/start.sh"]
