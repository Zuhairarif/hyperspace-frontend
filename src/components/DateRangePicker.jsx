const DateRangePicker = ({ startDate, endDate, onChange }) => {
  const toInputFormat = (ddmmyyyy) => {
    if (!ddmmyyyy) return '';
    const [day, month, year] = ddmmyyyy.split('-');
    return `${year}-${month}-${day}`;
  };

  const toApiFormat = (yyyymmdd) => {
    if (!yyyymmdd) return '';
    const [year, month, day] = yyyymmdd.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <label className="label">Date Range</label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            display: 'block',
            marginBottom: '6px'
          }}>
            Start Date
          </label>
          <input
            type="date"
            className="input"
            value={toInputFormat(startDate)}
            onChange={(e) => onChange('start', toApiFormat(e.target.value))}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            display: 'block',
            marginBottom: '6px'
          }}>
            End Date
          </label>
          <input
            type="date"
            className="input"
            value={toInputFormat(endDate)}
            onChange={(e) => onChange('end', toApiFormat(e.target.value))}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
