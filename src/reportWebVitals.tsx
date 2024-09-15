interface Metric {
  name: string;
  delta: number;
  id: string;
}

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry) {
    const metric: Metric = {
      name: "example_metric",
      delta: 0,
      id: "1",
    };

    onPerfEntry(metric);
  }
};

export default reportWebVitals;