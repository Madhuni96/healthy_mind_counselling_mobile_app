import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ImgFeatured, ImgLogo } from '../../Constants/Imports'

function Header() {
    return (
        <ImageBackground
            source={ImgFeatured}
            style={styles.container}>
                <LinearGradient
                    colors={['rgba(255, 204, 0,0.3)', 'rgba(255,255,255,0.5)' ]}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Header
