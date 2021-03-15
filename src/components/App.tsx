import { Card } from 'antd';
import Content from './MainScreen/Content';
import TopBar from './MainScreen/TopBar';

function App() {
  return (
    <div style={{ width: "100%", height: "100%", padding: 10 }}>
      <Card bodyStyle={{ padding: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} style={{  width: "100%", height: "100%" }}>
        <TopBar className="border-bottom"></TopBar>
        <Content style={{ flexGrow: 1, minHeight: 0 }}></Content>
      </Card>
    </div>
  );
}

export default App;
