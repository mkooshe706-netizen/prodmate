import { View, Text } from 'react-native';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export default function Home() {
  return (
    <View className="flex-1 bg-surface-muted p-4 gap-4">
      <Card variant="highlight">
        <CardHeader>
          <Text className="font-inter-bold text-lg text-primary-700">
            Next up
          </Text>
        </CardHeader>
        <CardContent>
          <Text className="text-neutral-500">NativeWind test card</Text>
        </CardContent>
      </Card>
      <Button label="Test button" onPress={() => {}} />
    </View>
  );
}