npm install

# start the service
pm2 start tokenWatcher.js --name token-watcher

# stop all services
pm2 stop all

pm2 log