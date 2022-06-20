import React, {useEffect, useContext, useState} from 'react';
import {Text} from 'react-native';
import ResultComponent from '../notifications/components/index.js';
import {NotificationsContext} from '../../Context/index.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const Index = () => {
  const notificationsContext = useContext(NotificationsContext);
  const [data, setData] = useState([]); //append new messages in this data
  const [keys, setKeys] = useState([]); //users ids will be stored in this state
  //this use effect will run when new messages will come
  const fetchNewData = async tempKeys => {
    for (let i = 0; i < tempKeys.length; i++) {
      //means this message is new so fetch it
      if (keys.indexOf(tempKeys[i]) == -1) {
        let displayPicture;
        try {
          displayPicture = await storage()
            .ref(tempKeys[i] + '/dp')
            .getDownloadURL();
        } catch (error) {
          displayPicture = './../../res/images/no-image.jpg';
        }
        //console.log('this is a picture: ', displayPicture);
        let userData = await firestore()
          .collection('students')
          .doc(tempKeys[i])
          .get();
        userData = userData.data();
        //console.log('this is user data:', userData);
        let newUser = {
          userId: tempKeys[i],
          displayPicture: displayPicture,
          data: userData,
        };
        //let temp = data.push(newUser);
        // let allData = data;
        // allData.push(newUser);
        //let temp = [...data];
        //temp.push(newUser);
        // for (let itm in data) temp.push(itm);
        // temp.push(newUser);
        setData(oldData => [...oldData, newUser]);
        //tempAllUsers.push(newUser);
        //console.log('after pushing data: ', tempAllUsers);
      }
      //console.log('before pushing data: ', tempAllUsers);
    }
  };
  useEffect(() => {
    let tempKeys = notificationsContext.teacher.map(item => item.id);
    fetchNewData(tempKeys);
    setKeys(tempKeys);
  }, [
    notificationsContext.teacher,
    //notificationsContext.teacherOhter,
    //notificationsContext.student,
    //notificationsContext.studentOhter,
    //notificationsContext.teacherUnread,
  ]);
  return <ResultComponent dataList={data}></ResultComponent>;
  //return <Text>I'm screen</Text>;
};

export default Index;
