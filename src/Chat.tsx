import React, { useState, useRef, useEffect } from 'react';
import {
    List,
    Input,
    Button,
    Card,
    Typography,
    Spin,
    Alert,
    Avatar,
    Space,
    message as antMessage
} from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;

// 🔹 Типы сообщений
interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

interface OllamaChatRequest {
    model: string;
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    stream: boolean;
    options?: {
        temperature?: number;
        top_p?: number;
        num_predict?: number;
    };
}

interface OllamaChatResponse {
    model: string;
    message: {
        role: string;
        content: string;
    };
    done: boolean;
}

const OLLAMA_API = 'http://localhost:11434/api/chat';
const MODEL_NAME = 'qwen2.5';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<any>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // 🔹 Авто-скролл вниз при новых сообщениях
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    // 🔹 Отправка сообщения в Ollama
    const sendMessageToOllama = async (userMessage: string): Promise<string> => {
        const conversationHistory = messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        const requestBody: OllamaChatRequest = {
            model: MODEL_NAME,
            messages: [
                ...conversationHistory,
                { role: 'user', content: userMessage }
            ],
            stream: false,
            options: {
                temperature: 0.7,
                top_p: 0.9,
                num_predict: 2048
            }
        };

        const response = await fetch(OLLAMA_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
        }

        const data: OllamaChatResponse = await response.json();
        return data.message.content;
    };

    // 🔹 Обработчик отправки
    const handleSend = async () => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || loading) return;

        const userMessage: Message = {
            role: 'user',
            content: trimmedInput,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setLoading(true);
        setError(null);

        try {
            const assistantResponse = await sendMessageToOllama(trimmedInput);

            const assistantMessage: Message = {
                role: 'assistant',
                content: assistantResponse,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Неизвестная ошибка';
            setError(errorMsg);
            antMessage.error('Ошибка при получении ответа от Ollama');
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    // 🔹 Обработка нажатия Enter
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // 🔹 Форматирование времени
    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card
            title={
                <Space>
                    <RobotOutlined />
                    <Text strong>Чат с Qwen2.5 (Ollama)</Text>
                </Space>
            }
            styles={{
                body: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '12px',
                    boxSizing: 'border-box'
                }
            }}
            style={{
                maxWidth: 900,
                margin: '20px auto',
                height: 'calc(100vh - 40px)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* 🔹 Контейнер с фиксированной высотой для скролла сообщений */}
            <div
                ref={messagesContainerRef}
                style={{
                    flex: 1,
                    minHeight: 0, // 🔥 Важно для работы скролла во flex-контейнере
                    overflowY: 'auto',
                    marginBottom: '12px',
                    paddingRight: '8px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    renderItem={(item) => (
                        <List.Item style={{ padding: '8px 0', border: 'none' }}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        icon={item.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                                        style={{
                                            backgroundColor: item.role === 'user' ? '#1890ff' : '#52c41a',
                                            flexShrink: 0
                                        }}
                                    />
                                }
                                title={
                                    <Text type={item.role === 'user' ? 'secondary' : 'success'}>
                                        {item.role === 'user' ? 'Вы' : 'Qwen2.5'}
                                        <Text type="secondary" style={{ marginLeft: 8, fontSize: '12px' }}>
                                            {formatTime(item.timestamp)}
                                        </Text>
                                    </Text>
                                }
                                description={
                                    <div style={{
                                        backgroundColor: item.role === 'user' ? '#e6f7ff' : '#f6ffed',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        marginTop: '4px',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        maxWidth: '85%'
                                    }}>
                                        <Text>{item.content}</Text>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />

                {/* Индикатор загрузки */}
                {loading && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px',
                        color: '#888'
                    }}>
                        <Spin size="small" />
                        <Text type="secondary">Qwen2.5 печатает...</Text>
                    </div>
                )}

                {/* Ошибка */}
                {error && (
                    <Alert
                        message="Ошибка"
                        description={error}
                        type="error"
                        showIcon
                        closable
                        style={{ marginTop: '8px' }}
                        onClose={() => setError(null)}
                    />
                )}

                {/* 🔹 Якорь для скролла */}
                <div ref={messagesEndRef} style={{ height: '1px' }} />
            </div>

            {/* 🔹 Фиксированная область ввода (всегда внизу) */}
            <div style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 8px',
                borderTop: '1px solid #f0f0f0',
                backgroundColor: '#fafafa',
                flexShrink: 0, // 🔥 Важно: не сжимать область ввода
                marginTop: 'auto'
            }}>
                <TextArea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleKeyPress}
                    placeholder="Введите сообщение... (Enter — отправить, Shift+Enter — новая строка)"
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    disabled={loading}
                    style={{
                        resize: 'none',
                        flex: 1
                    }}
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSend}
                    loading={loading}
                    disabled={!inputValue.trim() || loading}
                    style={{
                        height: 'auto',
                        padding: '8px 16px',
                        alignSelf: 'flex-end'
                    }}
                >
                    Отправить
                </Button>
            </div>
        </Card>
    );
};

export default Chat;
