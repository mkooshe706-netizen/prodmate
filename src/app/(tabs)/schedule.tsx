import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Lock, Sparkles, Calendar, Clock, Coffee, Briefcase, Zap } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Button } from '../../components/ui/Button';
import { ScheduleBlock } from '../../types/task.types';

// Initial sample schedule blocks
const initialBlocks: ScheduleBlock[] = [
  {
    id: 'b1',
    title: 'Deep Work: App Architecture',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    type: 'focus',
    isAILocked: true,
  },
  {
    id: 'b2',
    title: 'Product Sync & Standup',
    startTime: '11:00 AM',
    endTime: '11:45 AM',
    type: 'meeting',
    isAILocked: false,
  },
  {
    id: 'b3',
    title: 'Lunch & Break',
    startTime: '12:30 PM',
    endTime: '01:30 PM',
    type: 'break',
    isAILocked: false,
  },
  {
    id: 'b4',
    title: 'Review Q3 Marketing Strategy',
    startTime: '02:00 PM',
    endTime: '02:45 PM',
    type: 'routine',
    isAILocked: false,
  },
];

export default function ScheduleScreen() {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>(initialBlocks);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Helper to resolve colors and icons per block type
  const getBlockStyle = (type: ScheduleBlock['type']) => {
    switch (type) {
      case 'focus':
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-200',
          text: 'text-primary-700',
          icon: <Zap size={14} color={Colors.primary.main} />,
        };
      case 'meeting':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-700',
          icon: <Briefcase size={14} color="#D97706" />,
        };
      case 'break':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-700',
          icon: <Coffee size={14} color="#059669" />,
        };
      default:
        return {
          bg: 'bg-neutral-100',
          border: 'border-neutral-200',
          text: 'text-neutral-700',
          icon: <Clock size={14} color={Colors.neutral[600]} />,
        };
    }
  };

  const handleReoptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-neutral-50">
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="font-inter-bold text-2xl text-neutral-900">Today's Schedule</Text>
            <Text className="font-inter-regular text-sm text-neutral-500 mt-1">
              AI Optimized • {blocks.length} time blocks
            </Text>
          </View>
          <View className="bg-neutral-200 p-2.5 rounded-xl">
            <Calendar size={20} color={Colors.neutral[700]} />
          </View>
        </View>

        {/* Timeline View */}
        <View className="mt-2">
          {blocks.map((block, index) => {
            const styles = getBlockStyle(block.type);
            const isLast = index === blocks.length - 1;

            return (
              <View key={block.id} className="flex-row">
                
                {/* Left Column: Time & Timeline Line */}
                <View className="w-16 items-center mr-3">
                  <Text className="font-inter-semibold text-xs text-neutral-500 mt-1">
                    {block.startTime.split(' ')[0]}
                  </Text>
                  <Text className="font-inter-regular text-[10px] text-neutral-400 mb-2">
                    {block.startTime.split(' ')[1]}
                  </Text>
                  
                  {/* The vertical line connecting items */}
                  <View className="items-center flex-1">
                    <View className={`w-3 h-3 rounded-full ${block.type === 'focus' ? 'bg-primary-500' : 'bg-neutral-300'}`} />
                    {!isLast && (
                      <View className="w-px flex-1 bg-neutral-200 mt-1 mb-1" />
                    )}
                  </View>
                </View>

                {/* Right Column: Schedule Card */}
                <View className="flex-1 pb-6">
                  <View className={`rounded-2xl p-4 border ${styles.bg} ${styles.border}`}>
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="flex-row items-center gap-x-2">
                        {styles.icon}
                        <Text className={`font-inter-semibold text-xs uppercase tracking-wider ${styles.text}`}>
                          {block.type}
                        </Text>
                      </View>
                      
                      {/* AI Lock Indicator */}
                      {block.isAILocked && (
                        <View className="flex-row items-center gap-x-1">
                          <Lock size={12} color={Colors.primary.main} />
                          <Text className="font-inter-semibold text-[10px] text-primary-600">
                            AI Locked
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text className="font-inter-bold text-base text-neutral-900 mb-1">
                      {block.title}
                    </Text>
                    <Text className="font-inter-regular text-sm text-neutral-500">
                      {block.startTime} - {block.endTime}
                    </Text>
                  </View>
                </View>
                
              </View>
            );
          })}
        </View>

      </ScrollView>

      {/* Re-optimize floating button */}
      <View className="absolute bottom-6 left-6 right-6">
        <Button 
          label={isOptimizing ? "Re-calculating..." : "Auto-Optimize Schedule"} 
          variant="primary"
          leftIcon={!isOptimizing ? <Sparkles size={20} color="#FFFFFF" /> : undefined}
          onPress={handleReoptimize}
          isLoading={isOptimizing}
          className="shadow-lg shadow-primary-600/30"
        />
      </View>
    </View>
  );
}