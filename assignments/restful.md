# Delivery money

> POST /delivery X

- feedback : path에는 동사가 포함되지않는 편이 좋다, 동사는 method를 최대한 활용해서 표현해야한다.
- feedback 후 : 송금 == 거래 생성

> POST /transaction
> 
> POST /transaction/transfer
> 
> POST /transaction/send


# Parameter

Name|Type|Description|Required
---|---|---|---|
s_id|int|송신 유저id|O
r_id|int|수신 유저id|O
amount|int|금액|O


# Response

Name|Type|Description
---|---|---|
success|bool|송금 성공 여부
created_at|DateTime|송금 요청 시간
