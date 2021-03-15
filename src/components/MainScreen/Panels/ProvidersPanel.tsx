import { Tree } from "antd";

export default function ProvidersPanel(){
  return <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column'  }}>
    <div className="border-bottom" style={{ padding: '5px 10px 5px 10px' }}>Providers</div>
    <div style={{ flexGrow: 1, padding: "5px 20px 5px 0px", overflowY: "auto" }}>
      <Tree
        showIcon={false}
        showLine={false}
        treeData={[]}
      />
    </div>
  </div>
}