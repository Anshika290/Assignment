import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Layout, Menu, Row, Col, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import CharacterList from './CharacterList';

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Fetch episodes
    axios.get('https://rickandmortyapi.com/api/episode')
      .then(response => setEpisodes(response.data.results))
      .catch(error => console.error('Error fetching episodes:', error));

    // Fetch characters for initial page load
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => setCharacters(response.data.results))
      .catch(error => console.error('Error fetching characters:', error));
  }, []);

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    // Fetch characters for selected episode
    axios.get(`https://rickandmortyapi.com/api/character/?episode=${episode.id}`)
      .then(response => setCharacters(response.data.results))
      .catch(error => console.error('Error fetching characters:', error));
  };

  const handleEpisodeUnselect = () => {
    setSelectedEpisode(null);
    // Fetch characters for initial page load
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => setCharacters(response.data.results))
      .catch(error => console.error('Error fetching characters:', error));
  };

  const { Header, Sider, Content } = Layout;
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedEpisode ? selectedEpisode.id.toString() : '1']}
          onClick={({ key }) => {
            const episode = episodes.find(ep => ep.id.toString() === key);
            if (episode) {
              handleEpisodeSelect(episode);
            }
          }}
        >
          {episodes.map(episode => (
            <Menu.Item key={episode.id.toString()} style={{ backgroundColor: selectedEpisode && selectedEpisode.id === episode.id ? '#333' : '' }}>
              {episode.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <h1 style={{ gridColumn: '1', maxWidth: '800px', margin: 'auto' }}>Rick and Morty Characters</h1>
            {selectedEpisode && (
              <h2 style={{ gridColumn: '1', maxWidth: '800px', margin: 'auto' }}>{selectedEpisode.name}</h2>
            )}
            <CharacterList characters={characters} style={{ gridColumn: '1', maxWidth: '800px', margin: 'auto' }} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;