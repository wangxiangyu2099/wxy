# gamerking

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

###  项目部署 nginx
```
location ^~/app {
            alias /usr/share/nginx/html/app/;
            #index index.html;
            try_files $uri $uri/ @rewrites;
    }
    location @rewrites {
            rewrite ^/(app)/(.+)$ /$1/index.html last;
    }
```
