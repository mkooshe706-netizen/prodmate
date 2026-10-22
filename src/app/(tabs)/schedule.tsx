<View className="items-center flex-1">
                    <View className={w-3 h-3 rounded-full ${block.type === 'focus' ? 'bg-primary-500' : 'bg-neutral-300'}} />
                    {!isLast && (
                      <View className="w-px flex-1 bg-neutral-200 mt-1 mb-1" />
                    )}
                  </View>
                </View>

                {/* Right Column: Schedule Card */}
                <View className="flex-1 pb-6">
                  <View className={rounded-2xl p-4 border ${styles.bg} ${styles.border}}>
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="flex-row items-center gap-x-2">
                        {styles.icon}
                        <Text className={font-inter-semibold text-xs uppercase tracking-wider ${styles.text}}>
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