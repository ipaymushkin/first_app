import React from 'react';
import { Card, Typography, Space, Button, theme } from 'antd';
import { DatabaseOutlined, SaveOutlined, ClearOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MIS: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleClear = () => {
        // Логика очистки
        console.log('Очистить данные');
    };

    const handleSave = () => {
        // Логика сохранения
        console.log('Сохранить данные');
    };

    return (
        <Card
            style={{
                minHeight: 500,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
            }}
        >
            {/* Заголовок и кнопки на одной строке */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <Title level={4} style={{ margin: 0 }}>
                    <DatabaseOutlined /> Медицинская информационная система
                </Title>
                <Space>
                    <Button
                        icon={<ClearOutlined />}
                        onClick={handleClear}
                        danger
                    >
                        Очистить
                    </Button>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                </Space>
            </div>

            {/* Заглушка контента МИС */}
            <div
                style={{
                    padding: 24,
                    minHeight: 400,
                    background: '#fafafa',
                    borderRadius: borderRadiusLG,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #d9d9d9'
                }}
            >
                <div style={{ textAlign: 'center', color: '#999' }}>
                    <DatabaseOutlined style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }} />
                    <Title level={5}>Интеграция с МИС</Title>
                    <Text>Здесь будет отображаться медицинская документация пациента.</Text>
                </div>
            </div>
        </Card>
    );
};

export default MIS;
