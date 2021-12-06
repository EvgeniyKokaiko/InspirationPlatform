import React, {useCallback, useState} from 'react';
import {Image, Modal, TouchableOpacity, View, Text, StyleSheet, Pressable, ScrollView} from "react-native";
import {St} from "../../Styles/StylesTwo";
import {StylesOne} from "../../Styles/StylesOne";
import {Post} from "../../Types/Models";
import {apiUrl} from "../../redux/actions";
import {images} from "../../assets/images";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {mockupHeightToDP} from "../../Parts/utils";


type myPostProps = {} & Post


const MyPost = (props: myPostProps) => {
    const dataPath = `http://${apiUrl}/storage/${props.owner}/posts/${props.image.length > 0 && props.data_count > 0 ? props.image : props.video}/`
    const [modal, showModal]: [boolean, Function] = useState(false);
    const createList = () => {
        const result = [];
        for (let i = 0; i < props.data_count; i++) {
            result.push(i)
        }
        return result
    }
   const _renderItem = useCallback(({item, index}) => {
       console.log(`${dataPath}${item}.png`, 545)
       return (
           <Image key={1} style={[St.image100modal]} source={{uri: `${dataPath}${item}.png`}} />
       );
   },[])

    return (
        <View key={props.id} style={[St.postListItem, St.zIndex2]}>
            <TouchableOpacity onPress={() => showModal(true)} key={props.id} style={St.image100}>
                <Image style={[StylesOne.wh100, St.borderImage]} source={{uri: `${dataPath}0.png`}} />
            </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modal}
                    >
                        <View style={St.modalWidth}>
                            <View style={[St.centeredView, St.zIndex999]}>
                                <View style={St.modalView}>
                                     <TouchableOpacity onPress={() => showModal(false)} style={[St.exitButton]}>
                                         <Image source={images.shrink} style={St.image100} />
                                     </TouchableOpacity>
                                    <Text style={St.ownerText}><Image style={St.image15} source={images.userImg} /> {props.owner}</Text>
                                    <View style={[St.PhotoList]}>
                                    <Carousel
                                        data={createList()}
                                        renderItem={_renderItem}
                                        sliderWidth={mockupHeightToDP(400)}
                                        itemWidth={mockupHeightToDP(390)}
                                        activeAnimationType="spring"
                                    />
                                    </View>
                                    {/*<Pagination*/}
                                    {/*    dotsLength={a.length}*/}
                                    {/*    activeDotIndex={1}*/}
                                    {/*    containerStyle={{ backgroundColor: "transparent" }}*/}
                                    {/*    dotStyle={{*/}
                                    {/*        width: 10,*/}
                                    {/*        height: 5,*/}
                                    {/*        borderRadius: 5,*/}
                                    {/*        marginHorizontal: 8,*/}
                                    {/*        backgroundColor: 'rgba(0, 0, 0, 0.4)'*/}
                                    {/*    }}*/}
                                    {/*    inactiveDotStyle={{*/}
                                    {/*        // Define styles for inactive dots here*/}
                                    {/*    }}*/}
                                    {/*    inactiveDotOpacity={0.4}*/}
                                    {/*    inactiveDotScale={0.6}*/}
                                    {/*/>*/}
                                    <ScrollView style={[]}>
                                        <Text>{props.caption}</Text>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                </Modal>
        </View>
    );
};


export default MyPost;