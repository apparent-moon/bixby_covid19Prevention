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
    //var dateZ = dates.ZonedDateTime.fromDate(date) //date를 ZonedDateTime 형식으로 바꾼것
    
      //오늘 날짜의 값
      var todayYear = today.date.year
      //month에 -1을 해야 new Date할 때 month가 제대로 나옴.
      var todayMonth = today.date.month - 1
      var todayDay = today.date.day

      //사용자가 발화한 날짜의 값
      var dateYear = date.year
      var dateMonth = date.month - 1
      var dateDay = date.day

      var Today = new Date(todayYear, todayMonth, todayDay, 0, 0, 0, 0)
      var Dday = new Date(dateYear, dateMonth, dateDay, 0, 0, 0, 0)
      var FirstDate = new Date(2021, 3, 21,0,0,0,0)

      console.log(Dday);
      console.log(FirstDate);

      var gap = Dday.getTime() - Today.getTime()
      var dday_Result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1

      var firstDataGap = FirstDate.getTime() - Today.getTime()
      var firstDataGap_Result = Math.floor(firstDataGap / (1000 * 60 * 60 * 24)) * -1

      //dday 결과값이 오늘이 아니고, 미래의 값이 아닐 경우에
      if(dday_Result !=  0 && dday_Result > 0 && dday_Result <= firstDataGap_Result){
      var start_Index = dday_Result
      var end_Index = start_Index
      }else{
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

  target = response.tvCorona19VaccinestatNew.row[0].FIR_SUB.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") //숫자에 ,를 넣는것. 이렇게 해서 넣으려면 primitive 타입을 text로 변경 해줘야 합니다. 현재는 integer라서 들어가지않음!

  dateResponseDate = response.tvCorona19VaccinestatNew.row[0].S_VC_DT.split('.')
  
  responseYear = parseInt(dateResponseDate[0])
  responseMonth = parseInt(dateResponseDate[1])
  responseDay = parseInt(dateResponseDate[2])

  return {
    seoulInoculationTarget: response.tvCorona19VaccinestatNew.row[0].FIR_SUB,
    peopleCount_1st: response.tvCorona19VaccinestatNew.row[0].FIR_INC1,
    peopleCount_1st_Sum: response.tvCorona19VaccinestatNew.row[0].FIR_INC,
    peopleCount_2nd: response.tvCorona19VaccinestatNew.row[0].SCD_INC1,
    peopleCount_2nd_Sum: response.tvCorona19VaccinestatNew.row[0].SCD_INC,
    vaccinationDate: {
      vaccinationYear : responseYear,
      vaccinationMonth : responseMonth,
      vaccinationDay : responseDay
    }
  }
}