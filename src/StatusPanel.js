function StatusPanel({ position, connected }) {
  const cardStyle = {
    backgroundColor: '#1e1e1e',
    padding: '20px 30px',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    minWidth: '250px'
  };

  const titleStyle = {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#aaa'
  };

  const valueStyle = {
    fontSize: '28px',
    margin: '5px 0'
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '900px',
        marginBottom: '40px'
      }}
    >
      {/* 左：カード化した自己位置 */}
      <div style={cardStyle}>
        <div style={titleStyle}>Position</div>
        <div style={valueStyle}>x: {position.x}</div>
        <div style={valueStyle}>y: {position.y}</div>
        <div style={valueStyle}>rot: {position.r}</div>
      </div>

      {/* 右：接続状態（こっちもカードにしても良い） */}
      <div style={cardStyle}>
        <div style={titleStyle}>Status</div>
        <div style={{
          fontSize: '22px',
          color: connected ? '#4CAF50' : '#f44336'
        }}>
          {connected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </div>
    </div>
  );
}

export default StatusPanel;