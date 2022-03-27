import React, { useEffect, useState } from "react"
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from "react-native"
import { CarouselComponent } from "./CarouselComponent"



type IProps = {}
type IState = {
    visible: boolean;
}

const CarouselContainer = (props: IProps) => {
const [getState, setState] = useState<IState>({
    visible: false,

})
let defaultHeaderText: string = '0 of 9';
const scrollContainerRef = React.createRef<ScrollView>();


const initModal = () => {

}

const hideModal = () => {
    setState({...getState, visible: false})
}

const showModal = () => {
    initModal();
    setState({...getState, visible: true})
}

function onMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    
}

useEffect(() => {
    initModal();
}, [])


const STATE = {
    defaultHeaderText,
    scrollContainerRef,
    onMomentumScrollEnd,
    visible: getState.visible,
    showModal,
    hideModal,
}

    return <CarouselComponent {...STATE} />
}