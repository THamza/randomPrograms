

import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
    Button,
  View,
    Share,
  StyleSheet,
  SafeAreaView,AsyncStorage
} from 'react-native';
// import { Button as CButton, GooglePlayButton } from "@freakycoder/react-native-button";
// import { Button } from "@freakycoder/react-native-button";
import {
  State,
  FlingGestureHandler,
  Directions,
} from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

const D = require("./data.json") //DATA data

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;

const OverflowItems = ({ scrollX, data }) => {
  const translateY = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={{ height: OVERFLOW_HEIGHT, overflow: 'hidden' }}>
      <Text style={[styles.title]} numberOfLines={1}>
        Contacts
      </Text>
      <Text style={[styles.location]}>
        Mr.Michael's
      </Text>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <Animated.View key={index} style={styles.itemContainer}>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                </Text>
                <Text style={[styles.date]}>{index + 1} / {data.length}</Text>

              </View>
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function App() {
  let scrollX = React.useRef(new Animated.Value(0)).current;
  let scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  let [index, setIndex] = React.useState(0);
  let [data, setData] = React.useState(D);
  // let [finalData, setFinalData] = React.useState([]);

  const setAnimatedIndex = React.useCallback((i) => {
    setIndex(i);
    scrollX.setValue(i);
  }, []);

  // interconnected animations aka reactive animations :D
  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true,
    }).start();
  });

  React.useEffect(() => {
    _fetchData()
  }, []);

  // React.useEffect(() => {
  //   if (index === data.length - VISIBLE_ITEMS - 2) {
  //     console.log('fetch more')
  //     const newData = [...data, ...data];
  //
  //     setData(newData);
  //   }
  // }, [index]);

  const handleKPPress =()=>{
    data[index].type = "Key Player"
    setAnimatedIndex(index + 1)
    // setFinalData(oldArray => [...oldArray, data[index]]);
  }
  const handleFPress =()=>{
    data[index].type = "Frequent"
    setAnimatedIndex(index + 1)
    // setFinalData(oldArray => [...oldArray, data[index]]);
  }
  const handleIPress =()=>{
    data[index].type = "Irrelevant"
    setAnimatedIndex(index + 1)
    // setFinalData(oldArray => [...oldArray, data[index]]);
    // console.log("dinal data:",finalData)
  }

  const _storeData = async () => {
    // console.log("Stored index:", finalData)
    try {
      await AsyncStorage.setItem('@index:key', index.toString());
      await AsyncStorage.setItem('@finalData:key', JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };
  const _fetchData = async () => {
    try {
      let i = await AsyncStorage.getItem('@index:key');
      console.log(i)
      if (i !== null) {
        setIndex(parseInt(i, 10))
        setAnimatedIndex(parseInt(i, 10))
      }
      let fd = await AsyncStorage.getItem('@finalData:key');
      if (fd !== null) {
        setData(JSON.parse(fd))

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: JSON.stringify(data),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            // setAnimatedIndex(0)
            return;
          }
          setAnimatedIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.END) {
            if (index === 0) {
              // setAnimatedIndex(data.length - 1)
              return;
            }
            setAnimatedIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />

          <OverflowItems scrollX={scrollXAnimated} data={data} />
          <View style={{marginTop: 20}}>
            <View style={{marginRight:10, flexDirection: 'row',  justifyContent:'space-around'}}>
              <Button
                  title="Save"
                  onPress={()=> _storeData()}

              />
              <Button
                  title="Share"
                  color="#fff"
                  onPress={()=> onShare()}

              />
            </View>
          </View>
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            scrollEnabled={false}
            inverted
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              marginTop: height * -0.3,
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2
            }}
            CellRendererComponent={({ children, index, style, ...props }) => {
              const cellStyle = [
                style,

                // I want each item to have a higher zIndex than the previous one,
                // in reversed order due to the FlatList being inverted
                { zIndex: data.length - index },
              ];

              // OverflowableView for Android...
              return (
                <View style={cellStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              return (
                  <View>
                <Animated.View
                  style={{
                    backgroundColor: (item.type==="Irrelevant"?'#0f3057':(item.type==="Frequent"?"#66bfbf":(item.type==="Key Player"?"#ee6f57":"#524155"))),
                    position: 'absolute',
                    width: ITEM_WIDTH,
                    top: -ITEM_HEIGHT / 2,
                    borderRadius: 10,
                    overflow: 'hidden',
                    transform: [{ translateX }, { scale }],
                    opacity,
                  }}
                >
                  {/*<Image*/}
                  {/*  source={{ uri: item.poster }}*/}
                  {/*  style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}*/}
                  {/*/>*/}
                  <View style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT * 0.5, justifyContent: 'center'}}>
                    <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 40}}>
                      Name: {item.Name}
                    </Text>
                    <Text style={{fontSize: 15, color: 'white', marginBottom: 20, marginLeft: 10}}>
                      Address: {item.Phone}
                    </Text>
                    <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 20}}>
                      Type: {item.type}
                    </Text>
                  </View>

                  <View>
                    {/*<Button*/}
                    {/*    solid*/}
                    {/*    textColor="white"*/}
                    {/*    shadowColor="#ff738b"*/}
                    {/*    backgroundColor="#FFAFBD"*/}
                    {/*/>*/}
                  </View>
                </Animated.View>
                  </View>
              );
            }}
          />

          <View style={{
            alignContent: 'stretch',flexDirection: 'row', marginBottom: 30}}>
            <View style={{width: '50%'}}>
            <Button
                title="Frequent"
                color="#66bfbf"
                onPress={() => handleFPress()}
            />
            </View>
            <View style={{width: '50%'}}>
            <Button
                title="Irrelevant"
                color="#0f3057"
                type="clear"
                onPress={() => handleIPress()}
            />
            </View>
          </View>
          <View style={{marginBottom: 20,  width: '75%', marginLeft: width * 0.13}}>
            <Button
                style={{}}
                title="Key Player"
                type="outline"
                color="#ee6f57"
                onPress={() => handleKPPress()}
            />
          </View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffdbc5',
  },
  title: {
    margin:10,
    marginBottom: 0,
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    marginLeft: 10,
    fontSize: 12,
  },
  date: {
    marginTop: 40,
    margin:20,
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
