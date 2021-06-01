var config = require('config');
var http = require('http');
var console = require('console');
var dates = require('dates');

const baseurl = "http://openapi.seoul.go.kr:8088/"
const key = "66715342496f6861393448414a4c49/"
const type = "json/"
const service = "tvCorona19VaccinestatNew/"
var start_Index, end_Index;

module.exports.function = function SeoulVaccinationPeopleCount(date) {

  const now = dates.ZonedDateTime.now()
  const first_Data_Date = dates.ZonedDateTime.of(2021, 4, 21); //이날부터 데이터가 있습니다. 그전 데이터는 존재하지 않습니다.

  if (date) {
    //date가 존재할 경우

    var today = now.getDateTime();
    var dateZ = dates.ZonedDateTime.fromDate(date) //date를 ZonedDateTime 형식으로 바꾼것

    if (first_Data_Date.isBefore(dateZ) && !first_Data_Date.isAfter(dateZ)) {

      console.log("1")
      // 2021년 4월 21일 이후 부터 오늘까지

      if (today.date.year == date.year && today.date.month == date.month && today.date.day == date.day) {
        // 오늘의 결과는 보여줄 수 없으므로 어제 결과를 보여줌.
        var start_Index = 1;
        var end_Index = 1;
      } else {
        var periodHour = now.durationUntil(dateZ).periodHours
        var periodDay = now.durationUntil(dateZ).periodDays
        if (periodDay == 1 || periodDay == undefined && periodHour == 24) {
          //어제. 값이 계속 변동되어서 2가지 조건 주었음
          var start_Index = 1;
        } else {
          start_Index = periodDay
        }
        end_Index = start_Index;
      }

    } else {
      //2021년 4월 21일 이전 혹은 오늘 이후의 값을 요구할경우 어제의 값을 보여준다.
      var start_Index = 1;
      var end_Index = 1;
    }
  } else {
    //date값이 들어오지 않을때는 default값으로 어제 결과를 보여줌.
    var start_Index = 1;
    var end_Index = 1;
  }


  var url = baseurl + key + type + service + start_Index + "/" + end_Index + "/"

  const response = http.getUrl(url, { format: 'json' });

  return {
    seoulInoculationTarget: response.tvCorona19VaccinestatNew.row[0].FIR_SUB,
    peopleCount_1st: response.tvCorona19VaccinestatNew.row[0].FIR_INC1,
    peopleCount_1st_Sum: response.tvCorona19VaccinestatNew.row[0].FIR_INC,
    peopleCount_2nd: response.tvCorona19VaccinestatNew.row[0].SCD_INC1,
    peopleCount_2nd_Sum: response.tvCorona19VaccinestatNew.row[0].SCD_INC
  }
}