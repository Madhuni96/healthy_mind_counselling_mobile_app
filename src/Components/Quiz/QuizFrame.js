import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function QuizFrame() {
    return (
        <View style={styles.container}>
            <Text>
                Q1
            </Text>
            <Text>Question 1</Text>
            <Text>Answers</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default QuizFrame
