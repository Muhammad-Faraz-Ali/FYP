import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from '../homePages/index.js';
import NotificationPage from '../notificationPages/index.js';
import ResultPage from '../../screens/result/index.js';
import DetailsPage from '../../screens/userDetails/index.js';
import AuthenticationPage from '../../screens/authentication/index.js';
import LoginPage from '../../screens/login/index.js';
import SignupPage from '../../screens/signup/index.js';
import TeacherPage from '../../screens/teacherAccount/index.js';
import StudentPage from '../../screens/studentAccount/index.js';
import GuestPage from '../../screens/guestSearch/index.js';
import SplashPage from '../../screens/splash/index.js';
import {
  GradesAndSubjectsContext,
  NotificationsContext,
} from '../../Context/index';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const NativeStack = createNativeStackNavigator();

const Index = () => {
  let grades = [];
  let subjects = [];
  let experiences = [];
  let ages = [];
  let testingVariable = 'test value';
  //states for incoming notifications
  const [teacher, setTeacher] = useState([]); //hold pure teacher noti...
  const [student, setStudent] = useState([]); //hold pure student noti...
  const [teacherOther, setTeacherOther] = useState([]); //inside other category noti related to teacher
  const [studentOther, setStudentOther] = useState([]); //inside other category noti related to student
  const [teacherUnread, setTeacherUnread] = useState(0);
  const [studentUnread, setStudentUnread] = useState(0);
  const [teacherOtherUnread, setTeacherOtherUnread] = useState(0);
  const [studentOtherUnread, setStudentOtherUnread] = useState(0);
  const initializeValues = async () => {
    let result = await firestore()
      .collection('grades_subjects')
      .doc('5BN1TOI0Oso0t3uPElGQ')
      .get();
    let values = result.data();
    //console.log('from firestore: ', values);
    //console.log('Grades Before: ', getGradesFromModule());
    if (values.grades != undefined) {
      values.grades.forEach(item => grades.push(item));
    } //setting grades after fetching data from database
    //console.log('Grades After: ', getGradesFromModule());
    if (values.subjects != undefined) {
      grades.forEach(item => {
        let val = values.subjects[item];
        subjects.push(val);
      });
    }
    testingVariable = 'Original Value';
    // console.log(
    //   'going to set these values in context',
    //   grades,
    //   subjects,
    //   testingVariable,
    // );

    result = await firestore()
      .collection('other_information')
      .doc('deLdOaQGn0TB9lkrOwIS')
      .get();
    values = result.data();
    if (values.experience != undefined) {
      values.experience.forEach(item => experiences.push(item));
    }
    if (values.age != undefined) {
      values.age.forEach(item => ages.push(item));
    }

    console.log('Context values: ', grades, subjects, experiences, ages);
    // console.log('values: ', values);
    // console.log('Grades: ', getGradesFromModule());
    // console.log('Subjects: ', getSubjectsFromModule());

    //setting states
    // setGrades(Array.from({length: getGradesFromModule().length}, () => false));
    // setSubjects(
    //   Array.from({length: getSubjectsFromModule().length}, () =>
    //     Array.from({length: 9}, () => false),
    //   ),
    // );
    //
  };

  return (
    <GradesAndSubjectsContext.Provider
      value={{grades, subjects, experiences, ages, testingVariable}}>
      <NotificationsContext.Provider
        value={{
          teacher,
          teacherOther,
          teacherUnread,
          teacherOtherUnread,
          student,
          studentOther,
          studentUnread,
          studentOtherUnread,
          setTeacher,
          setTeacherOther,
          setTeacherUnread,
          setTeacherOtherUnread,
          setStudent,
          setStudentOther,
          setStudentUnread,
          setStudentOtherUnread,
        }}>
        <NavigationContainer>
          <NativeStack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{headerShown: false}}>
            {/* <NativeStack.Screen name="Splash"></NativeStack.Screen>
            <NativeStack.Screen name="Authentication"></NativeStack.Screen>*/}

            {/* Screen named "Main" is itself a "BottomTabNavigator" which will further route to pages */}
            <NativeStack.Screen
              name="SplashScreen"
              component={SplashPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="Authentication"
              component={AuthenticationPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="Login"
              component={LoginPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="Signup"
              component={SignupPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="Main"
              component={MainPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="Result"
              component={ResultPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="UserDetails"
              component={DetailsPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="Notification"
              component={NotificationPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="TeacherAccount"
              component={TeacherPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="StudentAccount"
              component={StudentPage}></NativeStack.Screen>
            <NativeStack.Screen
              name="GuestSearch"
              component={GuestPage}></NativeStack.Screen>
            {/* Screen named "Notification" is itself a "TopTabNavigator" which will further route to pages */}
            {/* Notification Screen is not build yet so commented out until its creation */}
            {/*  */}
            {/* 

             */}
          </NativeStack.Navigator>
        </NavigationContainer>
        <Toast></Toast>
      </NotificationsContext.Provider>
    </GradesAndSubjectsContext.Provider>
  );
};

export default Index;
