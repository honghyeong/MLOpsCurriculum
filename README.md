# MLOpsCurriculum

I’m an MLOps Engineer at Corca.
<br>
<br>

## Phase 1

> `EC2 endpoint : 3.34.122.192:3000` <br>

> `ECS endpoint : 3.38.172.73:3000`

<br>
<br>

### summary

- Phase 1의 구성은 크게 `MLOps의 정의`, `RESTful API`, `DB`을 공부하고 Corca의 code convention을 바탕으로 `API를 개발`하고. MLOps CI/CD의 기초가 되는 `Docker`, `Docker-compose`, `AWS(EC2, ECS) 배포`에 대해서 알아보고 개발한 API를 배포한다.

<!-- - MLOps라는 매우 생소한 직무에 대하여, MLOps의 정의는 무엇인지 DevOps의 정의를 통하여 알 수 있다. MLOps의 역할은 ML product 배포의 자동화(CI/CD)와 테스팅 자동화, 모니터링을 통해서 더 나은 모델을 기반으로 ML Product를 안정적으로 개발하고 빠르게 배포하여 더 나은 product를 지속적으로 공개하고, 시장에서 유리한 포지션을 점할 수 있게 된다.
-  -->
<br>
<br>

### Review

- MLOps라는 직무가 매우 생소했는데, ML product의 지속적인 학습, 테스팅, 모니터링, 배포(CI/CD)에서의 MLOps의 중요성을 배우며 우리 Corca에서 어떤 역할을 해야하는지 느끼고 필요한 기본 지식에 대한 기초를 다질 수 있었다.
- 단순한 API를 개발함에 있어서도 DB, RESTful API 명세를 바탕으로 개발할 때 SOLID 원칙을 지키면서, 여러 예외상황을 생각한 서버를 개발하는 것이 쉽지 않다는 것을 알 수 있었다.
- Code Review와 Corca의 convention을 통해서 개발에 중요한 MVC 패턴, 예외처리 등 지식 뿐 아니라 미처 고려하지못했던 점을 보완할 수 있어 리팩토링을 통해 스스로 성장함을 느꼈다.
- 특히, Docker, Docker-compose, EC2, ECS 배포를 공부하며 많은 어려움을 겪어서 Computer Network, Computer Architecture에 대해 좀 더 이해하는 시간을 가질 수 있었다.
- 서버 개발과 배포에 기초가 되는 부분을 너무 잘 준비돼있어, Phase 1에서만 해도 많이 성장함을 느낄 수 있었다. 앞으로 얼마나 더 성장할 수 있을지 기대되고 더 노력하고 싶어진다.

<br>
<br>

### Feedback

- API 개발 명세를 바탕으로 TDD를 통해 코드를 짠다면 더욱 체계적인 서버 개발을 익힐 수 있지 않을까 생각한다. 하지만, TDD에 성능테스트가 있어서 지금 커리큘럼도 충분히 좋은 것 같다!
- 내용이 알기쉽게 잘 정리돼있어 서버 개발과 배포에 기초가 되는 부분을 잘 배울 수 있었다.
- 어려웠던 점 : mac m1 환경에서 docker build default architecture가 arm64 이라서 exec format error를 겪어서 시간 소요가 많았다. docker buildx build --platform=linux/amd64 옵션을 통해서 빌드하고 ECR에 push해야 ecs, docker ecs cli 에서 문제가 생기지않으므로 다음 커리큘럼 진행자에게 도움이 되었으면 한다. [link 1](https://appleg1226.tistory.com/35)

```
docker buildx build --platform=linux/amd64 -t <tag> .
```

---

## Phase2

### Testing

> Unit Testing Command : `yarn test`

> E2E Testing Command : `yarn test:e2e`

> Locust Testing : [Locust Testing](https://github.com/honghyeong/MLOpsCurriculum/blob/main/assignments/performance.md)

### Summary

- `Testing`, `CI/CD`, `IaC`, `Monitoring`, `LoadBalancing`, `Architecture`
- Phase 1에서 개발한 간단한 서버를 ECS 를 통해서 배포하고, `Testing` 프레임워크에 맞는 testing library를 활용하여 Unit Testing, E2E Testing 코드를 작성한다.
- `Github Actions` 를 활용하여 서버에 대한 코드 변경 사항을 Github에 push 할때 Unit Testing, E2E Testing, ECS 인스턴스 배포를 자동화한다.
- 안정적인 서버를 운영하기 위해서 인프라 설정을 코드화 하는 `Iac` ( Infra as code)를 통해서 다른 환경에서도 동일한 인프라를 구축하고, 확장할 수 있다.
- 배포한 서비스에 대해서 잘못된 접근이나 지속적인 유지보수를 `LMA` ( Logging, Monitoring, Alerting) 하며, AWS SNS, Lambda를 이용하여 CPU Utilization Alerting, Error Alerting Message을 Slack으로 날리고, 서버를 지속적으로 관찰하며 관리할 수 있다.
- CPU Utilization을 CloudWatch를 통해 모니터링하고, 50% 를 넘으면 자동으로 ECS를 통해서 task를 늘리는 `Load Balancing` 을 통하여, 트래픽에 따라 Scale out, Scale in 하며 안정적인 서버를 운영할 수 있다.

- 10 common `architecture` 에 대해서 공부하면서, 각 서비스 별로 유용한 아키텍처를 사용할 수 있다. Uber, Woowahhan, HyperConnect 등 기업에서 서비스 특성에 맞는 아키텍처 설계와 설계 이유를 살펴보며 코르카에 적합한 아키텍처를 고민하고 적절한 아키텍처를 설계해본다.

### Review

- Phase 1을 진행하며 알게됐던 DevOps, MLOps 의 개념은 너무나 추상적이였고, 지금 내가 코르카에 어떻게 도움이 될 수 있을지, 프로젝트에서 어떠한 역할을 담당하며, CI/CD, Monitoring, Testing 툴은 어떤 것이 있고, 활용할 수 있을지 불분명하고 불안했다.
- MLOps Curriculum을 진행하면서, 기존에 진행되는 코르카의 다양한 프로젝트에서 MLOps가 사용했던 Github Actions, Pulumi, AWS 의 사용방법에 대해서 스스로 학습하면서 프로젝트의 흐름과 MLOps의 필요성에 대해서 구체화하고, 자신감을 키울 수 있는 시간이였다.
- Phase 1에 비해서 맞닥뜨리는 오류나, 스스로 생각하며 공부해야할 내용이 많아졌고, 스스로를 개선해나갈 여지가 많이 느낄 수 있는 소중한 기회라고 생각했다.
- MLOps가 사용하는 다양한 툴의 장단점을 비교하고 프로젝트에 적절하게 도입하는 역량 뿐만아니라, 유지보수와 확장이 가능한 코드를 작성하기 위한 클린아키텍쳐, 리펙토링, 클린코드 공부의 필요성을 느끼고 개발 공부도 소홀히 하지않아야겠다고 자신의 부족함을 많이 느꼈다. 앞으로 더욱 더 정진해서 코르카에서 없어서는 안될 사람이 되고싶다.

### Feedback

- `CI/CD` : unit testing 은 이후에 Pulumi 나 추가적인 디렉토리가 생기면서 의존성 오류가 생길 수 있는데, 쉘스크립트를 이용하거나, tsconfig.build.json 등을 이용한 각 프레임워크 별 빌드 환경을 관리하는 방법을 추가하는 것도 좋을 것 같다.

- `Monitoring` : CloudWatch를 통해서 다양한 지표를 확인해볼 수 있는데, 코르카에서 유용하게 사용하거나 어떤 지표를 어떻게 활용했었다 라는 내용이 추가된다면, 모니터링의 필요성을 조금 더 강하게 느낄 수 있을 것 같다.
