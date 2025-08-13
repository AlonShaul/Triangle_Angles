import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [angles, setAngles] = useState({ angle1: 0, angle2: 0, angle3: 0 });
  
  const triangleData = location.state?.triangleData;

  useEffect(() => {
    if (!triangleData) {
      navigate('/');
      return;
    }
    
    const calculatedAngles = calculateAngles(triangleData);
    setAngles(calculatedAngles);
  }, [triangleData, navigate]);

  const calculateAngles = (data) => {
    const { point1, point2, point3 } = data;
    
    const sideA = Math.sqrt(Math.pow(point2.x - point3.x, 2) + Math.pow(point2.y - point3.y, 2));
    const sideB = Math.sqrt(Math.pow(point1.x - point3.x, 2) + Math.pow(point1.y - point3.y, 2));
    const sideC = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    
    const angle1 = Math.acos((sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC)) * (180 / Math.PI);
    const angle2 = Math.acos((sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC)) * (180 / Math.PI);
    const angle3 = 180 - angle1 - angle2;
    
    return {
      angle1: Math.round(angle1 * 100) / 100,
      angle2: Math.round(angle2 * 100) / 100,
      angle3: Math.round(angle3 * 100) / 100
    };
  };

  const normalizePoints = (data) => {
    const { point1, point2, point3 } = data;
    const points = [point1, point2, point3];
    
    let minX = Math.min(...points.map(p => p.x));
    let maxX = Math.max(...points.map(p => p.x));
    let minY = Math.min(...points.map(p => p.y));
    let maxY = Math.max(...points.map(p => p.y));
    
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;
    const maxRange = Math.max(rangeX, rangeY);
    
    const padding = 50;
    const containerWidth = window.innerWidth * 0.7;
    const containerHeight = window.innerHeight * 0.6;
    const scale = Math.min(
      (containerWidth - padding * 2) / maxRange,
      (containerHeight - padding * 2) / maxRange
    );
    
    return points.map(point => ({
      x: ((point.x - minX) * scale) + padding,
      y: ((point.y - minY) * scale) + padding
    }));
  };

  if (!triangleData) return null;

  const normalizedPoints = normalizePoints(triangleData);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-2">
      <div className="bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-6" style={{ width: '98vw', height: '90vh' }}>
        <div className="text-center flex-shrink-0 bg-gradient-to-b from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <h1 className="text-xl font-bold text-blue-800 mb-3">
            תצוגת המשולש
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            חזרה להזנה
          </button>
        </div>
        
        <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-inner flex-1" style={{ height: '85vh' }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <polygon
              points={`${normalizedPoints[0].x},${normalizedPoints[0].y} ${normalizedPoints[1].x},${normalizedPoints[1].y} ${normalizedPoints[2].x},${normalizedPoints[2].y}`}
              fill="rgba(59, 130, 246, 0.1)"
              stroke="#3B82F6"
              strokeWidth="3"
            />
            
            {normalizedPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#EF4444"
                stroke="#DC2626"
                strokeWidth="2"
              />
            ))}
            
            {normalizedPoints.map((point, index) => (
              <text
                key={`text-${index}`}
                x={point.x + 15}
                y={point.y - 15}
                fontSize="14"
                fontWeight="bold"
                fill="#1F2937"
              >
                {`P${index + 1}(${triangleData[`point${index + 1}`].x}, ${triangleData[`point${index + 1}`].y})`}
              </text>
            ))}
          </svg>
          
          <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl border-2 border-blue-300 shadow-lg">
            <div className="text-sm font-bold text-blue-900 mb-2 text-center">זוויות המשולש</div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-blue-800">זווית 1: {angles.angle1}°</div>
              <div className="text-sm font-semibold text-blue-800">זווית 2: {angles.angle2}°</div>
              <div className="text-sm font-semibold text-blue-800">זווית 3: {angles.angle3}°</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPage;
