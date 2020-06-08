import React, {useState, useEffect, useCallback} from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import "antd/dist/antd.css";
const { Content, Sider } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  return (
    <div className="App">
      <Layout id="con">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" >
              <Link to="/data">
                <span className="nav-text">数据</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" >
              <Link to="/chart">
                <span className="nav-text">图表</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ margin: '24px 16px 24px ' }}>
          <div id="contain" style={{ padding: 24, background: '#fff' }}>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
