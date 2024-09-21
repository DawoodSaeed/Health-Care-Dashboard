function filterDataByTimeframe(data, timeframe) {
  const currentDate = new Date();

  const timeframes = {
    "1 year": 12,
    "6 months": 6,
    "2 years": 24,
    "3 years": 36,
    "8 months": 8,
  };

  const monthsOffset = timeframes[timeframe];

  if (!monthsOffset) {
    throw new Error(
      "Invalid timeframe. Valid options are: 1 year, 6 months, 2 years, 3 years, 8 months"
    );
  }

  const cutoffDate = new Date(currentDate);
  cutoffDate.setMonth(currentDate.getMonth() - monthsOffset);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(`${item.year}-${getMonthIndex(item.month)}-01`);
    return itemDate >= cutoffDate;
  });

  return filteredData;
}

function getMonthIndex(month) {
  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  return monthMap[month];
}

export { filterDataByTimeframe, getMonthIndex };
