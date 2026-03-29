import React from 'react';
import {
    Card, Typography, Space, Button, theme, Form, Input,
    DatePicker, Select, message, Divider, Row, Col, InputNumber
} from 'antd';
import {
    DatabaseOutlined, SaveOutlined, ClearOutlined, UserOutlined,
    PhoneOutlined, HomeOutlined, CalendarOutlined, IdcardOutlined,
    HeartOutlined, FileTextOutlined, MedicineBoxOutlined,
    DashboardOutlined, SwapOutlined, HeatMapOutlined, CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

const MIS: React.FC = () => {
    const [form] = Form.useForm();
    const {
        token: { colorBgContainer, borderRadiusLG, colorPrimary },
    } = theme.useToken();

    const handleClear = () => {
        form.resetFields();
        message.success('Все формы очищены');
    };

    const handleSave = (values: any) => {
        console.log('Данные формы:', values);
        message.success('Данные пациента сохранены');
    };

    // Стили для карточек секций
    const innerCardStyle = {
        background: '#fafafa',
        borderRadius: borderRadiusLG,
        border: '1px solid #f0f0f0',
        marginBottom: '16px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
    };

    // Стили для заголовков полей
    const fieldLabelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: 500,
        color: '#333',
        marginBottom: '8px'
    };

    return (
        <Card
            style={{
                minHeight: 'calc(100vh - 200px)',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}
            bodyStyle={{ padding: '24px' }}
        >
            {/* Заголовок и кнопки */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <div>
                    <Title level={4} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DatabaseOutlined style={{ color: colorPrimary, fontSize: '20px' }} />
                        Медицинская информационная система
                    </Title>
                    <Text type="secondary" style={{ fontSize: '12px' }}>Заполните медицинскую документацию</Text>
                </div>
                <Space>
                    <Button
                        icon={<ClearOutlined />}
                        onClick={handleClear}
                        danger
                        ghost
                    >
                        Очистить
                    </Button>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => form.submit()}
                        size="large"
                    >
                        Сохранить
                    </Button>
                </Space>
            </div>

            <Divider style={{ margin: '0 0 24px 0' }} />

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                size="large"
            >
                {/* ==================== БЛОК 1: ДАННЫЕ ПАЦИЕНТА (без изменений) ==================== */}
                <Card
                    type="inner"
                    title={
                        <Space>
                            <UserOutlined style={{ color: colorPrimary }} />
                            <Text strong>Данные пациента</Text>
                        </Space>
                    }
                    style={innerCardStyle}
                    headStyle={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="lastName"
                                label="Фамилия"
                                rules={[{ required: true, message: 'Введите фамилию' }]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input placeholder="Иванов" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="firstName"
                                label="Имя"
                                rules={[{ required: true, message: 'Введите имя' }]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input placeholder="Иван" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="middleName"
                                label="Отчество"
                                style={{ marginBottom: 0 }}
                            >
                                <Input placeholder="Иванович" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="birthDate"
                                label={
                                    <Space>
                                        <CalendarOutlined />
                                        <span>Дата рождения</span>
                                    </Space>
                                }
                                rules={[{ required: true, message: 'Выберите дату рождения' }]}
                                style={{ marginBottom: 0 }}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format="DD.MM.YYYY"
                                    placeholder="ДД.ММ.ГГГГ"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="gender"
                                label="Пол"
                                rules={[{ required: true, message: 'Выберите пол' }]}
                                style={{ marginBottom: 0 }}
                            >
                                <Select placeholder="Выберите пол">
                                    <Select.Option value="male">👨 Мужской</Select.Option>
                                    <Select.Option value="female">👩 Женский</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="phone"
                                label={
                                    <Space>
                                        <PhoneOutlined />
                                        <span>Телефон</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <Input
                                    placeholder="+7 (999) 000-00-00"
                                    prefix={<PhoneOutlined style={{ color: '#999' }} />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                        <Col xs={24}>
                            <Form.Item
                                name="address"
                                label={
                                    <Space>
                                        <HomeOutlined />
                                        <span>Адрес проживания</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={2}
                                    placeholder="Город, улица, дом, квартира"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* ==================== БЛОК 2: ПРИЕМ ==================== */}
                <Card
                    type="inner"
                    title={
                        <Space>
                            <MedicineBoxOutlined style={{ color: colorPrimary }} />
                            <Text strong>Прием</Text>
                        </Space>
                    }
                    style={innerCardStyle}
                    headStyle={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}
                >
                    <Row gutter={[16, 16]}>
                        {/* Дата приема - полная ширина для акцента */}
                        <Col xs={24}>
                            <Form.Item
                                name="appointmentDate"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <CalendarOutlined style={{ color: colorPrimary }} />
                                        <span>Дата и время приема</span>
                                    </Space>
                                }
                                rules={[{ required: true, message: 'Выберите дату приема' }]}
                                style={{ marginBottom: 0 }}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format="DD.MM.YYYY HH:mm"
                                    showTime
                                    placeholder="Выберите дату и время"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider style={{ margin: '16px 0' }} dashed />

                    <Row gutter={[16, 16]}>
                        {/* Жалобы - 2 колонки на больших экранах */}
                        <Col xs={24} lg={12}>
                            <Form.Item
                                name="complaints"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <FileTextOutlined style={{ color: colorPrimary }} />
                                        <span>Жалобы пациента</span>
                                    </Space>
                                }
                                rules={[{ required: true, message: 'Опишите жалобы пациента' }]}
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="• Основная жалоба&#10;• Дополнительные симптомы&#10;• Длительность..."
                                    showCount
                                    maxLength={1000}
                                />
                            </Form.Item>
                        </Col>

                        {/* Анамнез - 2 колонки на больших экранах */}
                        <Col xs={24} lg={12}>
                            <Form.Item
                                name="anamnesis"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <FileTextOutlined style={{ color: colorPrimary }} />
                                        <span>Анамнез заболевания</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="• Когда началось&#10;• Предыдущее лечение&#10;• Хронические заболевания..."
                                    showCount
                                    maxLength={1000}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                        {/* Объективный осмотр - полная ширина */}
                        <Col xs={24}>
                            <Form.Item
                                name="objectiveExam"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <MedicineBoxOutlined style={{ color: colorPrimary }} />
                                        <span>Объективный осмотр</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="• Общее состояние&#10;• Кожные покровы&#10;• Органы дыхания и кровообращения..."
                                    showCount
                                    maxLength={1500}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* ==================== БЛОК 3: ВИТАЛЬНЫЕ ПОКАЗАТЕЛИ ==================== */}
                <Card
                    type="inner"
                    title={
                        <Space>
                            <HeartOutlined style={{ color: colorPrimary }} />
                            <Text strong>Витальные показатели</Text>
                        </Space>
                    }
                    style={innerCardStyle}
                    headStyle={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}
                >
                    <Row gutter={[16, 16]}>
                        {/* АД и Пульс - в одной строке */}
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                                name="bloodPressure"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <HeartOutlined style={{ color: '#ff4d4f' }} />
                                        <span>Артериальное давление</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <Input
                                    placeholder="120/80"
                                    size="large"
                                    prefix={<HeartOutlined style={{ color: '#ff4d4f' }} />}
                                    style={{ fontWeight: 500 }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                                name="pulse"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <HeartOutlined style={{ color: '#ff4d4f' }} />
                                        <span>Пульс</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="72"
                                    min={0}
                                    max={300}
                                    addonAfter="уд/мин"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>

                        {/* Температура - отдельная колонка */}
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                                name="temperature"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <HeatMapOutlined style={{ color: '#fa8c16' }} />
                                        <span>Температура тела</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="36.6"
                                    min={35}
                                    max={42}
                                    step={0.1}
                                    addonAfter="°C"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                        {/* Вес и Рост - в одной строке */}
                        <Col xs={24} sm={12} lg={12}>
                            <Form.Item
                                name="weight"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <DashboardOutlined style={{ color: '#52c41a' }} />
                                        <span>Вес пациента</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="70"
                                    min={0}
                                    max={300}
                                    addonAfter="кг"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} lg={12}>
                            <Form.Item
                                name="height"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <SwapOutlined style={{ color: '#52c41a' }} />
                                        <span>Рост пациента</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="175"
                                    min={0}
                                    max={250}
                                    addonAfter="см"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* ИМТ - автоматический расчет (визуально) */}
                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                        <Col xs={24}>
                            <div style={{
                                padding: '12px 16px',
                                background: '#e6f7ff',
                                borderRadius: borderRadiusLG,
                                border: '1px solid #91d5ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Space>
                                    <CheckCircleOutlined style={{ color: '#1890ff' }} />
                                    <Text strong style={{ color: '#1890ff' }}>Индекс массы тела (ИМТ)</Text>
                                </Space>
                                <Text type="secondary">Рассчитывается автоматически</Text>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* ==================== БЛОК 4: ДИАГНОЗ ==================== */}
                <Card
                    type="inner"
                    title={
                        <Space>
                            <FileTextOutlined style={{ color: colorPrimary }} />
                            <Text strong>Диагноз</Text>
                        </Space>
                    }
                    style={innerCardStyle}
                    headStyle={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}
                >
                    <Row gutter={[16, 16]}>
                        {/* Предварительный и Клинический диагноз - рядом */}
                        <Col xs={24} lg={12}>
                            <Form.Item
                                name="preliminaryDiagnosis"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <FileTextOutlined style={{ color: '#722ed1' }} />
                                        <span>Предварительный диагноз</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Диагноз при первичном осмотре..."
                                    showCount
                                    maxLength={500}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Form.Item
                                name="clinicalDiagnosis"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <FileTextOutlined style={{ color: '#722ed1' }} />
                                        <span>Клинический диагноз</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Окончательный диагноз после обследования..."
                                    showCount
                                    maxLength={500}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                        {/* Код МКБ-10 - выделенное поле */}
                        <Col xs={24} sm={12} lg={8}>
                            <Form.Item
                                name="icd10Code"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <IdcardOutlined style={{ color: '#722ed1' }} />
                                        <span>Код МКБ-10</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <Input
                                    placeholder="K80.0"
                                    size="large"
                                    prefix={<IdcardOutlined style={{ color: '#999' }} />}
                                    style={{ fontFamily: 'monospace', fontWeight: 500 }}
                                />
                            </Form.Item>
                        </Col>

                        {/* Пустое пространство для баланса */}
                        <Col xs={24} sm={12} lg={16}>
                            <div style={{
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#999',
                                fontSize: '12px'
                            }}>
                                <FileTextOutlined style={{ marginRight: '8px' }} />
                                Код заболевания по международной классификации
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* ==================== БЛОК 5: НАЗНАЧЕНИЯ И РЕКОМЕНДАЦИИ ==================== */}
                <Card
                    type="inner"
                    title={
                        <Space>
                            <MedicineBoxOutlined style={{ color: colorPrimary }} />
                            <Text strong>Назначения и рекомендации</Text>
                        </Space>
                    }
                    style={{
                        ...innerCardStyle,
                        marginBottom: 0
                    }}
                    headStyle={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '12px' }}
                >
                    <Row gutter={[16, 16]}>
                        {/* Медикаментозная терапия - полная ширина */}
                        <Col xs={24}>
                            <Form.Item
                                name="medicationTherapy"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <MedicineBoxOutlined style={{ color: '#52c41a' }} />
                                        <span>Медикаментозная терапия</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="1. Препарат 1 - дозировка, частота приема&#10;2. Препарат 2 - дозировка, частота приема&#10;3. Длительность курса..."
                                    showCount
                                    maxLength={2000}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                        {/* Направления на обследования - 2 колонки */}
                        <Col xs={24} lg={12}>
                            <Form.Item
                                name="referrals"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <FileTextOutlined style={{ color: '#1890ff' }} />
                                        <span>Направления на обследования</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="• Лабораторные анализы&#10;• Инструментальные исследования&#10;• Консультации специалистов..."
                                    showCount
                                    maxLength={1500}
                                />
                            </Form.Item>
                        </Col>

                        {/* Рекомендации - 2 колонки */}
                        <Col xs={24} lg={12}>
                            <Form.Item
                                name="recommendations"
                                label={
                                    <Space style={fieldLabelStyle}>
                                        <CheckCircleOutlined style={{ color: '#1890ff' }} />
                                        <span>Рекомендации</span>
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="• Диета&#10;• Режим дня&#10;• Физические нагрузки&#10;• Контрольные визиты..."
                                    showCount
                                    maxLength={1500}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </Card>
    );
};

export default MIS;
