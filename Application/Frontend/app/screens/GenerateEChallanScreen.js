import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, Button, Image } from 'react-native';
import { useCameraPermissions, Camera, CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import EChallanForm from './EChallanForm';
import { storage } from "../config/firebase"
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function GenerateEChallanScreen({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [IsPopupVisible, setIsPopupVisible] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function closePopup() {
    setPopupVisible(false);
  }

  // Add this new function to handle form reset
  const handleFormReset = () => {
    setPhoto(null);
    setUploadedImageUrl(null);
    setIsPopupVisible(false);
    setIsUploading(false);
  };

  const uploadImageToFirebase = async (uri) => {
    try {
      setIsUploading(true);
      
      // Convert image to blob
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Create a unique filename
      const randomImageName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.jpg`;
      const storageRef = ref(storage, `VehicleImages/${randomImageName}`);
      
      // Upload blob to Firebase Storage
      const uploadResult = await uploadBytes(storageRef, blob);
      
      // Get download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      setUploadedImageUrl(downloadURL);
      console.log("image url: ", uploadedImageUrl);
      setIsUploading(false);
      return downloadURL;
    } catch (error) {
      setIsUploading(false);
      Alert.alert('Upload Error', 'Failed to upload image to storage');
      console.error('Upload error:', error);
      return null;
    }
  };

  async function handleCapture() {
    if (cameraRef && cameraRef.takePictureAsync) {
      try {
        const photoData = await cameraRef.takePictureAsync();
        const filePath = `${FileSystem.cacheDirectory}${Date.now()}.jpg`; 
        await FileSystem.moveAsync({
          from: photoData.uri,
          to: filePath,
        });
        setPhoto(filePath);
        setPopupVisible(true);
        
        // Upload image right after capture
        const imageUrl = await uploadImageToFirebase(filePath);
        Alert.alert('Image uploaded successfully!')
        console.log("image url: ", imageUrl);
        if (imageUrl) {
          setUploadedImageUrl(imageUrl);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Camera not ready or method not available.');
    }
  }

  return (
    <View style={styles.container}>
      {/* Only show camera if no photo is captured */}
      {!photo ? (
        <CameraView
          style={styles.camera}
          type={facing}
          ref={(ref) => setCameraRef(ref)}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.captureButton]} onPress={handleCapture}>
              <Text style={styles.text}>Capture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        // Pass the reset handler to the form
        <EChallanForm
          photo={photo}
          uploadedImageUrl={uploadedImageUrl}
          onReset={handleFormReset}
        />
      )}

      {/* Popup Modal for Image Preview */}
      <Modal visible={isPopupVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Captured Image</Text>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.preview} />
            ) : (
              <Text>No image available</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setPhoto(null);
                setPopupVisible(false);
              }}
            >
              <Text style={styles.closeButtonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#F9FAFB',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 8,
    marginTop: 600,
  },
  captureButton: {
    backgroundColor: '#2563EB',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popup: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preview: {
    width: 300,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    marginVertical: 5,
    width: '40%',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  closeButtonText: {
    color: 'white',
    paddingVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
