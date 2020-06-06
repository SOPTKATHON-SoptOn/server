# SOPKATHON_SOPT-ON

leader Table

| leaderIdx | leaderName | leaderPart | leaderId | password | salt | leaderFn | 
|---------|----------|----------|--------|----------|------|--------|
|    0    |   정수연 |  chairman |  soptchair  |     123     |    lngzkdrng  |    26    | 
|    1    |   이세림 |  v_chairman |   soptvchair   |   123       |     kdnlz |    26    | 
|    2    |   김현지 |  manager |    soptmanager    |   123       |    ragrdg  |    26    | 
|    3    |   박경선 |  server |    soptserver  |     123     |  sgrdr    |   26     | 

user Table

| userIdx | userName | userPart | userId | password | salt | userFn | userScore |
|---------|----------|----------|--------|----------|------|--------|-----------|  
|    0    |   정현지 |  plan |  s123  |     123     |    lngzkdrng  |    26    | default=2 |
|    1    |   김영민 |  android |   d24  |   123       |     kdnlz |    26    | default=2 |
|    2    |   조충범 |  server |    sh47    |   123       |    ragrdg  |    26    | default=2 |
|    3    |   박지혜 |  design |    es68  |     123     |  sgrdr    |   26     | default=2 |


파트장들이 미리 Table에 알맞는 데이터를 집어넣고
출석체크를 할 때 파트원이 입력한 답안을 클라에서 받아 sql문에서
seminarWeek에 알맞는 seminarCode이고 날짜와 시간 맞으면 True로 return 해서 출석점수 update문으로 -0?
파트장이 정한 시간보다 5분 늦으면 지각이므로 출석점수 -0.5?
1시간 이상 늦거나 userIdx가 답안제출 안할경우? sql문에서 null일 경우?
만약 !seminarCode일 경우 False로 return 해줌

seminar Table

| seminarIdx  | seminarDate | seminarTime | seminarCode | leaderIdx |
|-------------|-------------|-------------|-------------|-----------|
|       1     |  2020-04-18 | 14:00:00    |   257       |     3     |
|       2     |  2020-04-18 | 14:00:00    |   506       |     4     |
|       3     |  2020-04-18 | 14:00:00    |   913       |     5     |
|       4     |  2020-04-18 | 14:00:00    |   124       |     6     |


attendance Table

0이면 출석, 1이면 지각, 2이면 결석 (*setTimeout 1시간 이내 안들어오면 결석처리이므로 15:00:01로 지정*)

| attendanceIdx  | userIdx | attendanceDate | attendanceTime | attendance | 
|----------------|---------|----------------|----------------|------------|
|       1        |     1   |  2020-04-18    | 14:02:03       |   0        |
|       2        |     3   |  2020-04-18    | 14:06:40       |   1        |
|       3        |     2   |  2020-04-18    | 15:01:00       |   2        |
|       4        |     4   |  2020-04-18    | 14:04:59       |   0        |

