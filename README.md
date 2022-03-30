# MLOpsCurriculum

I’m an MLOps Engineer at Corca.
<br>
<br>

# Phase 1

- `EC2 endpoint : 3.34.122.192:3000`
- `ECS endpoint : 3.38.172.73:3000`

## summary

- Phase 1의 구성은 크게 `MLOps의 정의`, `RESTful API`, `DB`을 공부하고 Corca의 code convention을 바탕으로 `API를 개발`하고. MLOps CI/CD의 기초가 되는 `Docker`, `Docker-compose`, `AWS(EC2, ECS) 배포`에 대해서 알아보고 개발한 API를 배포한다.

<!-- - MLOps라는 매우 생소한 직무에 대하여, MLOps의 정의는 무엇인지 DevOps의 정의를 통하여 알 수 있다. MLOps의 역할은 ML product 배포의 자동화(CI/CD)와 테스팅 자동화, 모니터링을 통해서 더 나은 모델을 기반으로 ML Product를 안정적으로 개발하고 빠르게 배포하여 더 나은 product를 지속적으로 공개하고, 시장에서 유리한 포지션을 점할 수 있게 된다.
-  -->

## Review

- MLOps라는 직무가 매우 생소했는데, ML product의 지속적인 학습, 테스팅, 모니터링, 배포(CI/CD)에서의 MLOps의 중요성을 배우며 우리 Corca에서 어떤 역할을 해야하는지 느끼고 필요한 기본 지식에 대한 기초를 다질 수 있었다.
- 단순한 API를 개발함에 있어서도 DB, RESTful API 명세를 바탕으로 개발할 때 SOLID 원칙을 지키면서, 여러 예외상황을 생각한 서버를 개발하는 것이 쉽지 않다는 것을 알 수 있었다.
- Code Review와 Corca의 convention을 통해서 개발에 중요한 MVC 패턴, 예외처리 등 지식 뿐 아니라 미처 고려하지못했던 점을 보완할 수 있어 리팩토링을 통해 스스로 성장함을 느꼈다.
- 특히, Docker, Docker-compose, EC2, ECS 배포를 공부하며 많은 어려움을 겪어서 Computer Network, Computer Architecture에 대해 좀 더 이해하는 시간을 가질 수 있었다.
- 서버 개발과 배포에 기초가 되는 부분을 너무 잘 준비돼있어, Phase 1에서만 해도 많이 성장함을 느낄 수 있었다. 앞으로 얼마나 더 성장할 수 있을지 기대되고 더 노력하고 싶어진다.

## Feedback

- API 개발 명세를 바탕으로 TDD를 통해 코드를 짠다면 더욱 체계적인 서버 개발을 익힐 수 있지 않을까 생각한다. 하지만, TDD에 성능테스트가 있어서 지금 커리큘럼도 충분히 좋은 것 같다!
- 내용이 알기쉽게 잘 정리돼있어 서버 개발과 배포에 기초가 되는 부분을 잘 배울 수 있었다.
