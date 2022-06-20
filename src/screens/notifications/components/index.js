import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {NotificationsContext} from '../../../Context';
import {Card} from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
const Index = ({naviagation, route, dataList}) => {
  //const notificationsContext = useContext(NotificationsContext);
  //console.log('REsult of notifications:', dataList);
  function designItem({item}) {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', marginBottom: 10}}
        onPress={() => {
          console.log('Item clicked ', item.userId);
          //navigation.navigate('UserDetails', {item});
        }}>
        <Card
          style={{
            margin: 2,
            padding: 2,
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          elevation={10}>
          <Image
            borderRadius={50}
            source={
              item.displayPicture.includes('http')
                ? {uri: item.displayPicture}
                : require('../../../res/images/no-image.jpg')
            }
            style={{height: 70, width: 70}}
          />
          {/*Now I want to split this view into further 2 rows of equal space, both will be sum parent height which is according to image height*/}
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: 'black',
                  fontSize: 16,
                }}>
                {item.data.name}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: 15,
                    padding: 4,
                    paddingHorizontal: 8,
                  }}>
                  Fees: Rs.{item.data.fees}
                </Text>
                <Icon name={item.data.gender} color="#F39C12" size={20}></Icon>
                {item.data.verified == true ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      borderRadius: 15,
                      padding: 6,
                      backgroundColor: '#58D68D',
                      color: 'white',
                    }}>
                    verified
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.Container}>
      {/* {headerValue == true ? (
        <Card style={styles.HeaderCard} elevation={35}>
          <TouchableOpacity
            onPress={() => {
              //navigation.goBack();
            }}>
            <AntIcon name="back" size={30} color="black"></AntIcon>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'black',
              flex: 1,
            }}>
            Search Results
          </Text>
        </Card>
      ) : null} */}
      {/* <Text>{dataForFlatList.length}</Text> */}
      <FlatList data={dataList} renderItem={designItem}></FlatList>
    </View>
  );
  // return (
  //   <>
  //     <View>
  //       <Text>I'm screen</Text>
  //     </View>
  //   </>
  // );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 18,
    paddingTop: '0%',
  },
  HeaderCard: {
    margin: 10,
    padding: 3,
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default Index;
