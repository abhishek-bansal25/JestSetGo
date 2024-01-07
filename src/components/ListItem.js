import React from "react";
import { Text, View } from "react-native";

export const ListItem = ({ item }) => {
    return (
        <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 0.1 }}>
                <Text>{item.id}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
                <Text>{item.displayData.airlines?.[0]?.airlineName}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
                <Text>{item.fare}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
                <Text>{item.displayData.source.airport.cityName}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
                <Text>{item.displayData.destination.airport.cityName}</Text>
            </View>
        </View>
    )
}