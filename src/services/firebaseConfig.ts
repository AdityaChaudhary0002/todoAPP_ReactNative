// React Native Firebase uses native SDKs. 
// You will need to add google-services.json for Android and GoogleService-Info.plist for iOS.
// This is simply a centralized export if needed later.

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const FirebaseAuth = auth();
export const FirestoreDB = firestore();
