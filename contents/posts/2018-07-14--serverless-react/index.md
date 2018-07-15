---
title: serverless react
subTitle: serverless react
category: guide
published: true
---

[Serverless Framework][serverless_framework] 는 AWS Lambda 와 API Gateway 와
같은 **serverless architectureh** 들을 설정 코드를 통해 쉽게 배포하고 관리 할 수
있는 툴이다. 평소 API Gateway 와 Lambda 를 WEB Console 을 통해 접해봤거나
어떤 서비스인지 알고만 있어도 serverless 를 시작하기에 무리가 없다.

# serverless 설치 (feat. npx)
serverless 는 nodejs 로 개발되었다. npm 이나 yarn 의 global 옵션으로 설치 할 수
있는데 요즘엔 global 옵션 설정보다 `npx` 를 사용하는 것이 더 좋아보인다.  새로운
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
  region: us-east-1

functions:
  hello:
    handler: handler.hello
```

`us-east-1` 리전에 `hello` 란 이름의 Lambda function 을 만든다는 의미이다.
`handler` 를 주목하자. `handler.hello` 값은 `handler.js` 파일의 `hello` 란
이름의 export 된 함수를 실행하겠다는 의미이다. 아래와 같이 파일을 작성하자.

```js
// handler.js
module.exports.hello = (event, context) => {
  return { statusCode: 200, body: 'Hello serverless!!' };
};
```

해당 설정으로 Lambda function 을 생성해보자. 생성전 먼저 serverless 가 AWS API
를 사용할 수 있는 권한이 있어야 하는데, 권한있는 IAM 계정의 `ACCESS_KEY` 를
.envrc 파일에 아래와 같이 설정하자.

```
# .envrc
export AWS_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXX
export AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

아래 명령어를 참고해서 `.envrc` 파일의 내용을 환경변수로 셋팅해준 뒤 바로
배포해보자. `serverless` 를 줄여 `sls` 로 사용할 수도 있다.

```sh
$ source .envrc
$ npx sls deploy --verbose
```

잘 배포 되었는지 AWS Web Console 을 통해 확인해봐도 좋다. `serverless invoke`
명령을 통해 배포한 Lambda function 을 실행해 볼 수 있는데, 아래 명령어로
배포한 hello handler 가 잘 동작하는지 확인해 보자.

```
$ npx sls invoke -f hello
```

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
+   events:
+     - http:
+         path: hello
+         method: get    
```

ㅏㅏㅏㅏ
[serverless]: https://serverless.com/
[serverless_framework]: https://serverless.com/framework/
