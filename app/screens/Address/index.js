import React from 'react'
import { View, Text } from 'react-native'
import Container from '../../components/Container'
import ScreenHeader from '../../components/ScreenHeader'
import CustomButton from '../../components/CustomButton'
import { scale } from 'react-native-size-matters'
export default function index() {
    return (
        <>
        <Container isScrollable>
            <ScreenHeader label="Shipping Address"  /> 

            
        </Container>
        <View style={{paddingHorizontal:scale(20), justifyContent:'flex-end',flex:0.5,alignItems:'flex-end'}}>
        <CustomButton  label="New" />
        </View>
        </>
    )
}
