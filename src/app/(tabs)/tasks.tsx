import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Sparkles, CheckCircle2, Circle } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Card } from '../../components/ui/Card';
import { useTaskStore } from '../../store/useTaskStore';

export default function TasksScreen() {
  const router = useRouter();
  const { tasks, toggleTaskCompletion } = useTaskStore();

  const pendingTasks = tasks.filter((task) => task.status !== 'completed');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <View className="flex-1 bg-neutral-50">
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Section */}
        <View className="mb-6">
          <Text className="font-inter-bold text-2xl text-neutral-900">Today's Tasks</Text>
          <Text className="font-inter-regular text-sm text-neutral-500 mt-1">
            {pendingTasks.length} pending • {completedTasks.length} completed
          </Text>
        </View>

        {/* Task List */}
        <View className="gap-y-3">
          {tasks.map((task) => (
            <Card key={task.id} className="p-4">
              <View className="flex-row items-start gap-x-3">
                {/* Checkbox Toggle */}
                <TouchableOpacity 
                  onPress={() => toggleTaskCompletion(task.id)}
                  className="mt-0.5"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 size={22} color={Colors.status.success} />
                  ) : (
                    <Circle size={22} color={Colors.neutral[400]} />
                  )}
                </TouchableOpacity>

                {/* Task Details */}
                <View className="flex-1">
                  <Text 
                    className={`font-inter-semibold text-base ${
                      task.status === 'completed' 
                        ? 'line-through text-neutral-400' 
                        : 'text-neutral-900'
                    }`}
                  >
                    {task.title}
                  </Text>
                  
                  {/* Metadata Row (AI Tags, Time) */}
                  <View className="flex-row items-center gap-x-3 mt-1">
                    {task.estimatedMinutes && (
                      <View className="flex-row items-center gap-x-1">
                        <Clock size={12} color={Colors.neutral[500]} />
                        <Text className="font-inter-regular text-xs text-neutral-500">
                          {task.estimatedMinutes} min
                        </Text>
                      </View>
                    )}
                    
                    {task.isAIGenerated && (
                      <View className="flex-row items-center gap-x-1 bg-primary-50 px-2 py-0.5 rounded-md">
                        <Sparkles size={10} color={Colors.primary.main} />
                        <Text className="font-inter-semibold text-[10px] text-primary-600">
                          AI Added
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </Card>
          ))}

          {pendingTasks.length === 0 && (
            <View className="items-center justify-center py-10">
              <CheckCircle2 size={48} color={Colors.status.success} strokeWidth={1} />
              <Text className="font-inter-semibold text-neutral-600 mt-4 text-center">
                All caught up for today!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 🤖 Floating Action Button (FAB) for AI Assistant */}
      <TouchableOpacity
        onPress={() => router.push('/assistant-modal')}
        className="absolute bottom-6 right-6 bg-neutral-900 rounded-full w-14 h-14 items-center justify-center shadow-lg shadow-black/30"
        style={{
          ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
            android: { elevation: 8 }
          })
        }}
      >
        <Sparkles size={24} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}