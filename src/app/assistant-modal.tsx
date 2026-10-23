import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Bot, Send, X } from 'lucide-react-native';
import { Colors } from '@/theme/colors';

type Message = { id: string; role: 'user' | 'ai'; text: string };

export default function AssistantModal() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'Hi! How can I help you plan your day?' },
  ]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), role: 'user', text },
      {
        id: String(Date.now() + 1),
        role: 'ai',
        text: 'AI replies will appear here once the assistant is connected.',
      },
    ]);
    setInput('');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pt-4 pb-3 border-b border-border-light">
        <Text className="font-inter-bold text-lg text-neutral-900">AI Assistant</Text>
        <Pressable onPress={() => router.back()}>
          <X size={22} color={Colors.neutral[500]} />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={
              msg.role === 'user'
                ? 'self-end bg-primary-600 rounded-2xl px-4 py-3 mb-3 max-w-[85%]'
                : 'self-start bg-neutral-100 rounded-2xl px-4 py-3 mb-3 max-w-[85%]'
            }
          >
            {msg.role === 'ai' && (
              <View className="flex-row items-center gap-x-2 mb-1">
                <Bot size={14} color={Colors.primary.main} />
                <Text className="font-inter-semibold text-primary-600 uppercase">
                  AI Agent
                </Text>
              </View>
            )}
            <Text className={msg.role === 'user' ? 'text-white' : 'text-neutral-800'}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center gap-x-2 px-4 py-3 border-t border-border-light">
        <TextInput
          className="flex-1 bg-neutral-100 rounded-xl px-4 py-3"
          placeholder="Ask anything..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
        />
        <Pressable onPress={send} className="bg-primary-600 rounded-xl p-3">
          <Send size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}