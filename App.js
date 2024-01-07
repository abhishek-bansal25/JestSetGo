import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ListItem } from './src/components/ListItem';

function App() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const refData = useRef([]);

  useEffect(() => {
    const apiCall = async () => {
      const response = await fetch(
        'https://api.npoint.io/4829d4ab0e96bfab50e7',
      );
      const result = await response.json();
      refData.current = result?.data?.result;
      setData(refData.current);
      let uniqueAirlines = [
        ...new Set(
          result.data.result.map(
            item =>
              Object.values({ a: item.displayData.airlines[0].airlineName })[0],
          ),
        ),
      ];
      setAirlines(uniqueAirlines);
    };

    apiCall();
  }, []);

  const sortLowToHigh = () => {
    let temp = data;
    temp = temp.sort((a, b) => a?.fare - b?.fare);
    setData([...temp]);
  };

  const sortHighToLow = () => {
    let temp = data;
    temp = temp.sort((a, b) => b?.fare - a?.fare);
    setData([...temp]);
  };

  const filterAirline = airline => {
    let temp = refData.current;
    temp = temp.filter(
      item => item.displayData.airlines[0].airlineName === airline,
    );
    setData([...temp]);
  };

  const resetFilter = () => {
    setData(refData.current);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Jet Set GO</Text>

      {/* sort and filter btns */}
      <View style={styles.btnContainer}>
        <Button
          onPress={() => setDropdownVisible(prev => !prev)}
          title="filter"
        />
        <Button onPress={sortLowToHigh} title="sort: low to high" />
        <Button onPress={sortHighToLow} title="sort: high to low" />
      </View>

      {/* filter dropdown */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {airlines.map(item => (
            <TouchableOpacity key={item} onPress={() => filterAirline(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={resetFilter}>
            <Text>reset</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* list header */}
      <View style={styles.listHeaderRow}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.headerItem}>id</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.headerItem}>airline</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.headerItem}>fare</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.headerItem}>source</Text>
        </View>
        <View style={{ flex: 0.2 }}>
          <Text style={styles.headerItem}>destination</Text>
        </View>
      </View>

      {/* list */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={data ?? []}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>NO DATA AVAILABLE</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  dropdown: {
    margin: 10,
    padding: 5,
    width: '20%',
    borderWidth: 1,
    borderRadius: 10,
  },
  listHeaderRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  headerItem: {
    fontWeight: '500',
    fontSize: 14,
  },
  center: { justifyContent: 'center', alignItems: 'center' },
});

export default App;
