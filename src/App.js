import React, {useState, useEffect, useCallback} from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import "antd/dist/antd.css";
import Lines from './charts/line/line'
import Tables from './table/table'
const { Content, Sider } = Layout;
function App(props) {
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
            {/* 数据来源 */}
            <Route path='/data' component={Tables}/>
            <Route path='/chart' component={Lines}/>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
