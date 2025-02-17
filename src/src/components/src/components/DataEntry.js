// src/components/DataEntry.js
import React, { useState } from 'react';

const DataEntry = () => {
  const [entry, setEntry] = useState({
    date: '',
    operator: '',
    shift: 'صباحية',
    hourlyData: Array(12).fill({
      time: '',
      temperatures: { base: '', c1: '', c2: '', heater: '', fusel: '' },
      pressure: '',
      flow: '',
      alcoholConcentration: '',
      alcoholTemp: '',
      production: '',
      notes: ''
    }),
    tanks: {
      start: { st1: '', st2: '' },
      transfer: { quantity: '', destinationTank: '' },
      end: { st1: '', st2: '' }
    },
    feedSource: {
      productType: '',
      distillationType: '',
      mainTank: ''
    },
    alcIn: {
      tankName: '',
      quantity: ''
    },
    generalNotes: ''
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleHourlyChange = (index, field, value) => {
    const newHourlyData = [...entry.hourlyData];
    newHourlyData[index] = { ...newHourlyData[index], [field]: value };
    setEntry({ ...entry, hourlyData: newHourlyData });
  };

  const handleTemperatureChange = (index, tempField, value) => {
    const newHourlyData = [...entry.hourlyData];
    newHourlyData[index] = {
      ...newHourlyData[index],
      temperatures: { ...newHourlyData[index].temperatures, [tempField]: value }
    };
    setEntry({ ...entry, hourlyData: newHourlyData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Submitted:', entry);
    // يمكن هنا إضافة كود لإرسال البيانات إلى الخادم
  };

  return (
    <div>
      <h2>إدخال البيانات</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>التاريخ:</label>
          <input type="date" name="date" value={entry.date} onChange={handleChange} />
        </div>
        <div>
          <label>اسم المشغل:</label>
          <input type="text" name="operator" value={entry.operator} onChange={handleChange} />
        </div>
        <div>
          <label>الوردية:</label>
          <select name="shift" value={entry.shift} onChange={handleChange}>
            <option value="صباحية">صباحية</option>
            <option value="مسائية">مسائية</option>
          </select>
        </div>
        {/* مثال على بيانات ساعة واحدة */}
        <div>
          <h3>بيانات الساعة 9:00</h3>
          <div>
            <label>Base (102-106 °C):</label>
            <input type="number" 
                   value={entry.hourlyData[0].temperatures.base} 
                   onChange={(e) => handleTemperatureChange(0, 'base', e.target.value)} />
          </div>
          <div>
            <label>C1 (85-88 °C):</label>
            <input type="number" 
                   value={entry.hourlyData[0].temperatures.c1} 
                   onChange={(e) => handleTemperatureChange(0, 'c1', e.target.value)} />
          </div>
          {/* يمكنك إضافة الحقول الأخرى بنفس الطريقة */}
        </div>
        {/* يمكنك تكرار القسم أعلاه لباقي الساعات */}
        
        <div>
          <h3>بيانات التانكات</h3>
          <div>
            <label>ST1 - بداية الورديّة:</label>
            <input type="number" 
                   name="st1Start" 
                   value={entry.tanks.start.st1} 
                   onChange={(e) => setEntry({ ...entry, tanks: { ...entry.tanks, start: { ...entry.tanks.start, st1: e.target.value } } })} />
          </div>
          <div>
            <label>ST2 - بداية الورديّة:</label>
            <input type="number" 
                   name="st2Start" 
                   value={entry.tanks.start.st2} 
                   onChange={(e) => setEntry({ ...entry, tanks: { ...entry.tanks, start: { ...entry.tanks.start, st2: e.target.value } } })} />
          </div>
          {/* أضف حقول النقل والنهاية بنفس الطريقة */}
        </div>
        
        <div>
          <h3>Feed Source</h3>
          <div>
            <label>نوع المنتج:</label>
            <select name="productType" value={entry.feedSource.productType} onChange={(e) => setEntry({ ...entry, feedSource: { ...entry.feedSource, productType: e.target.value } })}>
              <option value="">اختر</option>
              <option value="تخمير مخلط سكر ومولاس">تخمير مخلط سكر ومولاس</option>
              <option value="كحول مخفف">كحول مخفف (كحول وماء)</option>
              <option value="كحول نبيذ">كحول نبيذ</option>
            </select>
          </div>
          <div>
            <label>نوع التقطير:</label>
            <input type="text" 
                   name="distillationType" 
                   value={entry.feedSource.distillationType} 
                   onChange={(e) => setEntry({ ...entry, feedSource: { ...entry.feedSource, distillationType: e.target.value } })} />
          </div>
          <div>
            <label>اسم التانك الرئيسي:</label>
            <input type="text" 
                   name="mainTank" 
                   value={entry.feedSource.mainTank} 
                   onChange={(e) => setEntry({ ...entry, feedSource: { ...entry.feedSource, mainTank: e.target.value } })} />
          </div>
        </div>
        
        <div>
          <h3>Alc. In</h3>
          <div>
            <label>اسم التانك:</label>
            <input type="text" 
                   name="alcTankName" 
                   value={entry.alcIn.tankName} 
                   onChange={(e) => setEntry({ ...entry, alcIn: { ...entry.alcIn, tankName: e.target.value } })} />
          </div>
          <div>
            <label>الكمية (بايكة):</label>
            <input type="number" 
                   name="alcQuantity" 
                   value={entry.alcIn.quantity} 
                   onChange={(e) => setEntry({ ...entry, alcIn: { ...entry.alcIn, quantity: e.target.value } })} />
          </div>
        </div>
        
        <div>
          <label>ملاحظات عامة للورديّة:</label>
          <textarea name="generalNotes" value={entry.generalNotes} onChange={handleChange}></textarea>
        </div>
        
        <button type="submit">حفظ البيانات</button>
      </form>
    </div>
  );
};

export default DataEntry;
