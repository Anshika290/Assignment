
import React from 'react';
import { Card } from 'antd';
import './character.css'

const CharacterList = ({ characters }) => {
  return (
    <div className="character-grid">
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <Card
            hoverable
            cover={
              <img
                src={character.image}
                alt={character.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '10px 10px 0 0',
                }}
              />
            }
          >
            <Card.Meta title={character.name} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;