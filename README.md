# <center> Bixby : covid19Prevention 캡슐 </center>

## covid19Prevention 캡슐이란?

covid19Prevention 캡슐은 서울특별시에서 제공해주는 서울 열린데이터 광장 데이터의 `서울특별시 코로나19 백신 예방접종 현황` 데이터를 이용하여 서울시의 백신 예방접종 현황을 빅스비를 통해 안내해주는 캡슐입니다.

서울 특별시 코로나19 백신 예방접종 현황 데이터   
http://data.seoul.go.kr/dataList/OA-20914/S/1/datasetView.do

## covid19Prevention 캡슐 사용 방법

1. 사전에 BixbyIDE 설치가 필요합니다.
https://bixbydevelopers.com/

2. 코드를 다운받아 설치한 BixbyIDE에서 열어주세요.

3. crtl+7 혹은 IDE왼편의 휴대폰 모양을 클릭하여 시뮬레이터를 열어주세요.

4. 시뮬레이터에 발화를 입력하시면 원하시는 동작을 확인할 수 있습니다.

## 📁폴더 구조

+ 📁code
	- SeoulVaccinationPeopleCount.js
+ 📁models
	+ 📁actions
		+ SeoulVaccinationPeopleCount.model.bxb
	+ 📁concepts
		+ 📁primitive
		+ 📁structure
+ 📁resources
	+ 📁base
		+ endpoints.bxb
	+  📁bixby-mobile
		+ 📁dialog
		+ 📁layout
		+ 📁views
	+ 📁bixby-mobile-ko-KR/training
		+ training

### ✔SeoulVaccinationPeopleCount action

* 지원하는 input : date (Optional)

| No | 발화| 동작 | template | speech | 
|--|--|--|--|--|
| 1 | 오늘 예방접종자 수 보여줘 | 어제 예방접종자 수를 보여줍니다. (API가 실시간으로 업데이트 되지 않습니다. 그러므로 오늘 대신 어제의 예방접종자 수를 보여줍니다.) | 어제 서울시 코로나19 백신 예방접종 현황이에요 | 그 날짜는 지원하지 않아요. 대신 어제 현황을 보여줄게요.
| 2 | 어제 예방접종자 수 보여줘 | 어제 예방접종사 수를 보여줍니다. | N월 N일 서울시 코로나19 백신 예방접종 현황이에요 | N월 N일 서울시 코로나19 백신 예방접종 현황이에요
| 3 | 작년 예방접종자 수 보여줘 | 어제 예방접종자 수를 보여줍니다. (2021년 4월 21일부터 데이터가 존재합니다. 존재하지 않는 데이터를 요구할 경우 어제의 예방접종자 수를 보여줍니다.) | 어제 서울시 코로나19 백신 예방접종 현황이에요 | 어제 서울시 코로나19 백신 예방접종 현황이에요
| 4 | 내일 예방접종자 수 보여줘 | 어제 예방접종자 수를 보여줍니다. (존재하지 않는 데이터를 요구할 경우 어제의 예방접종자 수를 보여줍니다.) | 어제 서울시 코로나19 백신 예방접종 현황이에요 | 그 날짜는 지원하지 않아요. 대신 어제 현황을 보여줄게요.
| 5 | 2021년 5월 5일 예방접종자 수 보여줘 | 2021년 5월 5일 코로나 예방접종자 수를 보여줍니다. | 5월 5일 서울시 코로나19 백신 예방접종 현황이에요 | 5월 5일 서울시 코로나19 백신 예방접종 현황이에요
| 6 | 예방접종자 수 보여줘 | 최신 data인 어제 예방접종자 수를 보여줍니다. | 어제 서울시 코로나19 백신 예방접종 현황이에요 | 어제 서울시 코로나19 백신 예방접종 현황이에요

### UI

> 예방접종자 수 보여줘(발화일 2021.10.19)

![img](/playground.covid19Vaccination/assets/images/screenshot/screenshot-2021-10-19T08-01-56.909Z-bixby-mobile-ko-KR-device-s.png)

