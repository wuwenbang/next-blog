echo 'Deploy Start !'
docker start 5c1 &&
cd /home/winter/app/ &&
git pull &&
yarn install &&
yarn migration:run &&
docker build -t winter/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d winter/node-web-app &&
echo 'Deploy Successfully !'