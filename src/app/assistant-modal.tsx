>
            {msg.role === 'ai' && (
              <View className="flex-row items-center gap-x-2 mb-2">
                <Bot size={14} color={Colors.primary.main} />
                <Text className="font-inter-semibold text-[10px] text-primary-600 uppercase tracking-wider">
                  AI Agent
                </Text>
              </View>
            )}
            <Text className={font-inter-regular text-base leading-6 ${
              msg.role === 'user' ? 'text-white' : 'text-neutral-800'
            }}>
              {msg.text}
            </Text>
          </View>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <View className="self-start bg-white border border-border-light rounded-2xl rounded-tl-sm p-4 px-5 shadow-sm">
            <ActivityIndicator size="small" color={Colors.primary.main} />
          </View>
        )}
      </ScrollView>

      {/* ⌨️ Input Area */}
      <View className="px-4 py-4 bg-white border-t border-border-light mb-4">
        <View className="flex-row items-center bg-neutral-100 rounded-full px-4 py-2 border border-neutral-200">
          <TextInput
            className="flex-1 font-inter-regular text-base text-neutral-900 py-2"
            placeholder="e.g. Block an hour for my presentation..."
            placeholderTextColor={Colors.neutral[400]}
            value={inputText}
            onChangeText={inputText => setInputText(inputText)}
            onSubmitEditing={handleSendMessage}
            returnKeyType="send"
            autoFocus
          />
          
          <TouchableOpacity 
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className={p-2 rounded-full ml-2 ${
              inputText.trim() && !isTyping ? 'bg-primary-600' : 'bg-neutral-300'
            }}
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