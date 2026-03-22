import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Space,
  theme,
  Modal,
  Badge,
  Divider,
  message,
} from 'antd';
import {
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

// --- Типы ---
interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Данные ---
const features: FeatureItem[] = [
  {
    icon: <RocketOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
    title: 'Быстрый старт',
    description: 'Начните разработку мгновенно благодаря готовым компонентам и отличной документации.',
  },
  {
    icon: <SafetyOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
    title: 'Надежность',
    description: 'Используется в тысячах корпоративных проектов по всему миру. Проверено временем.',
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: 32, color: '#faad14' }} />,
    title: 'Производительность',
    description: 'Оптимизированный код и поддержка Tree Shaking для минимального размера бандла.',
  },
];

const WelcomePage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { token } = theme.useToken();

  // Обработчик действия
  const handleGetStarted = () => {
    message.success('Добро пожаловать в команду! 🚀');
    setModalVisible(true);
  };

  // Стили для секций
  const sectionStyle: React.CSSProperties = {
    padding: '80px 24px',
    maxWidth: 1200,
    margin: '0 auto',
  };

  const heroStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '100px 24px',
    background: `linear-gradient(135deg, ${token.colorBgContainer} 0%, ${token.colorPrimaryBg} 100%)`,
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* --- Шапка --- */}
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: token.colorBgContainer,
          boxShadow: '0 2px 8px #f0f1f2',
          padding: '0 24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <RocketOutlined style={{ fontSize: 24, color: token.colorPrimary }} />
          <Title level={4} style={{ margin: 0 }}>MyApp</Title>
        </div>

        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', border: 'none' }}
          items={[
            { key: '1', label: 'Главная' },
            { key: '2', label: 'Преимущества' },
            { key: '3', label: 'Цены' },
            { key: '4', label: 'Контакты' },
          ]}
        />

        <Space>
          <Button type="text">Войти</Button>
          <Button type="primary">Регистрация</Button>
        </Space>
      </Header>

      <Content>
        {/* --- Hero Секция --- */}
        <div style={heroStyle}>
          <Badge.Ribbon text="Версия 5.0" color="red">
            <Title level={1} style={{ marginBottom: 16 }}>
              Создавайте интерфейсы быстрее
            </Title>
          </Badge.Ribbon>
          
          <Paragraph
            style={{ fontSize: 18, color: token.colorTextSecondary, maxWidth: 600, margin: '0 auto 32px' }}
          >
            Мощная библиотека компонентов для React с поддержкой TypeScript. 
            Постройте свой следующий проект с помощью Ant Design.
          </Paragraph>

          <Space size="large">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />} onClick={handleGetStarted}>
              Начать бесплатно
            </Button>
            <Button size="large" ghost>
              Узнать больше
            </Button>
          </Space>
        </div>

        {/* --- Секция Преимуществ --- */}
        <div style={sectionStyle}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
            Почему выбирают нас
          </Title>
          
          <Row gutter={[32, 32]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} sm={8} key={index}>
                <Card
                  hoverable
                  style={{ height: '100%', textAlign: 'center' }}
                  bodyStyle={{ padding: 32 }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>{feature.icon}</div>
                    <Title level={4}>{feature.title}</Title>
                    <Text type="secondary">{feature.description}</Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <Divider style={{ margin: 0 }} />

        {/* --- Секция Статистики / Доверия --- */}
        <div style={{ ...sectionStyle, textAlign: 'center' }}>
          <Row gutter={[32, 32]}>
            <Col xs={12} md={6}>
              <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>10k+</Title>
              <Text type="secondary">Разработчиков</Text>
            </Col>
            <Col xs={12} md={6}>
              <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>99%</Title>
              <Text type="secondary">Довольных клиентов</Text>
            </Col>
            <Col xs={12} md={6}>
              <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>24/7</Title>
              <Text type="secondary">Поддержка</Text>
            </Col>
            <Col xs={12} md={6}>
              <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>100%</Title>
              <Text type="secondary">TypeScript</Text>
            </Col>
          </Row>
        </div>

        {/* --- CTA Секция --- */}
        <div style={{ background: token.colorPrimary, padding: '60px 24px', textAlign: 'center', color: '#fff' }}>
          <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>
            Готовы начать проект?
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 500, margin: '0 auto 32px' }}>
            Присоединяйтесь к сообществу разработчиков и создавайте потрясающие приложения уже сегодня.
          </Paragraph>
          <Button 
            size="large" 
            style={{ background: '#fff', color: token.colorPrimary, borderColor: '#fff' }}
            onClick={handleGetStarted}
          >
            Создать аккаунт
          </Button>
        </div>
      </Content>

      {/* --- Подвал --- */}
      <Footer style={{ textAlign: 'center', background: token.colorBgLayout }}>
        <Space size="large" style={{ marginBottom: 16 }}>
          <GithubOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          <TwitterOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          <LinkedinOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
        </Space>
        <Text type="secondary">
          ©{new Date().getFullYear()} MyApp Inc. Все права защищены.
        </Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          Создано с использованием Ant Design & React
        </Text>
      </Footer>

      {/* --- Модальное окно --- */}
      <Modal
        title={
          <Space>
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
            <span>Успешно!</span>
          </Space>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Закрыть
          </Button>,
          <Button key="submit" type="primary" onClick={() => setModalVisible(false)}>
            Продолжить
          </Button>,
        ]}
      >
        <Paragraph>
          Спасибо за интерес! Мы свяжемся с вами в ближайшее время.
        </Paragraph>
      </Modal>
    </Layout>
  );
};

export default WelcomePage;