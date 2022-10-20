import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export const CustomTicketFlatList = (props) => {
    const data = props.data;
    console.log('data', data)
    let renderItem = [];
    for (let singleItem of data) {
        console.log('singleItem', singleItem)
        const renderSigleItem = props.renderItem(singleItem)
        console.log('renderSigleItem', renderSigleItem)
       renderItem.push(props.renderItem(singleItem));
    }

    return (renderItem)
}
const styles = StyleSheet.create({
    flatListStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        borderRadius: 5,
        backgroundColor: 'white',
        alignContent: 'center',
        padding: 15,
    },
})

