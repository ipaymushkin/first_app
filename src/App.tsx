import React, { useState } from 'react';
import {
  Layout, Input, Tag, Card, Typography, Space, theme,
  Tabs, Button, message, Select
} from 'antd';
import {
  UserOutlined, MedicineBoxOutlined, HeartOutlined,
  CopyOutlined, ClockCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import MIS from "./MIS.tsx";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

// Типы приемов
type AppointmentType = 'primary' | 'emergency' | 'follow-up' | 'consultation';

// Интерфейс сценария
interface Scenario {
  id: number;
  type: AppointmentType;
  typeName: string;
  title: string;
  description: string;
}

// 10 Детализированных сценариев
const SCENARIOS: Scenario[] = [
  {
    id: 1,
    type: 'primary',
    typeName: 'Первичный прием',
    title: 'Острая боль в правом подреберье',
    description: 'Пациент жалуется на острую боль в правом подреберье, усиливающуюся после употребления жирной пищи. Боль появилась 2 дня назад, сопровождается тошнотой. Температура тела 37.5°C. В анамнезе хронический холецистит. Боль иррадиирует в правое плечо.'
  },
  {
    id: 2,
    type: 'emergency',
    typeName: 'Неотложная помощь',
    title: 'Сильное головокружение при вставании',
    description: 'Пациент сообщает о сильном головокружении при резком вставании с кровати. Симптомы появились неделю назад. Есть история гипотонии. Возраст 65 лет. Принимает гипотензивные препараты. Давление 90/60 мм рт.ст.'
  },
  {
    id: 3,
    type: 'follow-up',
    typeName: 'Повторный прием',
    title: 'Хронический сухой кашель',
    description: 'Сухой кашель продолжается 3 недели. Ранее назначенные препараты не помогли. Нет температуры, но есть слабость. Курильщик со стажем 20 лет. Вечером кашель усиливается. Мокрота не отходит.'
  },
  {
    id: 4,
    type: 'primary',
    typeName: 'Первичный прием',
    title: 'Аллергическая сыпь на руках',
    description: 'Красная сыпь на обеих руках, сильный зуд, особенно ночью. Появилась 5 дней назад после использования нового крема. Есть аллергия на косметику в анамнезе. Сыпь распространяется на предплечья.'
  },
  {
    id: 5,
    type: 'emergency',
    typeName: 'Неотложная помощь',
    title: 'Кровь в моче без боли',
    description: 'Пациент заметил кровь в моче утром. Боли при мочеиспускании нет. Возраст 50 лет, есть история камней в почках. Артериальное давление в норме. Цвет мочи темно-красный. Сгустков нет.'
  },
  {
    id: 6,
    type: 'consultation',
    typeName: 'Консультация',
    title: 'Частые головные боли в области лба',
    description: 'Головные боли в лобной области, особенно по утрам. Длительность 2 месяца. Есть проблемы со сном и стресс на работе. Возраст 35 лет. Боль давящего характера. Обезболивающие помогают временно.'
  },
  {
    id: 7,
    type: 'primary',
    typeName: 'Первичный прием',
    title: 'Постоянная изжога и ком в горле',
    description: 'Изжога после каждого приема пищи, ощущение кома в горле. Симптомы усиливаются в положении лежа. Принимает антациды с временным эффектом. Есть отрыжка кислым. Ночью симптомы усиливаются.'
  },
  {
    id: 8,
    type: 'follow-up',
    typeName: 'Повторный прием',
    title: 'Онемение пальцев рук',
    description: 'Онемение мизинца и безымянного пальца левой руки. Симптомы появились месяц назад. Работает за компьютером 8 часов в день. Есть боль в шее. Онемение усиливается к вечеру после работы.'
  },
  {
    id: 9,
    type: 'primary',
    typeName: 'Первичный прием',
    title: 'Боль в колене при нагрузке',
    description: 'Боль в правом колене при спуске по лестнице и приседании. Травм не было. Возраст 45 лет, есть лишний вес. Боль усиливается к вечеру. Есть хруст при движении. Отека нет.'
  },
  {
    id: 10,
    type: 'consultation',
    typeName: 'Консультация',
    title: 'Хроническая усталость и сонливость',
    description: 'Постоянная усталость и сонливость даже после 8 часов сна. Симптомы 3 месяца. Есть депрессивные эпизоды. Работает в ночную смену. Аппетит снижен. Вес теряется без причины.'
  }
];

// Цвета для типов приема
const TYPE_COLORS: Record<AppointmentType, string> = {
  primary: 'blue',
  emergency: 'red',
  'follow-up': 'green',
  consultation: 'orange'
};

// Опции для фильтра
const TYPE_OPTIONS = [
  { value: 'all', label: 'Все типы' },
  { value: 'primary', label: 'Первичный прием' },
  { value: 'emergency', label: 'Неотложная помощь' },
  { value: 'follow-up', label: 'Повторный прием' },
  { value: 'consultation', label: 'Консультация' }
];

const App: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<AppointmentType | 'all'>('all');
  const [activeTab, setActiveTab] = useState('chat');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Фильтрация сценариев
  const filteredScenarios = SCENARIOS.filter(scenario => {
    const matchesSearch = scenario.title.toLowerCase().includes(searchText.toLowerCase()) ||
        scenario.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = selectedType === 'all' || scenario.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Функция копирования
  const handleCopy = (scenario: Scenario) => {
    const textToCopy = `Тип: ${scenario.typeName}\nСимптом: ${scenario.title}\nОписание: ${scenario.description}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      message.success('Сценарий скопирован в буфер обмена');
    }).catch(() => {
      message.error('Не удалось скопировать');
    });
  };

  // Иконка для типа приема
  const getTypeIcon = (type: AppointmentType) => {
    switch (type) {
      case 'emergency': return <ExclamationCircleOutlined />;
      case 'follow-up': return <ClockCircleOutlined />;
      case 'consultation': return <UserOutlined />;
      default: return <MedicineBoxOutlined />;
    }
  };

  return (
      <Layout style={{ minHeight: '100vh' }}>
        {/* Левое меню (Сайдбар) */}
        <Sider
            width={400}
            theme="light"
            style={{
              padding: '16px',
              height: '100vh',
              position: 'sticky',
              top: 0,
              display: 'flex',
              flexDirection: 'column'
            }}
        >
          {/* Фиксированная верхняя часть (заголовок + фильтры) */}
          <div style={{
            marginBottom: '16px',
            flexShrink: 0
          }}>
            <div style={{ marginBottom: '24px' }}>
              <Title level={4} style={{ margin: 0 }}>
                <MedicineBoxOutlined /> Симуляция приема
              </Title>
              <Text type="secondary" style={{ fontSize: '12px' }}>Пациент</Text>
            </div>

            {/* Блок поиска */}
            <div style={{ marginBottom: '16px' }}>
              <Search
                  placeholder="Поиск симптома или описания..."
                  allowClear
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: '100%' }}
              />
            </div>

            {/* Фильтр по типу приема */}
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ display: 'block', marginBottom: '8px' }}>Тип приема:</Text>
              <Select
                  value={selectedType}
                  onChange={(value) => setSelectedType(value)}
                  options={TYPE_OPTIONS}
                  style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Скроллящийся список сценариев */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingRight: '8px'
          }}>
            {filteredScenarios.length > 0 ? (
                filteredScenarios.map((scenario) => (
                    <Card
                        key={scenario.id}
                        size="small"
                        hoverable
                        style={{
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onClick={() => console.log('Выбран сценарий:', scenario)}
                    >
                      {/* Верхняя строка: Тип приема + Кнопка копирования */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <Tag color={TYPE_COLORS[scenario.type]} icon={getTypeIcon(scenario.type)}>
                          {scenario.typeName}
                        </Tag>
                        <Button
                            type="text"
                            icon={<CopyOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(scenario);
                            }}
                        />
                      </div>

                      <div style={{ width: '100%' }}>
                        <Title level={5} style={{ margin: '0 0 8px 0' }}>{scenario.title}</Title>

                        {/* Описание с вертикальным скроллом если не умещается в 3 строки */}
                        <div
                            style={{
                              maxHeight: '4.5em',
                              lineHeight: '1.5em',
                              overflowY: 'auto',
                              fontSize: '12px',
                              color: '#666',
                              paddingRight: '4px'
                            }}
                        >
                          <Text style={{ fontSize: '12px', color: '#666' }}>
                            {scenario.description}
                          </Text>
                        </div>
                      </div>
                    </Card>
                ))
            ) : (
                <Text type="secondary">Сценарии не найдены</Text>
            )}
          </div>
        </Sider>

        {/* Основной контент */}
        <Layout>
          <Header
              style={{
                padding: '0 24px',
                background: colorBgContainer,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #f0f0f0'
              }}
          >
            <Title level={3} style={{ margin: 0 }}>Рабочее место врача</Title>
            <Space>
              <UserOutlined /> Доктор Иванов А.А.
            </Space>
          </Header>

          <Content style={{ margin: '24px 16px' }}>
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    key: 'chat',
                    label: '💬 Чат с пациентом',
                    children: (
                        <div
                            style={{
                              padding: 24,
                              minHeight: 500,
                              background: colorBgContainer,
                              borderRadius: borderRadiusLG,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '2px dashed #d9d9d9'
                            }}
                        >
                          <div style={{ textAlign: 'center', color: '#999' }}>
                            <HeartOutlined style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }} />
                            <Title level={4}>Чат с пациентом</Title>
                            <Text>Здесь будет отображаться диалог с пациентом в реальном времени.</Text>
                          </div>
                        </div>
                    )
                  },
                  {
                    key: 'mis',
                    label: '🏥 МИС',
                    children: <MIS />
                  }
                ]}
            />
          </Content>
        </Layout>
      </Layout>
  );
};

export default App;
