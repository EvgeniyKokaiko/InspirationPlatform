import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../Parts/colors';
import { actionImpl } from '../../redux/actions';
import { MP } from '../../Styles/MP';
import { StylesFour } from '../../Styles/StylesFour';
import { StylesOne } from '../../Styles/StylesOne';
import { Comment } from '../../Types/Models';
import { BaseProps } from '../../Types/Types';
import { CommentListComponent } from '../CommentListComponent';
import { onBlur, onFocus } from '../Core/MainNavigationScreen';
import { CarouselItemComponent } from '../segments/Carousel/CarouselItemComponent';
import { FormTextBoxProps } from '../segments/FormTextBox';

type IState = {
    refresh: boolean;
    comments: Array<Comment>
    isLoading: boolean;
}
type IProps = BaseProps & {}

function CommentListContainer(props: IProps) {
    const id = props.route.params.post_hash;
    console.log(id);
    const [getState, setState] = useState<IState>({
        refresh: false,
        comments: [],
        isLoading: false,
    })
    const dispatch = useDispatch();
    const store: any = useSelector<any>((store) => store.commentsReducer)

    const leaveCommentFormBoxProperties: FormTextBoxProps = {
        debounced: true,
        placeholder: 'Leave your comment here...',
        buttonLabel: 'Attach',
        style: {container: [StylesOne.commentInput], input: [StylesOne.w85, StylesOne.h100, MP.pl15], button: [StylesOne.w15, StylesOne.h100, StylesOne.flex_row, StylesOne.flex_ai_c], buttonText: [StylesFour.select_secTitle]},
        onButtonPress: onButtonPress,
        maxLength: 500,
        multiline: true,
        placeholderColor: colors.blurWhite,
        activeOpacity: 0,
        clearOnPress: true,
    }
    
    const onRefresh = () => {
        setState({...getState, refresh: true})
        dispatch(actionImpl.getComments(id))
        setState({...getState, refresh: false})
    }

    function onButtonPress(currentInputValue: string) {
        if (currentInputValue.length < 5) {
            Alert.alert("Warning!", "Length of your comment can't be less than 5 characters!")
            return;
        }
        const body = {
            comment: currentInputValue,
        }
        dispatch(actionImpl.addComment(id, body))
    }

    onFocus(() => {
        setState({...getState, isLoading: true})
        dispatch(actionImpl.getComments(id))
    }, [id])

    onBlur(() => {
        dispatch(actionImpl.ClearComments())
    } , [])

    useEffect(() => {
        try {
            console.log('upd');
        if (store !== void 0 && store !== null) {
            if (store.statusCode === 200 && Array.isArray(store.data)) {
                LayoutAnimation.configureNext(LayoutAnimation.create(250, 'linear', 'opacity'));
                setState({...getState, comments: store.data, isLoading: false})
                return
            } else if (store.statusCode !== 0) {
                setState({...getState, isLoading: false})
                Alert.alert("Error! Something went wrong :(", store.statusCode.toString());
            }
        }
    } catch (exception) {
        setState({...getState, isLoading: false})
        Alert.alert("Error! Something went wrong :(");
    }
    }, [store, store.isModify])

    const STATE = {
        refresh: getState.refresh,
        onRefresh: onRefresh,
        isLoading: getState.isLoading,
        data: getState.comments,
        formBoxProperties: leaveCommentFormBoxProperties
    }

  return <CommentListComponent {...STATE} />
}


export {CommentListContainer};
