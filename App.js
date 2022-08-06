import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { BlurView } from "expo-blur";

import logo from "./assets/logo.png";
import React from "react";

function CustomButton(props) {
    return (
        <TouchableOpacity onPress={props.click} style={styles.button}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    );
}

export default function App() {
    const [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert(
                "Permission to access camera roll is required! No worries. Next time."
            );
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        setSelectedImage({ localUri: pickerResult.uri });
    };

    let openShareDialogAsync = async () => {
        if (Platform.OS === "web") {
            alert("oh sorry, sharing isn't available on your platform");
            return;
        }
        await Sharing.shareAsync(selectedImage.localUri);
    };

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                />
                <CustomButton
                    click={openShareDialogAsync}
                    text={"Share this photo"}
                />
                <CustomButton
                    click={() => setSelectedImage(null)}
                    text={"Restart"}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <BlurView intensity={50} style={styles.textContainer}>
                <Text style={styles.instructions}>
                    To share a photo from your phone with a friend, just press
                    the button below!
                </Text>
            </BlurView>
            <CustomButton click={openImagePickerAsync} text={"Pick a pic"} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    instructions: {
        color: "black",
        fontSize: 18,
        marginHorizontal: 20,
        marginBottom: 10,
        // opacity: 1.0,
    },
    textContainer: {
        borderRadius: 15,
    },
    button: {
        backgroundColor: "darkgray",
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
    },
    thumbnail: {
        width: "100%",
        height: 230,
        resizeMode: "contain",
    },
});
