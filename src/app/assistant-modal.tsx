import { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Bot, Send, X } from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { AIService } from '@/services/aiService';
import { useTaskStore } from '@/store/useTaskStore';

type Message = { id: string; role: 'user' | 'ai'; text: string };

export default function AssistantModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const addAIGeneratedTasks = useTaskStore((s) => s.addAIGeneratedTasks);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'Hi! How can I help you plan your day?' },
  ]);

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), role: 'user', text },
    ]);
    setInputText('');
    setIsTyping(true);

    try {
      const result = await AIService.processUserInput(text);

      if (result.extractedTasks && result.extractedTasks.length > 0) {
        addAIGeneratedTasks(
          result.extractedTasks.map((t) => ({ ...t, status: 'todo' as const }))
        );
      }

      setMessages((prev) => [
        ...prev,
        { id: String(Date.now() + 1), role: 'ai', text: result.message },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: 'ai',
          text: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-neutral-50"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
         <View
     className="flex-row items-center justify-between px-4 pb-3 bg-white border-b border-border-light"
     style={{ paddingTop: insets.top + 12 }}
   >
        <Text className="font-inter-bold text-lg text-neutral-900">
          AI Assistant
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={22} color={Colors.neutral[500]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4"
        contentContainerStyle={{ paddingVertical: 20, gap: 16 }}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={
              msg.role === 'user'
                ? 'max-w-[85%] rounded-2xl p-4 bg-primary-600 self-end rounded-tr-sm'
                : 'max-w-[85%] rounded-2xl p-4 bg-white border border-border-light self-start rounded-tl-sm shadow-sm'
            }
          >
            {msg.role === 'ai' && (
              <View className="flex-row items-center gap-x-2 mb-2">
                <Bot size={14} color={Colors.primary.main} />
                <Text className="font-inter-semibold text-[10px] text-primary-600 uppercase tracking-wider">
                  AI Agent
                </Text>
              </View>
            )}
            <Text
              className={
                msg.role === 'user'
                  ? 'font-inter-regular text-base leading-6 text-white'
                  : 'font-inter-regular text-base leading-6 text-neutral-800'
              }
            >
              {msg.text}
            </Text>
          </View>
        ))}

        {isTyping && (
          <View className="self-start bg-white border border-border-light rounded-2xl rounded-tl-sm p-4 px-5 shadow-sm">
            <ActivityIndicator size="small" color={Colors.primary.main} />
          </View>
        )}
      </ScrollView>

         <View
     className="px-4 pt-4 bg-white border-t border-border-light"
     style={{ paddingBottom: insets.bottom + 16 }}
   >
        <View className="flex-row items-center bg-neutral-100 rounded-full px-4 py-2 border border-neutral-200">
          <TextInput
            className="flex-1 font-inter-regular text-base text-neutral-900 py-2"
            placeholder="e.g. Block an hour for my presentation..."
            placeholderTextColor={Colors.neutral[400]}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
            returnKeyType="send"
            autoFocus
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className={
              inputText.trim() && !isTyping
                ? 'p-2 rounded-full ml-2 bg-primary-600'
                : 'p-2 rounded-full ml-2 bg-neutral-300'
            }
          >
            <Send size={18} color="#FFFFFF" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>
        <Text className="text-center font-inter-regular text-[10px] text-neutral-400 mt-3">
          AI can make mistakes. Verify important schedules.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}