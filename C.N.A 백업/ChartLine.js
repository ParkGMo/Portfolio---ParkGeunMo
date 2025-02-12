import React from "react";
import { Line } from "react-chartjs-2";
import { monthMap } from "../../lib/changeNames.js"; // monthMap 임포트
import { stringToColor } from "../../utils/uniqueColour.js";

// 문자열을 색상으로 변환하는 함수
// const stringToColor = (str) => {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash); // 문자열을 해시화
//   }

// 해시 값을 사용해 색상을 생성
//   const r = (hash & 0xff0000) >> 16;
//   const g = (hash & 0x00ff00) >> 8;
//   const b = hash & 0x0000ff;
//   const alpha = 0.5;
//   return `rgb(${r}, ${g}, ${b}, ${alpha})`;
// };

function ChartLine({ data, label, dataKey }) {
  // monthMap의 키를 이용하여 월 배열을 생성
  const months = Object.keys(monthMap); // monthMap의 키를 배열로 가져옴

  // 각 국가 데이터를 월별로 변환
  const datasets = data.map((countryData) => {
    // 월별 데이터 값을 추출하여 배열로 만듦
    const monthData = months.map((month) => {
      // 'date'는 각 국가별 월별 데이터를 포함한 배열이므로, 해당 월의 값을 찾아서 배열에 넣음
      const monthObj = countryData.date.find(
        (item) => Object.keys(item)[0] === monthMap[month]
      ); // monthMap을 통해 값 찾아오기
      return monthObj ? Object.values(monthObj)[0] : 0; // 값이 없으면 0으로 처리
    });

    return {
      label: countryData.country,
      data: monthData, // 월별 데이터를 넣음
      borderColor: stringToColor(countryData.country), // 각 국가별로 고정된 색상 적용
      backgroundColor: stringToColor(countryData.country), // 배경 색상도 고정 색상으로 설정
      fill: false, // 배경색을 채우지 않도록 설정
    };
  });

  const chartData = {
    labels: months, // x축 레이블을 monthMap의 키값으로 설정
    datasets: datasets, // 준비한 데이터셋
  };

  return <Line data={chartData} />;
}

export default ChartLine;
