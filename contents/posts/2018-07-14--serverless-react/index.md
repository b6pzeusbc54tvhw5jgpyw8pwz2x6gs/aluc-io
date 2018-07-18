---
title: serverless react
subTitle: serverless react
category: guide
published: true
---

[Serverless Framework][serverless_framework] 는 AWS Lambda 와 API Gateway 와
같은 **serverless architecture** 들을 설정 코드를 통해 쉽게 배포하고 관리 할 수
있는 툴이다. 평소 API Gateway 와 Lambda 를 Web Console 을 통해 접해봤거나
혹은 어떤 서비스인지 대충 알고만 있어도 serverless 를 시작하기에 무리가 없다.

serverless 라는 용어는 이 포스트에서 다룰 `serverless` 라는 툴을 의미하기도 하며
AWS Lambda 와 같은 EC2 인스턴스 없이 구동되는 서비스 또는 서비스 아키텍쳐를
의미하기도 한다.

# serverless 설치 (feat. npx)
serverless 는 nodejs 로 개발되었다. npm 이나 yarn 의 global 옵션으로 설치 할 수
있는데 요즘엔 global 옵션 설정보다 `npx` 를 사용하는 것이 더 좋아보인다. 새로운
프로젝트 디렉토리를 만들고 시작해보자.

```sh
$ mkdir my-serverless-project
$ cd $_
$ yarn init
$ yarn add serverless
$ npx serverless -v
```

`npx <command>` 는 nodejs 모듈 로드 메카니즘에 따라 `node_modules` 아래 `.bin`
디렉토리에 있는 실행가능한 파일을 찾아 실행해준다. `global` 설정을 사용해서
serverless 를 설치하면 서로 다른 serverless 버전을 사용하는 프로젝트를 동시에
진행하기 곤란하지만 `npx` 를 사용하여 `global` 에 serverless 를 사용하지 않고
프로젝트 디렉토리 밑 `node_modules` 를 사용하므로 이런 문제를 잘 해결해준다.

`node_modules` 에 해당 실행가능한 파일이 없다면 그때 npm registry 에서 받아온 후
실행시켜주는데, `docker run` 명령어로 이미지를 `pull` 받은 후 `run` 시켜주는
것과 비슷하다. 따라서 이 post 에서도 `npx` 를 사용하겠다.

# hello world
serverless 는 기본적으로 `serverless.yml` 이름의 설정 파일로부터 시작할 수 있다.

`serverless.yml`
```sh
service: my-first-serverless-service
frameworkVersion: ">=1.28.0"

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  region: ap-northeast-2

functions:
  hello:
    handler: handler.hello
```

`us-east-1` 리전에 `hello` 란 이름의 Lambda function 을 만든다는 의미이다.
`handler` 를 주목하자. `handler.hello` 값은 `handler.js` 파일의 `hello` 란
이름의 export 된 함수를 실행하겠다는 의미이다. 아래와 같이 파일을 작성하자.

```js
// handler.js
module.exports.hello = (event, context, callback) => {
  callback(null, { statusCode: 200, body: 'Hello serverless!!' })
}
```

AWS Lambda 는 handler 함수를 트리거 할 때, callback 이라는 함수를 3번째 인자로
넣어준다. 앞에 event, context 객체는 나중에 다루기로 하고 callback 에 대해서만
간단하게 알자보자.  Lambda 함수 실행이 종료되었다는 것을 알리고 동시에 callback
을 통해 함수의 결과값을 반환할 수 있다. 첫번째 인자는 error 가 `Error` 객체를
하는 용도이고, 에러가 없다면 `null` 과 함께 정상 반환 값을 2번째 인자로 넣어주면
된다.  return 값이 아닌 callback 의 인자로 결과값을 반환받기 때문에 javascript
에서 주로 사용하는 비동기 프로세스를 쉽게 처리 할 수 있다.

## first deploy
자 이제 `handler.js` 파일과 `serverless.yml` 파일이 준비되었으니 Lambda function
을 생성해보자. 생성전 먼저 serverless 가 AWS API 를 사용할 수 있는 권한이 있어야
하는데, 권한있는 IAM 계정의 `ACCESS_KEY` 를 .envrc 파일에 아래와 같이 설정하자.

```sh
# .envrc
export AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXXXXXXXXX
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

추가로 `.envrc` 파일이 형상관리되지 않도록 간단하게 `.gitignore` 에 추가하자.
다른 경로인 `.serverless/` 경로는 serverless 배포 등의 동작시 자동으로 생성되는
디렉토리이므로 역시 형상관리에서 제외하자.

```sh
# .gitignore
.serverless/
.envrc

node_modules/
yarn.lock
```

자 이제 `source` 명령어를 통해 `.envrc` 파일의 내용을 환경변수로 셋팅해준
`deploy` 명령어를 통해 첫 배포를 해볼 것 이다. `serverless` 를 줄여 `sls` 로
사용할 수 있는데, ~~타이핑치기 힘들어서~~앞으로는 `sls` 로 사용하겠다.


```sh
$ source .envrc
$ npx sls deploy --verbose
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (17.19 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...............
Serverless: Stack update finished...
Service Information
service: my-first-serverless-service
stage: dev
region: ap-northeast-2
stack: my-first-serverless-service-dev
api keys:
  None
endpoints:
  None
functions:
  hello: my-first-serverless-service-dev-hello
```

deploy 명령어는 다음과 같이 동작한다.
1. `serverless.yml` 설정 파일로 부터 AWS CloudFormation 템플릿 파일을 생성한다.
2. 아직 CloudFormation Stack 이 생성되지 않았을 경우 코드의 압축파일이 저장될 s3
   bucket 과 함께 Stack 을 생한다.
3. Lambda Function 코드들을 zip 파일로 압축한다.
4. 이전 배포된 모든 파일에 대한 hash 를 가져온 뒤 현재 로컬에 있는 파일들의 hash
   와 비교한다.
5. 만약에 hash 결과가 같으면 배포 프로세스는 종료된다.
6. hash 결과가 같지 않으면, zip 파일을 s3 bucket 에 업로드한다.
7. 모든 IAM Roles, Lambda Functions, Events 그 외 자원들이 AWS CloudFormation
   템플릿에 추가된다.
8. 새로운 CloudFormation 템플릿으로 Stack 을 업데이트 한다.
9. 각각의 배포는 각 Lambda Function 을 새로운 버전으로 발행한다.

잘 배포 되었는지 AWS Web Console 을 통해 확인해보자.

![first-deploy](./check-first-deploy.png)


## invoke
`serverless invoke`
명령을 통해 배포한 Lambda function 을 실행해 볼 수 있는데, 아래 명령어로
배포한 hello handler 가 잘 동작하는지 트리거 시켜보고 callback 함수의 2번째
인자로 넘겨준 내용이 output 으로 잘 찍히는 것을 확인하자.

```
$ npx sls invoke -f hello
{
    "statusCode": 200,
    "body": "Hello serverless!!"
}
```

## package 설정
로그를 보면 17MB 정도의 파일을 올리는 것을 볼 수 있다. serverless 는 handler.js
코드 안에서 어떤 라이브러리를 사용하고 어떤 코드와 종속성을 가지는지 알 수 없기
때문에 기본설정으로 `node_modules/` 디렉토리 포함 현재 디렉토리의 모든 파일을
압축해서 올리고 있는 것인데, 이는 현재 `hello` Lambda function 을 수행하는데
불필요하다.  `serverless.yml` 파일에 `package` 설정을 추가하여 불필요한 파일들이
package 되어 업로드 되는 문제를 해결해보자.

```diff
 service: my-first-serverless-service
 frameworkVersion: ">=1.28.0"

+package:
+  exclude:
+    - ./**
+  include:
+    - handler.js
+
```

모든 파일을 제외한 뒤 handler.js 파일만 업로드 하는 설정이다. 다시 한번
배포해보자.

```sh
$ npx sls deploy
...skip...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (253 B)...
Serverless: Validating template...
...skip...
```

이제 253B, 딱 필요한 파일만 upload 되는 것을 볼 수 있다. `package` 설정을 통해
업로드 되는 코드의 용량이 줄어들 뿐만 아니라 무심코 API KEY 같은 파일이 s3 로
업로드 되는 실수 등도 방지 할 수 있다.  내부적으로 serverless 는 Lambda function
이 실행할 코드와 Lambda function 배포를 위한 cloudformation 설정 파일을 s3
버킷을 임의로 생성하여 사용하는데 아래 명령어를 통해 어떤 deploy 버킷의 이름을
확인 할 수 있다.

```sh
$ npx sls info --verbose
Service Information
service: my-first-serverless-service
stage: dev
region: ap-northeast-2
stack: my-first-serverless-service-dev
api keys:
  None
endpoints:
  None
functions:
  hello: my-first-serverless-service-dev-hello

Stack Outputs
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:ap-northeast-2:539425821792:function:my-first-serverless-service-dev-hello:5
ServerlessDeploymentBucketName: my-first-serverless-serv-serverlessdeploymentbuck-k11zvp877tpm
```

`ServerlessDeploymentBucketName` 의 값이 바로 배포를 위해 사용하는 버킷이름인데,
따로 설정해주시 않으면 임의로 설정되며, 나중에 배포가 잘 안되어 디버깅 할 때 이
버킷을 방문하게 될 것이다. 심심하면 지금 S3 해당 버킷에 방문하여 앞서 배포한
2건의 차이를 확인해보아도 좋다.

## logging
디버깅을 위해서라도 로깅은 반드시 필요하다.  `handler.js` 파일에
`console.log` 코드를 삽입 한 뒤 확인해보자.

```diff
// handler.js
module.exports.hello = (event, context, callback) => {
+ console.log("hello!!!")
  callback(null, { statusCode: 200, body: 'Hello serverless!!' })
}
```

```sh
$ npx sls deploy
$ npx sls invoke -f hello --log
```

`--log` 옵션을 붙여야만 로그가 나온다. 뿐만 아니라 **serverless** 가 기본으로
LogGroup 을 설정해줘서 AWS CloudWatch 의 Logs 메뉴에서
`/aws/lambda/my-first-serverless-service-dev-hello` 와 같은 로그 그룹을 찾을 수
있고 클릭해서 들어가면 Lambda function 의 트리거와 종료, 그리고 "hello!!!" 로그
등을 확인 할 수 있을 것이다.

# AWS 자원 사용하기 - S3
Labmda 로 s3 특정 버킷에 접근하기 위해 `serverless.yml` 파일 `provider` 설정
아래 `iamRoleStatements` 설정을 아래와 같이 추가해보자.

```diff
 provider:
   name: aws
   runtime: nodejs8.10
-  stage: dev
+  stage: ${env:SLS_STAGE}
   region: ap-northeast-2
+  iamRoleStatements:
+    - Effect: Allow
+      Action:
+        - s3:*
+      Resource: "arn:aws:s3:::${env:SLS_BUCKET_NAME}/*"
```

## serverless.yml 설정에 환경변수 사용하기
s3 버킷 이름등을 하드코딩하면 다른 환경에서 사용하거나 오픈소스로 오픈할 때
사용하는 사람은 코드를 수정해야만 할 것이다. 환경 마다 달라질 수 있는 부분은
환경변수로 따로 빼는 것이 좋다. 이런 환경변수를 `.envrc` 파일에 추가하자.

```
# .envrc
export AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXXXXXXXXX
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
+export SLS_STAGE=dev
+export SLS_BUCKET_NAME=my-bucket-for-sls-1123
```

다른 프로그램들과 환경변수 충돌을 방지하기 위해 `SLS_` 를 프리픽스로 사용했다.
`stage` 부분도 환경변수로 함께 뺐다.

## s3 bucket access
nodejs 라이브러리인 [aws-sdk][aws_sdk_js] 를 사용하여 s3 버킷의 파일 목록을
가져와보자.

```
$ aws s3api create-bucket --bucket $SLS_BUCKET_NAME
$ aws s3 cp image1.jpg s3://$SLS_BUCKET_NAME/
$ aws s3 cp image2.jpg s3://$SLS_BUCKET_NAME/
```

## Labmda Function 에 환경변수 사용하기
`handler.js` 에 `getObjectList` 라는 named export 함수를 아래와 같이 하나 더
만들자.

```diff
+module.exports.getObjectList = (event, context, callback) => {
+  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
+  const params = { Bucket: process.env.SLS_BUCKET_NAME, MaxKeys: 10 };
+  s3.listObjects(params, (err,data) => {
+    if( err ) {
+      callback(err)
+      return
+    }
+    callback(null, { statusCode: 200, body: data })
+  })
+}
```

`process.env.SLS_BUCKET_NAME` 을 주목하자. 이 코드는 로컬이 아닌 AWS Lambda
Function 으로 실행되는 코드이다. 아무리 `source .envrc` 로 로컬에 환경 변수
셋팅을 해놓았을지라도 Lambda Function 실행환경에서의 환경변수가 셋팅되지는
않는다. `environment` 설정을 통해서 Lambda Function 실행환경의 환경 변수를
셋팅 할 수 있다.

```diff
 provider:
   name: aws
   runtime: nodejs8.10
   stage: ${env:SLS_STAGE}
   region: ap-northeast-2
+  environment:
+    SLS_BUCKET_NAME: ${env:SLS_BUCKET_NAME}
   iamRoleStatements:
     - Effect: Allow
```

위처럼 `provider` 설정 아래에 `environment` 설정을 두고 `KEY: Value` 로
설정 하면 모든 `functions` 아래 handler 들이 영향 받는다.

```diff
 functions:
   hello:
     handler: handler.hello
+    environment:
+      ENV_FOR_HELLO: env_for_hello
+      SLS_BUCKET_NAME: check-environment
   getObjectList:
     handler: handler.getObjectList
```

연습을 위해 `hello` handler 아래에도 environment 를 추가했다. 여기의
`SLS_BUCKET_NAME` 은 위 `provider` 쪽에 설정한 같은 이름의 환경변수를 덮어쓰기
할 것 이다. `hello` 쪽에 추가한 환경 변수는 공부삼아 한번 확인해 보길 바라고
이제 s3 object list 를 잘 가져오는지 확인해보자.

```sh
$ npx sls deploy -v
$ npx sls invoke -f getObjectList
$ npx sls invoke -f getObjectList | jq .body.Contents[].Key
```

자알 가져온다.

rek 는 하고...
dynamo faker vs webpack 둘중하나만 해야함

## event 설정
이것을 http GET 메소드 `/hello`
라는 패스를 통해 트리거 시킬 수 있도록 API Gateway 를 설정하라는 의미이다.  해본
사람은 알겠지만 AWS Web Console 로 이정도 설정 하는 것도 꽤 귀찮고 어려운
작업이다.  `serverless` 의 첫번째 장점이 바로 이런 복잡한 인프라 자원의 설정을
yml 파일을 통해 알아서 자동으로 해주는 `Infrastructure as code` 를 구현할 수
있게 해주는 점이다.



```diff
 functions:
   hello:
     handler: handler.hello
+    events:
+      - http:
+          path: hello
+          method: get
```





[serverless]: https://serverless.com/
[serverless_framework]: https://serverless.com/framework/

https://serverless.com/framework/docs/providers/aws/guide/deploying#how-it-works
https://github.com/serverless/examples
[aws_sdk_js]: https://github.com/aws/aws-sdk-js
