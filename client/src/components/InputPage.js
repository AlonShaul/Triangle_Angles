import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputPage = () => {
  const [points, setPoints] = useState([
    { x: '', y: '' },
    { x: '', y: '' },
    { x: '', y: '' }
  ]);
  const navigate = useNavigate();

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index][field] = value;
    setPoints(newPoints);
  };

  const handleSubmit = () => {
    const triangleData = {
      point1: { x: parseFloat(points[0].x), y: parseFloat(points[0].y) },
      point2: { x: parseFloat(points[1].x), y: parseFloat(points[1].y) },
      point3: { x: parseFloat(points[2].x), y: parseFloat(points[2].y) }
    };
    
    navigate('/display', { state: { triangleData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-blue-100">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          הזנת נקודות המשולש
        </h1>
        
        <div className="space-y-6">
          {points.map((point, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-semibold text-blue-700 mb-3 text-center">
                נקודה {index + 1}
              </h3>
                             <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label className="block text-sm font-medium text-blue-600 mb-1 text-center">
                     X
                   </label>
                   <input
                     type="number"
                     value={point.x}
                     onChange={(e) => handlePointChange(index, 'x', e.target.value)}
                     className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-center"
                     placeholder="ערך X"
                     dir="rtl"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-blue-600 mb-1 text-center">
                     Y
                   </label>
                   <input
                     type="number"
                     value={point.y}
                     onChange={(e) => handlePointChange(index, 'y', e.target.value)}
                     className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-center"
                     placeholder="ערך Y"
                     dir="rtl"
                   />
                 </div>
               </div>
            </div>
          ))}
          
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            הצג משולש
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
