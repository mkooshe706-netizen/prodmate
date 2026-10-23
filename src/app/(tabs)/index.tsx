import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-muted p-4 gap-4">
      <Card variant="highlight">
        <CardHeader>
          <Text className="font-inter-bold text-lg text-primary-700">
            Today
          </Text>
        </CardHeader>
        <CardContent>
          <Text className="text-neutral-500">
            Ask the assistant to plan your day.
          </Text>
        </CardContent>
      </Card>
      <Button
        label="Ask AI Assistant"
        onPress={() => router.push('/assistant-modal')}
      />
    </View>
  );
}