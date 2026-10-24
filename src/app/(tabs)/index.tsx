import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { useTaskStore } from '@/store/useTaskStore';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Home() {
  const router = useRouter();
  const tasks = useTaskStore((s) => s.tasks);
  const pending = tasks.filter((t) => t.status !== 'completed');
  const done = tasks.length - pending.length;
  const next = pending[0];
  const upcoming = pending.slice(1, 4);

  return (
    <ScrollView
      className="flex-1 bg-surface-muted"
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <View>
        <Text className="font-inter-bold text-2xl text-neutral-900">
          {greeting()}
        </Text>
        <Text className="text-neutral-500">
          {pending.length} pending, {done} completed
        </Text>
      </View>

      <Card variant="highlight">
        <CardHeader>
          <Text className="font-inter-bold text-lg text-primary-700">
            Next up
          </Text>
        </CardHeader>
        <CardContent>
          {next ? (
            <View>
              <Text className="font-inter-semibold text-base text-neutral-900">
                {next.title}
              </Text>
              {next.estimatedMinutes ? (
                <Text className="text-neutral-500">
                  {next.estimatedMinutes} min
                </Text>
              ) : null}
            </View>
          ) : (
            <Text className="text-neutral-500">
              Nothing pending. Ask the assistant to plan your day.
            </Text>
          )}
        </CardContent>
      </Card>

      {upcoming.length > 0 && (
        <Card>
          <CardHeader>
            <Text className="font-inter-bold text-base text-neutral-900">
              Coming up
            </Text>
          </CardHeader>
          <CardContent>
            {upcoming.map((t) => (
              <Text key={t.id} className="text-neutral-800 py-1">
                {t.title}
              </Text>
            ))}
          </CardContent>
        </Card>
      )}

      <Button
        label="Ask AI Assistant"
        onPress={() => router.push('/assistant-modal')}
      />
    </ScrollView>
  );
}