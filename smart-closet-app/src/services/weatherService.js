export async function fetchWeatherSummary(location = 'Taipei') {
  return {
    location,
    temperature: 24,
    condition: '多雲',
    humidity: 0.68,
  };
}