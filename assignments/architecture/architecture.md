# Corca Bot Lunch Recommendation Architecture

- 실시간성이 필요하지않다고 생각하여 Event drivent MSA 보다 API Gateway를 이용한 Load balancing + Micro Service Architecture 가 적합하다고 판단.

## Components

> Weather

- 날씨 정보 API
- 기온, 강우, 습도 정보 제공

> Corca Bot

- Employee DB의 Employee 정보를 이용하여 팀 선정 기능 제공 (Random Matching)
- Time Trigger
  - 10:30 am : 코르카 봇으로 점심 식사 여부 체크 요청
  - 01:00 pm : 코르카 봇으로 점심 메뉴 추천 리뷰 요청
- 점심 식사에 참여하는 팀별 Emplyoee 정보와 점심 메뉴 추천 요청을 API Gateway로 전달 (MSA)
- Review가 완료되면 review 결과 API Gateway로 전달
- Recommendation 응답이 돌아오면 각 음식점별 피드백 받음

> Random Recommendation

- Recommendation instance는 로드밸런싱을 통해 요청 수에 따라 scale in, scale out 이 가능하다.

  > > Restaurant Recommendation Logic

  - 필터링된 음식점 정보, Employee 정보, 날씨를 바탕으로 적절한 메뉴 추천

  - 점심 메뉴 추천 요청이 들어오면, 메뉴 추천 결과를 API Gateway로 response.

  > > Filtering Logic

  - API를 통해 가져온 음식점 명단을 거리순으로, 리뷰를 바탕으로, 또는 필터링 조건을 커스터마이징하여 필터링한다.

> Review DB

- Restaurant 별 리뷰 정보 저장

## Description

![architecture image](./image.png)
