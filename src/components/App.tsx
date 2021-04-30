import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { refreshCleaners, refreshProviders } from '../api';
import Content from './MainScreen/Content';
import TopBar from './MainScreen/TopBar/TopBar';
import HBar from './utils/dividers/HBar';

let IS_ELECTRON = false

function App() {
  const [isElectron, setIsElectron] = useState(false)
  useEffect(() => {
    refreshProviders()
    refreshCleaners()
    const urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams.get("electron"))
    if(urlParams.get("electron")) {
      setIsElectron(true)
    }
  }, [])

  return (
    <div style={{ width: "100%", height: "100%", padding: isElectron? 0 : 10, borderRadius: 2 }}>
      <Card bodyStyle={{ padding: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} style={{ width: "100%", height: "100%" }}>
        <TopBar className={isElectron? "electron-drag": ""}></TopBar>
        <HBar></HBar>
        <Content style={{ flexGrow: 1, minHeight: 0 }}></Content>
      </Card>
    </div>
  );
}

export default App;
