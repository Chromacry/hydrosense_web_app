import { lightGreen } from "../../constants/DesignConstant";

export const OverallPercentageData = (data?: number[]) => {
  return {
    labels: [],
    datasets: [{
      data: data ?? [0, 100],
      backgroundColor: [lightGreen, 'lightgrey'],
      borderColor: 'lightgrey',
      borderWidth: 2,
      cutout: '70%',
      circumference: 360,
    }]
  }
};

export const OverallPercentageOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false // <-- this option disables tooltips
    }
  }
};