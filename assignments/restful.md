# Delivery money

> POST /delivery


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
