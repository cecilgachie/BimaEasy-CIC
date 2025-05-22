import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaChartBar, FaChartPie, FaTachometerAlt } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function DataAnalytics({ stats }) {
  const [chartType, setChartType] = useState('line');
  // Gauge animation state
  const [gaugeValue, setGaugeValue] = useState(0); // 0 to 100
  const [showTooltip, setShowTooltip] = useState(false);
  const targetGaugeValue = 78; // This could be dynamic

  // Animate gauge when selected
  React.useEffect(() => {
    if (chartType === 'gauge') {
      let start = null;
      let frame;
      const duration = 1200; // ms
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setGaugeValue(Math.floor(progress * targetGaugeValue));
        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          setGaugeValue(targetGaugeValue);
        }
      };
      setGaugeValue(0);
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }
  }, [chartType]);

  // Sample data - in a real app, this would come from an API
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  
  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Policy Renewals',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60],
        fill: false,
        borderColor: '#882323',
        tension: 0.4,
      },
      {
        label: 'New Policies',
        data: [28, 48, 40, 19, 86, 27, 90, 65, 59],
        fill: false,
        borderColor: '#3498db',
        tension: 0.4,
      },
    ],
  };
  
  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Claims Filed',
        data: [12, 19, 3, 5, 2, 3, 9, 7, 4],
        backgroundColor: '#882323',
      },
      {
        label: 'Claims Processed',
        data: [10, 15, 2, 4, 1, 2, 7, 5, 3],
        backgroundColor: '#3498db',
      },
    ],
  };
  
  const doughnutData = {
    labels: ['Motor', 'Health', 'Property', 'Life', 'Travel'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: ['#882323', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6'],
        borderWidth: 0,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: chartType === 'line' ? 'Policy Trends' : 
              chartType === 'bar' ? 'Claims Activity' : 'Policy Distribution',
        font: {
          size: 16,
        }
      },
    },
  };
  
  return (
    <div className="card analytics-card">
      <div className="analytics-header">
        <h2>Data Analytics</h2>
        <div className="chart-type-selector">
          <button 
            className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
            onClick={() => setChartType('line')}
            title="Line Chart"
          >
            <FaChartLine />
          </button>
          <button 
            className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
            title="Bar Chart"
          >
            <FaChartBar />
          </button>
          <button 
            className={`chart-type-btn ${chartType === 'doughnut' ? 'active' : ''}`}
            onClick={() => setChartType('doughnut')}
            title="Doughnut Chart"
          >
            <FaChartPie />
          </button>
          <button 
            className={`chart-type-btn ${chartType === 'gauge' ? 'active' : ''}`}
            onClick={() => setChartType('gauge')}
            title="Gauge Meter"
          >
            <FaTachometerAlt />
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        {chartType === 'line' && <Line data={lineData} options={chartOptions} height={300} />}
        {chartType === 'bar' && <Bar data={barData} options={chartOptions} height={300} />}
        {chartType === 'doughnut' && <Doughnut data={doughnutData} options={chartOptions} height={300} />}
        {chartType === 'gauge' && (
          <div className="meter-placeholder" style={{marginTop: 24, padding: 32, background: '#fafbfc', borderRadius: 16, textAlign: 'center', boxShadow: '0 4px 24px rgba(52, 152, 219, 0.07)'}}>
            <span style={{fontWeight: 700, color: '#b71c1c', display: 'block', marginBottom: 16, fontSize: 24, letterSpacing: 0.5}}>Renewal Success Rate</span>
            <div style={{width: 340, height: 200, margin: '0 auto', position: 'relative'}}>
              <svg width="340" height="200" viewBox="0 0 340 200"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                style={{cursor: 'pointer', display: 'block', margin: '0 auto'}}
              >
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#43e97b" />
                    <stop offset="60%" stopColor="#38f9d7" />
                    <stop offset="100%" stopColor="#fa8bff" />
                  </linearGradient>
                </defs>
                {/* Background arc */}
                <path d="M40,180 A130,130 0 0,1 300,180" fill="none" stroke="#e0e0e0" strokeWidth="28" strokeLinecap="round" />
                {/* Value arc (animated, always smooth) */}
                {(() => {
                  const percent = gaugeValue / 100;
                  const angle = Math.PI * percent;
                  const r = 130;
                  const cx = 170, cy = 180;
                  // For 0%, show nothing
                  if (gaugeValue === 0) return null;
                  // For >=99.9%, draw full arc (avoid floating point issues)
                  if (percent >= 0.999) {
                    return (
                      <path
                        d="M40,180 A130,130 0 1,1 300,180"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="28"
                        strokeLinecap="round"
                        style={{filter: 'drop-shadow(0 2px 8px #38f9d7)'}}
                      />
                    );
                  }
                  // Calculate endpoint for partial arc
                  const x = cx + r * Math.cos(Math.PI - angle);
                  const y = cy - r * Math.sin(Math.PI - angle);
                  const largeArcFlag = percent > 0.5 ? 1 : 0;
                  return (
                    <path
                      d={`M40,180 A130,130 0 ${largeArcFlag},1 ${x},${y}`}
                      fill="none"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="28"
                      strokeLinecap="round"
                      style={{filter: 'drop-shadow(0 2px 8px #38f9d7)'}}
                    />
                  );
                })()}
                {/* Needle (animated, modern) */}
                {(() => {
                  const percent = gaugeValue / 100;
                  const angle = Math.PI * percent;
                  const r = 90;
                  const cx = 170, cy = 180;
                  const x = cx + r * Math.cos(Math.PI - angle);
                  const y = cy - r * Math.sin(Math.PI - angle);
                  return (
                    <g>
                      <line x1={cx} y1={cy} x2={x} y2={y} stroke="#b71c1c" strokeWidth="10" strokeLinecap="round" />
                      <circle cx={cx} cy={cy} r="16" fill="#fff" stroke="#b71c1c" strokeWidth="6" />
                    </g>
                  );
                })()}
                {/* Center text (animated, modern) */}
                <text x="170" y="120" textAnchor="middle" fontSize="54" fontWeight="900" fill="#222" style={{textShadow: '0 2px 8px #fff'}}>{gaugeValue}%</text>
              </svg>
              {/* Tooltip on hover */}
              {showTooltip && (
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: 24,
                  transform: 'translateX(-50%)',
                  background: '#fff',
                  color: '#b71c1c',
                  border: '1.5px solid #38f9d7',
                  borderRadius: 10,
                  padding: '10px 22px',
                  fontWeight: 700,
                  fontSize: 22,
                  boxShadow: '0 4px 16px rgba(58, 141, 255, 0.13)',
                  zIndex: 2
                }}>
                  {`Renewal Success Rate: ${gaugeValue}%`}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataAnalytics;