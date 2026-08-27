import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

function CryptoChart({ data }) {
  const chartContainer = useRef();

  useEffect(() => {
    const chart = createChart(chartContainer.current, {
      width: chartContainer.current.clientWidth,
      height: 400,
      layout: { background: { color: '#ffffff' }, textColor: '#333' },
      grid: { vertLines: { color: '#eee' }, horzLines: { color: '#eee' } },
      timeScale: { borderVisible: false },
      rightPriceScale: { borderVisible: false },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#0ECB81',
      borderUpColor: '#0ECB81',
      downColor: '#F6465D',
      borderDownColor: '#F6465D',
    });

    candleSeries.setData(data);
    return () => chart.remove();
  }, [data]);

  return <div ref={chartContainer} style={{ width: '100%', height: '400px' }} />;
}

export default CryptoChart;
