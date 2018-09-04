---
title: serverless react
subTitle: serverless react
category: guide
published: true
---

# Serverless Framework with Nodejs

소에게 이름을 지어주는 순간 그 사람은 그 소를 절대로 도축할 수 없다고 한다.
어떤 대상에 이름이 생기면 바라보는 시선이 달라진다. 농장의 소 한마리에
**스칼렛** 이라는 이름을 지어주고 그 소를 잡아먹게 되면 단순한 **소고기**가
아니라 **스칼렛 고기**가 되기 때문이다. 그래서 우리는 도축장의 소들을 이름이
아니라 관리번호로 부른다. 이렇게 몰개성화된 동물들은 각자의 개성을 지닌 고유한
개체들로 간주되지 않는다.  관리하기 편하며 도축할 때의 불편한 마음도
희미해진다.

반면 애완동물은 어떨까? 애완동물을 만났을때 가장 먼저 하는 일은 이름
지어주기다. 같은 강아지를 키우더라도 모두 다르다. 이름이 다르고 털 색깔이나
무늬가 다르고 얼굴도 다르고 울음 소리도 다르고 식성도 성격도 다르다. 애완동물이
아프면 주인의 마음도 아프고 큰 치료비를 감수하더라도 병원에 데려가 건강을
원래대로 회복시킨다.

뭔 ~~개~~소린가 하겠지만 IT 인프라 자원을 관리하는데에도 같은 논리가 적용된다.

On-premise 환경에서의 서버 설비투자 비용과 프로비저닝 시간을 고려하면 가능한
하나의 서버를 오래 사용하는 계획을 세워야한다. 서버에 문제가 생기면 큰 비용이
들더라도 고쳐야하며 그렇기 때문에 서버에서 뭔가를 할 땐 그 환경에 익숙한 전문
인력의 섬세한 작업이 필요하다. 이러다 보니 각각의 서버들에 이름이 붙여서 관리
한다. A-Service-Web, B-Service-WAS, DB, Firewall Server 등. 이러한 서버들의
이름과 특징들을 **상태** 라고 하며 상태 관리가 필요한 자원을 **Stateful**
자원이라 한다.

Cloud 의 등장은 애완동물(**Pets**) 처럼 관리하던 인프라 자원을 소
무리(**Cattle**) 처럼 취급하는 패러다임의 변화를 주었다. 이제 설비투자 비용을
고려하지 않고 오직 운영비용만 고려하면 되었다. 서버는 언제라도 폐기하고 새로
생성 할 수 있었기 때문에 서버가 아프면 들어가서 고치는 것이 아니라 폐기하고
새로운 서버를 생성하는 방식으로 효율을 높였다. Docker 와 같은 컨테이너 사용으로
서버의 상태를 관리할 필요도 없어졌다. 많은 **Stateful** 자원이 **Stateless**
자원으로 변한 것이다.

> 물론 Stateless 한 애플리케이션을 위해 local storage, session 등을 사용하지
> 않아야 하며 수평 확장을 고려하여 설계 해야 한다. 이러한 설계가 어려운 DB 와
> 같은 자원은 여전히 **Stateful** 하게 관리되기도 한다.

## Insects 의 등장
곤충이 나타났다. **Pets** 과 **Cattle** 뿐만 아니라 **Insects** 처럼 취급되는
인프라 자원이 등장했는데 필요한 시간 동안만 존재했다 소멸하는 자원을 가르킨다.
또 다른 말로는 **이벤트 드리븐 컴퓨팅** 이다.  대표적인 예가 바로 [AWS
Lambda][aws_lambda] 이다. Lambda 를 트리거 하는 이벤트가 발생하면 초기화 된 후
일반적으로 1~5초 정도로 짧게 실행된 후 소멸되는데 마치 곤충인 하루살이와 같이
매우 짧은 생명주기를 갖는다. 요금은 실행되는 시간 동안만 밀리세컨드 단위로
청구된다. API 백엔드, 일회성 처리 작업 및 기타 애플리케이션에 매우 유용하다.

**Insects** 의 장점은 **Serverless** 이다. 사실 서버는 어딘가에 있지만 AWS 와
같은 클라우드 벤더사에서 서버를 관리해줘서 개발/운영자가 관리할 서버가 없다는
의미이다.


# Serverless Architecture
AWS Lambda 뿐 만 아니라 AWS SNS, SES, SQS, DynamoDB 등 모두 위의 특징을
만족하는 **Serverless** 자원들이며 BaaS(Backend as a Service) 또는
FaaS(Function as a Service) 들이다. 이러한 자원들을 활용한 **Serverless
Architecture** 를 설계는 아래와 같은 장점이 있다.

1. 애플리케이션 코드만 관리한다. 다음을 모두 Cloud 벤더사에서 관리한다.
    - server and operating system maintenance
    - high-availability
    - capacity provisioning
    - automatic scaling
    - monitoring and logging
2. 언제든지 호출하면 실행이 보장된다.
3. 실행되는 동안만 과금된다.

# Serverless Framework
[Serverless Framework][serverless_framework] 는 [AWS Lambda][aws_lambda], [API
Gateway][aws_apigateway] 와 같은 **Serverless** 자원들을 사용하여 **Serverless
Architecture** 를 쉽게 설계, 구현, 배포, 관리 할 수 있게  해주는 툴이다. AWS
뿐만아니라 Google Cloud Platform, Azure 도 지원을 한다. 포스트에서는 AWS 에
대해서만 다룬다.

serverless 라는 용어는 **Serverless Framework** 라는 툴을 의미하기도 하며
**Serverless Architecture** 를 의미하기도 하는데 포스트에서는 전자의 의미로
언급 될 것이다.

평소 API Gateway 와 Lambda 를 AWS Web Console 을 통해 접해봤거나 혹은 어떤
서비스인지 대충 알고만 있어도 **Serverless Framework** 를 시작하기에 무리가
없다.  AWS Lambda 를 처음 들어봤다면 [Velopert 님의 AWS Lambda 로 하는 Hello
World!][velopert_lambda] 를 참고!

# Serverless 프로젝트 초기화 (feat. npx)
serverless 는 nodejs 로 개발되었다. [npm][npm] 이나 [yarn][yarn] 을 사용하여
global 영역에 [serverless package][sls_package] 를 설치하여 시작하는 것이
일반적이지만 global 영역을 더럽히는 것을 원하지 않는다면 [npx][npx] 를 사용해도
좋다. 이 포스트에서는 **npx** 를 사용한다. **npx** 는 **npm** `5.2.0` 이상 버전에
탑재되어 있다.

**serverless** 프로젝트를 생성하자:
```sh
$ npx serverless create --template aws-nodejs --path sls-hello-world
$ cd sls-hello-world
$ ls -l
total 16
-rw-r--r--  1 ssohjiro  staff   414 Sep  3 20:40 handler.js
-rw-r--r--  1 ssohjiro  staff  2892 Sep  3 20:40 serverless.yml
```

현재 디렉토리 아래 `sls-hello-world` 란 디렉토리가 생성되면서 기본 serverless
설정파일인 `serverless.yml` 과 Lambda function 에서 실행될 코드인 `handler.js`
가 생성된다.

`npx <command>` 를 실행하면 아래 우선순위대로 패키지를 찾아 실행시킨다.

1. 현재 디렉토리 아래에 있는 `node_modules/bin` 디렉토리에서 패키지를 찾는다.
1. global 영역의 `bin` 디렉토리에서 패키지를 찾는다 (예:
   `~/.nvm/versions/node/v8.9.4/bin`)
1. 상위 디렉토리의 `node_modules/bin` 안의 패키지를 찾는다. 상위 디렉토리로
   올라가면서 반복.
1. 패키지를 찾지 못하면 인터넷(npm registry)에서 해당 패키지를 검색해 받아온뒤
   실행시킨다.

`global` 영역에 serverless 를 설치하면 서로 다른 serverless 버전을 사용하는
프로젝트를 동시에 진행하기 곤란하지만 `npx` 를 사용하면 각각의 프로젝트
디렉토리 밑 `node_modules` 를 사용 할 수 있다. `package.json` 파일을 생성하고
프로젝트 디렉토리 아래 `node_modules/` 에 serverless 를 설치 하자.

```sh
$ yarn init
yarn init v1.7.0
question name (sls-hello-world):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
✨  Done in 1.57s.

$ yarn add serverless

$ npx serverless -v
1.30.3

$ npx sls -v
1.30.3
```

`create` 명령어를 할 땐 `serverless` 를 인터넷에서 받아 실행시키느라 느렸지만
이번엔 `node_modules` 아래에 있는 것을 실행시키므로 빠르게 실행이 된다.
`npx serverless` 명령어가 길기 때문에 앞으론 shortcut 인 `sls` 를 사용한다.

## git init
`.gitignore` 파일을 아래와 같이 작성 한 뒤 프로젝트를 git 으로 관리하며 commit
하면서 진행할 것이다. 그래야 변경되는 부분에 집중 하기 좋고 나중에 무엇을
했는지 리뷰 할 때 좋다.

```
# .gitignore

# package directories
node_modules
jspm_packages

# Serverless directories
.serverless

# yarn
yarn.lock
yarn-*.log
```

`git init` 후 현재 형상을 커밋하자:
```
$ git init
$ git add .
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   .gitignore
	new file:   handler.js
	new file:   package.json
	new file:   serverless.yml

$ git commit -m "initial commit"
[master (root-commit) bcf36cf] initial commit
 4 files changed, 138 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 handler.js
 create mode 100644 package.json
 create mode 100644 serverless.yml
```

# hello world
`aws-nodejs` 템플릿으로 프로젝트를 생성했기 때문에 `handler.js` 안에 기본적인
`hello` 핸들러 하나가 작성되어 있을 것이다. 대충 내용을 확인 한 뒤
`serverless.yml` 쪽을 살펴보자. 나중에 참고하며 작성하기 좋게 여러 설정들이
주석처리 되어 있다. 주석을 모두 걷어내면 아래와 같은 설정이 보인다:

```yml
service: sls-hello-world

provider:
  name: aws
  runtime: nodejs8.10
functions:
  hello:
    handler: handler.hello
```

[yaml][yaml] 은 인덴테이션에 민감한 문법이다. 휴먼 리더블한 yaml 로 설정을
작성하고 실행될때는 json 으로 변환되어서 실행되는 방식이 요즘 툴들의 트렌드
인것 같다. yaml 에 익숙하지 않아 디버깅이 필요한 때, `js-yaml` 을 사용하여
의도대로 yaml 이 json 으로 잘 변환되는지 확인 할 수 있다.

```sh
$ yarn add js-yaml --dev
$ npx js-yaml serverless.yml
{
  "service": "sls-hello-world",
  "provider": {
    "name": "aws",
    "runtime": "nodejs8.10"
  },
  "functions": {
    "hello": {
      "handler": "handler.hello"
    }
  }
}
```

`functions` property 는 Lambda function 하나를 의미한다. hello 란 id 의 Lambda
function 을 생성하고 이 Lambda function 이 트리거 될 때 실행되는 코드를
**핸들러** 라고 하는데 `handler.js` 파일에서 `hello` 란 이름으로 export 되는
함수를 호출 하겠다는 의미이다. `hello` 란 id 는 serverless 에서 관리되는 id
이며 실제 Lambda function 에 배포되는 id 는 service name, stage, id 의 조합으로
생성된다. AWS API 를 사용해 배포하기 때문에 AWS credential 이 필요하다.
`.envrc` 파일을 작성 한 뒤 배포해보자.

```
# .envrc
export AWS_ACCESS_KEY_ID=AKXXXXXXXXXXXXXXXXRA
export AWS_SECRET_ACCESS_KEY=kvxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzZ
```

AWS API 사용하는 툴에선 보통 `AWS_DEFAULT_REGION` 환경변수로 어떤 리전을
사용할지 결정하는데 `serverless` 에서는 `serverless.yml` 안의 `provider.region`
property 가 사용된다는 사실을 주의!

시크릿 정보가 형상관리에 추가되지 않도록 `.gitignore` 에 추가하는 것도 잊지말자. 
배포하기 전에 커밋을 하나 추가 하자.

```sh
$ git add .
$ git commit -m "update .gitignore, remove comment in serverless.yml, add js-yaml"
[master 3d84bbe] update .gitignore, remove comment in serverless.yml, add js-yaml
 3 files changed, 12 insertions(+), 104 deletions(-)
 rewrite serverless.yml (96%)
```

첫 배포:
```
$ source .envrc
$ npx sls deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (17.34 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...............
Serverless: Stack update finished...
Service Information
service: sls-hello-world
stage: dev
region: us-east-1
stack: sls-hello-world-dev
api keys:
  None
endpoints:
  None
functions:
  hello: sls-hello-world-dev-hello
```

`deploy` 명령어는 내부적으로 다음과 같이 동작한다.

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

`provider.region` 값이 없었으므로 디폴트 리전인 `us-east-1` 에
`sls-hello-world-dev-hello` 이름의 Lambda function 이 배포되었다. [AWS Web
Console][webconsole_labmda] 로 접속하여 확인해도 좋다.

![first-deploy](./check-first-deploy.png)

잘 배포되었는지 `invoke` 명령을 사용해 Lambda function 을 트리거 해볼 수 있다:
```
$ npx sls invoke --function hello
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":{}}"
}
```

`handler.js` 파일의 `hello` 함수가 리턴해주는 내용이 잘 출력됨을 볼 수 있다.

# Lambda Execution Model
람다의 실행 모델에 대해 간단히 알아보자. `invoke` 명령어를 통해 배포한 Lambda
function 을 트리거하게 되면 사용자가 정의한 설정에 따라 코드를 실행 할 수 있는
임시 실행환경인 **실행 컨텍스트** 가 시작된다. **실행 컨텍스트** 의
**부트스트래핑** 엔 시간이 다소 소요되며 따라서 첫 호출이나 업데이트 이후, 혹은
오랜만에 Lambda function 을 호출 할때 지연이 발생 할 수 있다. 

Lambda function 이 실행되면 실행 컨텍스트는 연속되는 호출을 예상하여 **일정
시간** 동안 유지 된다. 바로 소멸되지 않고 **freeze** 되는 것인데 이 때 연속되는
호출이 들어오면 **freeze** 시켜 놓았던 **실행 컨텍스트**가 재사용된다.

**실행 컨텍스트**가 재사용되는 케이스에서는 어느정도의 local storage 를 사용한
캐싱이나 db connection 등을 미리 해두는 방법으로 성능 최적화를 할 수도 있다.
코딩 전 [Lambda 실행 모델][lambda_execution_model] 을 반드시 참고하자!

> 물론 재사용 되지 않는 경우를 대비해 캐싱에 의존하면 안된다

## `dynamicHello` handler 추가
**실행 컨텍스트** 재사용을 확인해보기 위해 아래와 같이 `dynamicHello` 란 Lambda
function 을 하나 더 작성해 보자.

```js
let count = 1
module.exports.dynamicHello = (event, context, callback) => {

  console.log(event)
  console.log(context)

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8;",
    },
    body: `
      <h1>hello ${count++}th 방문자님!!</h1>
      <h3>context.awsRequestId: ${context.awsRequestId}</h3>
      <h3>context.logStreamName: ${context.logStreamName}</h3>
    `,
  }
  callback(null, response)
}
```

`serverless.yml` 에는 아래와 같이 `dynamicHello` function 을 추가하고 `handler`
를 연결시켜주자.

```diff
 functions:
   hello:
     handler: handler.hello
+  dynamicHello:
+    handler: handler.dynamicHello
```

템플릿에 기본 작성되어 있던 async function 은 이번에 다루지 않는다. async
function 은 함수안에서 비동기 동작을 await 를 사용하여 처리 하겠다는 것 인데
`serverless` 설명에 집중하기 위해 `async` 를 사용하지 않는 `dynamicHello` 와
같은 기존 함수 스타일로 설명하겠다.

AWS Lambda 는 handler 함수를 트리거 할 때, callback 이라는 함수를 3번째 인자로
넣어준다. callback 을 호출한다는 것은 Lambda function 이 종료되었다는 것을
의미하고 callback 함수 호출시 첫번째, 두번째 인자를 통해 응답을 줄 수 있다.
첫번째 인자는 error 발생시 `Error` 객체를 응답하는 용도이고, 에러가 없다면
`null` 과 함께 정상 반환 값을 2번째 인자로 넣어주면 된다. return 값이 아닌
callback 의 인자로 결과값을 반환받기 때문에 javascript 에서 주로 사용하는
비동기 프로세스를 쉽게 처리 할 수 있다.

## package 설정
첫번째 `deploy` 때 로그를 보면 17MB 정도의 파일을 올리는 것을 볼 수 있다.
serverless 는 기본적으로 현재 디렉토리의 모든 파일을 압축해서 s3 로 업로드
시킨다. `node_modules/` 디렉토리도 포함 되기 때문에 Lambda function
실행환경에서 불필요한 파일도 함께 올라가며, 올라가서는 안되는 `.envrc` 와 같은
시크릿 정보도 함께 올라간다.

어디에 올라가는 것일까? `info` 명령어로 확인해보자

```sh
$ npx sls info --verbose
Service Information
service: sls-hello-world
stage: dev
region: us-east-1
stack: sls-hello-world-dev
api keys:
  None
endpoints:
  None
functions:
  hello: sls-hello-world-dev-hello

Stack Outputs
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:539425821792:function:sls-hello-world-dev-hello:1
ServerlessDeploymentBucketName: sls-hello-world-dev-serverlessdeploymentbucket-p6b4rmgo2fy
```

`ServerlessDeploymentBucketName` 의 값이 바로 배포를 위해 사용하는 S3
버킷이름인데, 따로 설정해주시 않으면 임의로 설정되며, 나중에 배포가 잘 안되어
디버깅 할 때 이 버킷을 방문하게 될 것이다. 심심하면 지금 S3 해당 버킷에
방문하여 업로드된 `zip` 파일을 내려받아 확인해도 좋다.

`serverlesss.yml` 에 `package` 설정을 추가하여 불필요한 파일들이 package 되어
업로드 되는 문제를 해결하자.

```diff
$ git diff
diff --git a/serverless.yml b/serverless.yml
index 0677ad6..739d59b 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -1,5 +1,11 @@
 service: sls-hello-world

+package:
+  exclude:
+    - ./**
+  include:
+    - handler.js
+
 provider:
   name: aws
   runtime: nodejs8.10
```

모든 파일을 제외한 뒤 handler.js 파일만 업로드 하는 설정이다. 다시 한번
배포해보자. `--verbose` 옵션을 추가하여 AWS 어떤 자원이 변경되는 것인지 확인 할
수 있다.

```sh
$ npx sls deploy --verbose
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (615 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - sls-hello-world-dev
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersion4cIXjLzb1P0vZUSNpk4cWj9vXbTYTIRdHhNNHQaXOf4
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersion4cIXjLzb1P0vZUSNpk4cWj9vXbTYTIRdHhNNHQaXOf4
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - HelloLambdaVersion4cIXjLzb1P0vZUSNpk4cWj9vXbTYTIRdHhNNHQaXOf4
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - sls-hello-world-dev
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - HelloLambdaVersion0Ft40rQFUd8MDtfTPN6KHBOUQjNVLapx8ZhWdnE1NM
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - sls-hello-world-dev
Serverless: Stack update finished...
Service Information
service: sls-hello-world
stage: dev
region: us-east-1
stack: sls-hello-world-dev
api keys:
  None
endpoints:
  None
functions:
  hello: sls-hello-world-dev-hello

Stack Outputs
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:539425821792:function:sls-hello-world-dev-hello:3
ServerlessDeploymentBucketName: sls-hello-world-dev-serverlessdeploymentbucket-p6b4rmgo2fy
```

이제 딱 615Byte 필요한 파일만 upload 되는 것을 볼 수 있다. `package` 설정을
통해 업로드 되는 코드의 용량이 줄어들 뿐만 아니라 무심코 API KEY 같은 파일이 s3
로 업로드 되는 실수 등도 방지 할 수 있다. `ServerlessDeploymentBucketName` S3
버킷에 방문하여 업로드된 2건의 차이를 확인해보아도 좋다.

## logging

`dynamicHello` 핸들러에는 디버깅을 위해 `console.log` 를 사용했다.  `invoke` 에
`--log` 옵션을 붙이면 응답 값 뿐만 아니라 로그도 확인 할 수 있다.

```sh
$ npx sls invoke --function dynamicHello --log
{
    "statusCode": 200,
    "headers": {
        "Content-Type": "text/html; charset=utf-8;"
    },
    "body": "\n      <h1>hello 1th 방문자님!!</h1>\n      <h3>context.awsRequestId: b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1</h3>\n      <h3>context.logStreamName: 2018/09/03/[$LATEST]406d33b8c803452fbf0097854516b464</h3>\n    "
}
--------------------------------------------------------------------
START RequestId: b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1 Version: $LATEST
2018-09-03 22:53:20.634 (+09:00)	b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1	{}
2018-09-03 22:53:20.635 (+09:00)	b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1	{ callbackWaitsForEmptyEventLoop: [Getter/Setter],
  done: [Function: done],
  succeed: [Function: succeed],
  fail: [Function: fail],
  logGroupName: '/aws/lambda/sls-hello-world-dev-dynamicHello',
  logStreamName: '2018/09/03/[$LATEST]406d33b8c803452fbf0097854516b464',
  functionName: 'sls-hello-world-dev-dynamicHello',
  memoryLimitInMB: '1024',
  functionVersion: '$LATEST',
  getRemainingTimeInMillis: [Function: getRemainingTimeInMillis],
  invokeid: 'b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1',
  awsRequestId: 'b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1',
  invokedFunctionArn: 'arn:aws:lambda:us-east-1:539425821792:function:sls-hello-world-dev-dynamicHello' }
END RequestId: b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1
REPORT RequestId: b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1	Duration: 5.34 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 47 MB
```

`invoke` 명령으로 뿐만 뿐만 아니라 **serverless** 가 기본으로 LogGroup 을
설정해줘서 [AWS Web Console CloudWatch][webconsole_cloudwatch] 의 Logs 메뉴에서
`/aws/lambda/sls-hello-world-dev-dynamicHello` 와 같은 로그 그룹을 찾을 수 있고
클릭해서 들어가면 Lambda function 의 트리거 시작과 종료, 그리고 console.log 로
찍은 로그 등을 확인 할 수 있다.

# AWS 자원 사용하기 - S3
Lambda function 에서 s3 버킷에 접근하기 위해 `serverless.yml` 파일 `provider`
설정 아래 `iamRoleStatements` 설정을 아래와 같이 추가해보자.

```diff
 provider:
   name: aws
   runtime: nodejs8.10
+  iamRoleStatements:
+    - Effect: Allow
+      Action:
+        - s3:GetObject
+        - s3:PutObject
+        - s3:ListObjects
+      Resource: "arn:aws:s3:::${env:SLS_BUCKET_NAME}/*"
```

## serverless.yml 설정에 환경변수 사용하기
`${env:SLS_BUCKET_NAME}` 부분을 주목하자. s3 버킷 이름 등을 하드코딩하면 다른
환경에서 사용하거나 오픈소스로 오픈할 때 사용하는 사람은 코드를 수정해야만 할
것이다. 환경마다 달라질 수 있는 부분은 환경변수로 따로 빼는 것이 좋다. 이런
환경변수를 `.envrc` 파일에 추가하여 `deploy` 하기전 현재 쉘에 셋팅해주면
`${env:SOME_VAR}` 와 같은 문법으로 사용 할 수 있다.

```diff
# .envrc
export AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXXXXXXXXX
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

+export SLS_BUCKET_NAME=sls-hello-world-91283712
```

## s3 bucket access
nodejs 라이브러리인 [aws-sdk][aws_sdk_js] 를 사용하여 s3 버킷의 파일 목록을
가져와보자.

```
$ aws s3api create-bucket --bucket $SLS_BUCKET_NAME
$ aws s3 cp image1.jpg s3://$SLS_BUCKET_NAME/
$ aws s3 cp image2.jpg s3://$SLS_BUCKET_NAME/
```

## Labmda Function 에 환경변수 사용하기
`handler.js` 에 `getS3Object` 라는 함수를 아래와 같이 생성하자:

```diff
+module.exports.getS3Object = (event, context, callback) => {
+  const s3 = new AWS.S3()
+  const params = { Bucket: process.env.SLS_BUCKET_NAME, Key: event.path }
+  s3.getObject(params, (err,data) => {
+    if( err ) {
+      callback(err)
+      return
+    }
+    callback(null, { statusCode: 200, body: data })
+  })
+}
```

`process.env.SLS_BUCKET_NAME` 을 주목하자. `source .envrc` 로 로컬 쉘에
환경변수 셋팅을 해놓았을지라도 Lambda function 실행환경에서 `process.env` 로
접근 할 수 있는 환경변수가 셋팅되지는 않는다. `serverless.yml` 에 `environment`
설정을 통해서 Lambda Function 실행환경의 환경변수를 셋팅 할 수 있다.

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
   s3ObjectList:
     handler: handler.s3ObjectList
```

연습을 위해 `hello` handler 아래에도 environment 를 추가했다. 여기의
`SLS_BUCKET_NAME` 은 위 `provider` 쪽에 설정한 같은 이름의 환경변수를 덮어쓰기
할 것 이다. `hello` 쪽에 추가한 환경 변수는 공부삼아 한번 확인해 보길 바라고
이제 s3 object list 를 잘 가져오는지 확인해보자.

```sh
$ npx sls deploy -v
$ npx sls invoke -f s3ObjectList
$ npx sls invoke -f s3ObjectList | jq -r .body | jq .Contents[].Key
```

자알 가져온다.

# 모듈화 & 서드파티 모듈 사용하기
npm 을 통해 설치한 서드파티 모듈을 사용하는 Lambda Function 을 작성해보자.  흔한
예제인 이미지 리사이징을 해볼텐데, s3 의 이미지를 가져오고, 리사이징하고, 다시
업로드 시키는 함수는 다음과 같다.

```js
// src/imgUtil.js
import AWS from 'aws-sdk'
import path from 'path'
import fs from 'fs'
import { ulid } from 'ulid'
import _gm from 'gm'

const gm = _gm.subClass({ imageMagick: true })
const s3 = new AWS.S3()

export const downloadImage = (bucketName, key) => new Promise((resolve, reject) => {
  const destPath = path.join('/tmp', (new Date()).getTime().toString())
  s3.getObject({ Bucket: bucketName, Key: key }).promise().then( data => {
    fs.writeFile(destPath, data.Body, err => err ? reject(err) : resolve(destPath))
  }).catch( reject )
})

export const getImageInfo = imagePath => new Promise((resolve, reject) => {
  gm(imagePath).identify((err, info) => err ? reject(err) : resolve(info))
})

export const resizeImage = (info, size) => new Promise((resolve, reject) => {
  const resizeOpts = /^(\d+)x(\d+)([%@!<>])?$/g.exec( size )
  gm(info.path).resize(resizeOpts[1], resizeOpts[2], resizeOpts[3])
 .toBuffer(info.format, (err, buffer) => err ? reject(err) : resolve(buffer))
})

export const uploadImage = (buffer, info, bucketName, prefix) =>
  s3.upload({
    Bucket: bucketName,
    Key: `${prefix}/${ulid()}.${info.format}`,
    Body: buffer,
    ContentType: info['Mime type'],
  }).promise()
```

handler.js 쪽에서 이 코드를 불러와 사용해보자. 테스트로 objectList 로 가져온
0번째 이미지를 리사이즈 해볼 것 이다. js 파일들이 1개 이상 되었으므로 설정
파일과 실제 동작하는 코드를 분리하기 위해 코드들을 `src/` 디렉토리 밑으로 넣는
리팩토링도 함께 진행하자.

```diff
const AWS = require('aws-sdk')
+const imgUtil = require('./imgUtil')

+module.exports.resize = (event, context, callback) => {
+  let imgInfo
+  s3.listObjects({ Bucket: BUCKET_NAME }).promise().then( objectList => {
+    console.log( JSON.stringify(objectList,null,2) )
+    return downloadImage( BUCKET_NAME, objectList.Contents[0].Key )
+
+  }).then( imgPath => {
+    console.log( `imgPath: ${imgPath}` )
+    return getImageInfo( imgPath )
+
+  }).then( _imgInfo => {
+    imgInfo = _imgInfo
+    console.log( 'imgInfo: ' )
+    console.log( JSON.stringify(imgInfo,null,2) )
+    return resizeImage(imgInfo, '800x600')
+
+  }).then( buffer => {
+    return uploadImage(buffer, imgInfo, BUCKET_NAME, 'resize')
+
+  }).then( data => {
+    callback(null, { statusCode: 200, body: JSON.stringify(data,null,2) })
+
+  }).catch( err => {
+    callback(err)
+  })
+}
```


## serverless-webpack
위에서 `package` 설정을 했기 때문에 배포하게되면 여전히 handler.js 파일 하나만
올라가게 되는 것을 볼 수 있다. 어떻게 해야 할까?

package 설정에 include 로 `imgUtil.js` 파일을 추가해주고, 이 파일에서 사용하는
`gm` 이라는 모듈이 올라가도록 `node_modules/gm` 을 추가해주면 될까?  답부터
말하자면 좋지 않은 방법이다. 파일이나 모듈을 하나 추가할 때마다 `serverless.yml`
파일 package.include 에 설정을 하나씩 추가해야 하는 것은 굉장히 귀찮을 뿐만
아니라 `gm` 모듈이 사용하는 sub dependencies 들이 모두 `node_modules/gm` 아래에
설치된다는 보장도 없다. 다른 방법을 찾아야 하는데 그 해답은 `webpack` 이다.

webpack 은 브라우저에서 모던 javascript 코드를 돌리기 위한 bundling, minify 등의
전처리를 해주는 툴인데, `nodejs` 환경에서도 사용 할 수 있으며, `gm` 모듈과 같은
서드파티 모듈들을 실행가능한 단일 bundle 파일로 만들어주는 기능을 사용 할
것이다. `serverless-webpack` plugin 을 사용하면 serverless 배포시 자동으로
실행해주고 오프라인 개발환경까지 지원해준다.

```
$ yarn add webpack serverless-webpack
$ yarn add babel-loader babel-core babel-preset-env
```

webpack 은 다음과 같은 `webpack.config.js` 설정 파일을 사용한다.

```js
const path = require('path')
const slsw = require('serverless-webpack')
const _ = require('lodash')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: _.isEmpty(slsw.lib.entries) ? './handler.js' : slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: 'handler.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env'],
      }
    }],
  },
  target: 'node',
  externals: ['aws-sdk'],
}
```

test 해보자.
```
$ npx webpack
Hash: b7e7a2496ea7f73e2ccc
Version: webpack 4.16.1
Time: 2378ms
Built at: 2018-07-22 16:06:20
     Asset    Size  Chunks             Chunk Names
handler.js  61 KiB       0  [emitted]  main
Entrypoint main = handler.js
 [0] external "fs" 42 bytes {0} [built]
 [2] external "path" 42 bytes {0} [built]
 [3] external "child_process" 42 bytes {0} [built]
 [4] external "util" 42 bytes {0} [built]
 [5] external "os" 42 bytes {0} [built]
 [6] external "aws-sdk" 42 bytes {0} [built]
 [7] external "stream" 42 bytes {0} [built]
[13] ./src/handler.js 2.12 KiB {0} [built]
[14] ./src/imgUtil.js 2 KiB {0} [built]
[16] external "crypto" 42 bytes {0} [optional] [built]
[18] external "events" 42 bytes {0} [built]
[50] external "tty" 42 bytes {0} [built]
    + 45 hidden modules
```

좀 더 자세한 로그를 보고싶다면 `--display-modules` 옵션을 붙여서 다시한번
실행해보자.  `fs` 같은 nodejs native library 들은 `external` 디펜던시로 처리되어
함께 번들링 되지 않는다. 또한 `aws-sdk` 도 Lambda 실행환경에서 제공되기 때문에
올릴 필요가 없어서 webpack 설정의 `externals` 설정으로 번들링을 제외시키는 것이
좋다.

`serverless.yml` 에 `serverless-webpack` 설정을 해야한다.

```yaml
plugins:
  - serverless-webpack

custom:
  webpack:
    includeModules: false
    webpackConfig: webpack.config.js
    packager: yarn
```

이제 serverless deploy 하게 되면 자동으로 webpack 이 실행되며 번들링된 파일이
패키징되어 upload 된다.

```
$ npx sls deploy -v
```

에러 없이 배포와 실행이 잘 되었다면 AWS Web Console 을 통해 `resize` prefix 아래
resize 된 파일이 생성되었는지 확인하자.

# event 설정
지금까지는 serverless 의 invoke 명령을 통해서 즉, 내부적으로 AWS API 를 통해
Lambda Function 을 트리거 시켰다. events 설정을 통해 Lambda Function 을 여러가지
방법으로 트리거 시킬 수 있다. 가장 많이 사용되는 2가지 방법에 대해 알아보자.

## API Gateway
API Gateway 를 통해 http 요청으로 Lambda Funtion 을 트리거 시킬 수 있게 각각의
Function 에 `events` 설정을 추가해보자.

```diff
 functions:
   hello:
     handler: handler.hello
+    events:
+      - http:
+          path: hello
+          method: get
   s3ObjectList:
     handler: handler.s3ObjectList
+    events:
+      - http:
+          path: s3ObjectList
+          method: get
```

이것은 handler.hello Function 을 `/hello` path 로, handler.s3ObjectList 를
`/getObjectLilst` path 를 통해 트리거 시킬 수 있도록 API Gateway 를 설정하라는
의미이다.  해본 사람은 알겠지만 AWS Web Console 로 이정도 설정 하는 것도 꽤
귀찮고 어려운 작업이다.  `serverless` 의 첫번째 장점이 바로 이런 복잡한 인프라
자원의 설정을 yml 파일을 통해 알아서 자동으로 해주는 `Infrastructure as code` 를
구현할 수 있게 해주는 점이다. 배포해보자.

```
$ npx sls deploy --verbose
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (651 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
......................
Serverless: Stack update finished...
Service Information
service: my-first-serverless-service
stage: dev
region: ap-northeast-2
stack: my-first-serverless-service-dev
api keys:
  None
endpoints:
  GET - https://l4gj9125q9.execute-api.ap-northeast-2.amazonaws.com/dev/hello
  GET - https://l4gj9125q9.execute-api.ap-northeast-2.amazonaws.com/dev/s3ObjectList
functions:
  hello: my-first-serverless-service-dev-hello
  getObjectList: my-first-serverless-service-dev-getObjectList
Serverless: Removing old service artifacts from S3...
```

output 의 `endpoints` 를 주목하자. `l4gj9125q9` 와 같이 고유의 API Gateway
주소가 생성되고 2개의 주소를 각각 브라우저로 접속해서 결과가 잘 나오는지
확인해보자.

## S3 ObjectCreated event
s3 에 파일을 업로드하면 발생하는 ObjectCreated 이벤트로 Lambda Function 을
호출해보자. 위에서 작성한 resize handler 는 s3 `upload` prefix 아래에 있는
첫번재 이미지를 resize 하게 작성되어 있다. 이것을 조금 변경하여 `upload` prefix
로 새로운 이미지가 올라왔을때 그 이미지를 resize 한뒤 `resize` prefix 에 업로드
시키는 코드로 변경해보자.

```diff
  resize:
    handler: handler.resize
    events:
    - s3:
      bucket: ${env:SLS_BUCKET_NAME}
        event: s3:ObjectCreated:*
        rules:
        - suffix: .png
```

### serverless-plugin-exist-s3
// TODO

# react
마지막으로 지금까지 만든 기능들을 Web UI 로 만들어보자.  react 를 사용할 것인데
webpack 을 이미 적용했기 때문에 server side 렌더링을 위한 코드만 몇 줄 적으면
react 로 만든 웹 페이지도 어렵지 않게 추가 할 수 있다.

```
$ yarn add react react-dom babel-preset-react
```

```js
// App.js
```

html 페이지를 내려주는 Labmda Function 하나를 더 만들어 보자.

```yml

```

s3 에 있는 이미지 파일들은 s3 버킷이 public 설정이 되어있지 않는 한 접근 할 수
없다. 하지만 public 설정은 보안에 취약하고 presigned url 을 통해 내려주자.

# SNS
마지막으로 serverless 설정 몇줄을 추가하여 Lambda Function 에 에러가 있을때
AWS SNS 를 통해 알림을 받도록 추가해보자.



# References

- [pets-cattle-and-nowinsects][petcattleinsect]: Stateful 자원을 **Pets**,
Stateless 자원을 **Cattle**, Serverless 자원을 **Insects** 에 비유하여 설명한
글이다.
- 

[serverless]: https://serverless.com/
[serverless_framework]: https://serverless.com/framework/
[aws_sdk_js]: https://github.com/aws/aws-sdk-js
[npx]: https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner
[sls_package]: https://www.npmjs.com/package/serverless
[webconsole_labmda]: https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions
[webconsole_cloudwatch]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:
[petcattleinsect]: https://blog.rackspace.com/pets-cattle-and-nowinsects
[velopert_lambda]: https://velopert.com/3546
[aws_lambda]: https://aws.amazon.com/ko/lambda/?nc1=h_ls
[aws_apigateway]: https://aws.amazon.com/ko/api-gateway/?nc1=h_ls
[yaml]: http://yaml.org/
[lambda_execution_model]: https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/running-lambda-code.html
[yarn]: https://yarnpkg.com/en/
[npm]: https://www.npmjs.com/

https://www.slideshare.net/awskorea/aws-lambda-100-sangpil-kim
https://serverless.com/framework/docs/providers/aws/guide/deploying#how-it-works
https://github.com/serverless/examples
https://github.com/mgi166/serverless-image-resizer/blob/master/src/imageResizer.js

https://brunch.co.kr/@tigeryoonz/16
http://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0002145647
https://blog.rackspace.com/pets-cattle-and-nowinsects