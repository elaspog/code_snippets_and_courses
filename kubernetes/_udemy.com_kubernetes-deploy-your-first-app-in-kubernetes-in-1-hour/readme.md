# Tutorial

https://www.udemy.com/kubernetes-docker/

https://github.com/emailtovamos/kubernetes-course

https://github.com/emailtovamos/kubernetes-course.git

## S3/L9

in local shell:

```
$ docker login
$ docker build -t "game:v01" .
```

## S3/L10

in local shell:

```
$ docker tag game:v01 emailtovamos/game-repo:v0
$ docker push emailtovamos/game-repo:v0
```

## S4/L11

in local shell:

```
$ kubectl apply -f pod.yaml
$ kubectl get pods
```

## S4/L12

in local shell:

```
$ kubectl apply -f service.yaml
```

in web browser:

```
http://localhost:30100
```

in local shell:

```
$ kubectl delete service game-service
```

in web browser:

```
http://localhost:30100
```

## S4/L13

in local shell:

```
$ kubectl delete pod game
$ kubectl get pods
```

## S5/L14

in local shell:

```
$ kubectl apply -f replicaset.yaml
$ kubectl get replicasets
$ kubectl get pods
$ kubectl delete pod game-replicaset-<id>
```

## S6/L16

in local shell:

```
$ kubectl apply -f deployment.yaml
$ kubectl get all
```

in web browser:

```
http://localhost:30100
```

## S6/L17

in local shell:

```
$ kubectl apply -f deployment.yaml
$ kubectl get all
```

in web browser:

```
http://localhost:30100
```


