import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, Alert} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import {St} from "../Styles/StylesTwo";
import {images} from "../assets/images";
import {colors} from "../Parts/colors";
import {Picker} from "@react-native-picker/picker";
import {backgrounds} from "../Styles/Backgrounds";
import {launchImageLibrary} from "react-native-image-picker";
import {Asset} from "../Types/Models";
import {useDispatch} from "react-redux";
import {addPost} from "../redux/actions";

type IProps = {}

const AddComponent: React.FC<IProps> = (props) => {
    const [caption, setCaption] = useState("");
    const [date, setDate] = useState("");
    const [files, setFile]: [any, Function] = useState([])
    const dispatch = useDispatch();
    const type = 2;
    //owner, like_id from token on server

    const openImagePicker = async () => {
       await launchImageLibrary({mediaType: "photo", selectionLimit: 10, quality: 1}, (response) => {
           if (response.didCancel) {
               return Alert.alert("Oops,", "Something went wrong");
           }
           if (files.length > 0) {
               setFile([...files, response.assets![0]])
           } else {
               setFile([response.assets![0]])
           }
        })
    }

    const onPostAdd = async () =>  {
        dispatch(addPost(caption, files as Asset[], type));
    }

    return (
        <View style={[StylesOne.screenContainer, MP.ph25]}>
            <View style={[StylesOne.flex_row, StylesOne.flex_jc_fs, StylesOne.flex_ai_c, MP.mv20]}>
                <View style={[StylesOne.flex_row,StylesOne.flex_jc_c, StylesOne.w100]}>
                    <Text style={StylesOne.CheckBox_text}>New Post</Text>
                </View>
            </View>
            <View style={[StylesOne.inputContainer, MP.ph20, MP.mt50]}>
                <View style={[MP.mv20, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
                    <TouchableOpacity onPress={openImagePicker} style={St.addPhotoBtn}>
                            <Image style={St.wh80} source={images.plus} />
                    </TouchableOpacity>
                </View>
                <TextInput placeholder="Caption"
                           multiline
                           placeholderTextColor={colors.Placeholder}
                           underlineColorAndroid={colors.Underline_rgba_black}
                           style={[StylesOne.fontInputText_black]}
                           onChangeText={(val) => setCaption(val)}
                />

                <View style={[MP.mt50, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
                    <TouchableOpacity onPress={onPostAdd} style={[StylesOne.SignInButton, backgrounds.addPost]}>
                        <View style={[StylesOne.flexCenter, StylesOne.h100]}>
                            <Text style={StylesOne.SignIn_textStyle}>Add Post</Text>
                            <Image style={StylesOne.SignIn_image} source={images.arrowRight} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default AddComponent